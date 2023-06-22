"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { postSchema } from "@/lib/validations/post"
import { z } from "zod"
import { addPostAction } from "@/app/_actions/post"

type Post = z.infer<typeof postSchema>

export function AddPostForm() {
  const form = useForm<Post>({
    resolver: zodResolver(postSchema),
  })

  async function onSubmit(data: Post) {
    console.log(data)

    try {
      await addPostAction(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
      <input type="text" placeholder="Que pasa?" {...form.register("body")} />
      <button type="submit">Post</button>
    </form>
  )
}
