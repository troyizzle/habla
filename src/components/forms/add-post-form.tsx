"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { postSchema } from "@/lib/validations/post"
import { z } from "zod"
import { addPostAction } from "@/app/_actions/post"
import { UserButton } from "@clerk/nextjs"
import { Button } from "../ui/button"
import { toast } from "sonner"

type Post = z.infer<typeof postSchema>

type AddPostFormProps = {
  userId: string
}

export function AddPostForm({ userId }: AddPostFormProps) {
  const form = useForm<Post>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      body: ""
    }
  })

  async function onSubmit(data: Post) {
    try {
      await addPostAction({
        ...data,
        createdById: userId
      })

      toast.success("Post created successfully")

      form.reset()
    } catch (error) {
      error instanceof Error ? toast.error(error.message) : toast.error("Something went wrong")
    }
  }

  return (
    <div className="border-white border-y-2">
      <form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
        <div className="p-2">
          <div className="flex items-center">
            <UserButton appearance={{
              elements: {
                userButtonAvatarBox: {
                  width: 56,
                  height: 56
                }
              }
            }} />
            <input
              className="outline-none bg-background ms-2"
              type="text"
              placeholder="Que Pasa?" {...form.register("body")} />
          </div>
          <div className="flex justify-end">
            <Button
              disabled={form.formState.isSubmitting || !form.formState.isValid}
              type="submit" variant="default">Habla</Button>
          </div>
        </div>
      </form>
    </div>
  )
}
