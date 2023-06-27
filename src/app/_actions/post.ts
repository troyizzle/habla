"use server"

import { db } from "@/db";
import { posts } from "@/db/schema";
import { postSchema } from "@/lib/validations/post";
import { Post } from "@/types";
import { clerkClient } from "@clerk/nextjs";
import { desc } from "drizzle-orm";
import { z } from "zod";

async function addUserDataToPosts(posts: Post[]) {
  const userIds = posts.map((post) => post.createdById)
  const users = (
    await clerkClient.users.getUserList({
      userId: userIds,
    })
  )

  return posts.map((post) => {
    const user = users.find((user) => user.id === post.createdById)

    if (!user) {
      throw new Error(`User not found for post ${post.id}`)
    }

    return {
      ...post,
      user
    }
  })
}

export async function getPostsAction() {
  const postsData = await db.select().from(posts)
  .orderBy(desc(posts.createdAt))
  .limit(50)
  return await addUserDataToPosts(postsData)
}

export async function addPostAction(
  input: z.infer<typeof postSchema> & { createdById: string }
) {
  await db.insert(posts).values(input)
}
