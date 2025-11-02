import { StreamChat } from "stream-chat";
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
export const streamClient = StreamChat.getInstance(streamApiKey, streamApiSecret);

export const upsertStreamUser = async (userData: userData) => {
    try {
        await streamClient.upsertUser(userData);
        console.log("Stream user upserted successfully", userData);
        return true;
    } catch (error) {
        console.error("Error upserting stream user", error);
        return false;
    }
}

export const deleteStreamUser = async (userData: userData) => {
    try {
        await streamClient.deleteUser(userData.id);
        console.log("Stream user deleted successfully", userData);
        return true;
    } catch (error) {
        console.error("Error deleting stream user", error);
        return false;
    }
}

