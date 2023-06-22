import { z } from "zod"

export const postSchema = z.object({
  body: z.string().min(1, {
    message: "Post must have at least 1 character",
  }).max(420),
})
