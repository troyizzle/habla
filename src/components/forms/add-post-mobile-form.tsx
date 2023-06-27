"use client"

import { addPostAction } from "@/app/_actions/post"
import { postSchema } from "@/lib/validations/post"
import { Post } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import HomeBackButton from "../home-back-button"
import Avatar from "../avatar"

type AddPostMobileFormProps = {
  userId: string
  avatarSrc: string
}

export function AddPostMobileForm({ userId, avatarSrc }: AddPostMobileFormProps) {
  const router = useRouter()

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

      router.push("/")
      toast.success("Habla created!")
    } catch (error) {
      toast.error("An unknown error occurred. Please try again later.")
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex justify-between items-center">
        <HomeBackButton />
        <Button
          disabled={form.formState.isSubmitting || !form.formState.isValid}
          type="submit" variant="default" size="sm" className="rounded-full">
          Habla
        </Button>
      </div>
      <div className="mt-2">
        <div className="flex gap-3">
          <Avatar src={avatarSrc} alt="avatar profile image" />
          <Textarea
            {...form.register("body")}
            className="w-full outline-none border-none focus:ring-0 focus:ring-offset-0"
            placeholder="What is haeppnning!?" />
        </div>
      </div>
    </form>
  )
}
