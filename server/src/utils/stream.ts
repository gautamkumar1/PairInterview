import { StreamChat } from "stream-chat";
import {StreamClient} from "@stream-io/node-sdk";
import dotenv from "dotenv";
dotenv.config();
const streamApiKey = process.env.STREAM_API_KEY!;
const streamApiSecret = process.env.STREAM_API_SECRET!;
if (!streamApiKey || !streamApiSecret) {
    throw new Error("STREAM_API_KEY and STREAM_API_SECRET are required");
}
interface userData {
    id: string;
    name: string;
    email: string;
    image: string;
}
export const chatClient = StreamChat.getInstance(streamApiKey, streamApiSecret);  // this is the chat client
export const streamClient = new StreamClient(streamApiKey, streamApiSecret); // this is the stream client(video)

export const upsertStreamUser = async (userData: userData) => {
    try {
        await chatClient.upsertUser(userData);
        console.log("Stream user upserted successfully", userData);
        return true;
    } catch (error) {
        console.error("Error upserting stream user", error);
        return false;
    }
}

export const deleteStreamUser = async (userData: userData) => {
    try {
        await chatClient.deleteUser(userData.id);
        console.log("Stream user deleted successfully", userData);
        return true;
    } catch (error) {
        console.error("Error deleting stream user", error);
        return false;
    }
}

