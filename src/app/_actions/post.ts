"use server"

import { db } from "@/db";
import { posts } from "@/db/schema";
import { postSchema } from "@/lib/validations/post";
import { z } from "zod";

export async function addPostAction(
  input: z.infer<typeof postSchema>
) {
  try {
    await db.insert(posts).values(input)
  } catch (e) {
    console.log(e)
  }
}
