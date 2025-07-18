import z from "zod";

export const feedbackSchema = z.object({
    name: z.string().min(2),
    comment: z.string().min(5),
    rate: z.number().min(1),
})