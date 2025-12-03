import z from "zod";

export const chatSchema = z.object({
    message: z.string().min(1, "Message cannot be empty"),
    sessionId: z.string().optional(),
});


export type ChatSchema = z.infer<typeof chatSchema>