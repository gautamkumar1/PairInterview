import type { Request, Response } from "express";
import { prisma } from "../utils/db.js";
import { chatClient, streamClient } from "../utils/stream.js";
export const createSession = async (request: Request, response: Response) => {
    let session;
    try {
        const { problem, difficulty } = request.body;
        if (!problem || !difficulty) {
            return response.status(400).json({ message: "Problem and difficulty are required" });
        }
        const user = (request as any).user;
        // generate a unique call id for stream video
        const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        // create a new session
        session = await prisma.sessionSchema.create({
            data: {
                problem,
                difficulty,
                callId,
                hostId: user.id,
            }
        })

        // create stream video call
        await streamClient.video.call("default", callId).getOrCreate({
            data: {
                created_by_id: user.id,
                custom: { problem, difficulty, sessionId: session.id },
            }
        })

        // chat messaging
        const channel = chatClient.channel("messaging", callId, {
            created_by_id: user.id,
            members: [user.id]
        });
        await channel.create();

        return response.status(201).json({
            message: "Session created successfully",
            session
        });
    } catch (error) {
        console.error("Error creating session", error);
        // delete session if it was created but failed to create stream video call or chat messaging
        if (session) {
            await prisma.sessionSchema.delete({
                where: { id: session.id }
            })
        }
        return response.status(500).json({
            message: "Error creating session",
            error: error
        });
    }
}

export const getActiveSessions = async (_request: Request, response: Response) => {
    try {
        const sessions = await prisma.sessionSchema.findMany({
            where: {
                status: "active"
            },
            include: {
                host: true,
                participant: true
            },
            orderBy: {
                createdAt: "desc"
            },
            take: 20,
        })
        return response.status(200).json(sessions);
    } catch (error) {
        console.error("Error fetching active sessions", error);
        return response.status(500).json({ message: "Error fetching active sessions", error: error });
    }
}

export const getMyRecentSessions = async (request: Request, response: Response) => {
    try {
        const user = (request as any).user;
        // get sessions where user is either host or participant
        const sessions = await prisma.sessionSchema.findMany({
            where: {
                OR: [
                    { hostId: user.id },
                    { participantId: user.id }
                ]
            },
            include: {
                host: true,
                participant: true
            },
            orderBy: {
                createdAt: "desc"
            },
            take: 20,
        })
        return response.status(200).json(sessions);
    } catch (error) {
        console.error("Error fetching my recent sessions", error);
        return response.status(500).json({ message: "Error fetching my recent sessions", error: error });
    }
}

export const getSessionById = async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        if (!id) {
            return response.status(400).json({ message: "Session id is required" });
        }
        const session = await prisma.sessionSchema.findUnique({
            where: { id: id as string },
            include: {
                host: true,
                participant: true
            }
        })
        if (!session) {
            return response.status(404).json({ message: "Session not found" });
        }
        return response.status(200).json(session);
    }
    catch (error) {
        console.error("Error fetching session by id", error);
        return response.status(500).json({ message: "Error fetching session by id", error: error });
    }
}

export const joinSession = async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        if (!id) {
            return response.status(400).json({ message: "Session id is required" });
        }
        const user = (request as any).user;
        const userId = user.id;
        const session = await prisma.sessionSchema.findFirst({
            where: { id: id as string, }
        })
        if (!session) {
            return response.status(404).json({ message: "Session not found" });
        }
        if (session.status !== "active") {
            return response.status(400).json({ message: "Cannot join a completed session" });
        }

        if (session.hostId.toString() === userId.toString()) {
            return response.status(400).json({ message: "Host cannot join their own session as participant" });
        }
        if (session.participantId) {
            return response.status(409).json({ message: "Session is full" });
        }
        // join session
        const channel = chatClient.channel("messaging", session.callId);
        await channel.addMembers([userId]);
        // update session with participant id
        await prisma.sessionSchema.update({
            where: { id: session.id },
            data: { participantId: userId }
        })
        return response.status(200).json({ message: "Joined session successfully", session });
    } catch (error) {
        console.error("Error joining session", error);
        return response.status(500).json({ message: "Error joining session", error: error });
    }
}

export const endSession = async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const user = (request as any).user;
        const userId = user.id;
        if (!id) {
            return response.status(400).json({ message: "Session id is required" });
        }
        const session = await prisma.sessionSchema.findFirst({
            where: { id: id as string },
        })
        if (!session) {
            return response.status(404).json({ message: "Session not found" });
        }
        if (session.status !== "active") {
            return response.status(400).json({ message: "Cannot end a completed session" });
        }
        if (session.participantId) {
            return response.status(400).json({ message: "Cannot end a session with a participant" });
        }
        if (session.hostId.toString() !== userId.toString()) {
            return response.status(400).json({ message: "Cannot end a session that you are not the host of" });
        }
        // update session status to completed
        await prisma.sessionSchema.update({
            where: { id: session.id },
            data: { status: "completed" }
        })
        // delete stream video call
        const videoCall = streamClient.video.call("default", session.callId);
        await videoCall.delete();
        // delete chat messaging
        const channel = chatClient.channel("messaging", session.callId);
        await channel.delete();
        return response.status(200).json({ message: "Session ended successfully", session });
    } catch (error) {
        console.error("Error ending session", error);
        return response.status(500).json({ message: "Error ending session", error: error });
    }
}