import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../generated/prisma/client.js";
import { createAuthMiddleware } from "better-auth/api";
import { upsertStreamUser } from "./stream.js";
const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
    },
    hooks: {
        after: createAuthMiddleware(async (ctx) => {
            if(ctx.path.startsWith("/sign-up") && ctx.context.newSession){
                const newSession = ctx.context.newSession;
                await upsertStreamUser({
                    id: newSession.user.id,
                    name: newSession.user.name,
                    email: newSession.user.email,
                    image: newSession.user.image || "",
                })
            }
        }),
    },
    trustedOrigins: ["http://localhost:5173"],
});
