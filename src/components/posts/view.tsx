import { PostWithUser } from "@/types"
import Image from "next/image"
import dayjs from "dayjs"

import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)

type PostViewProps = {
  post: PostWithUser
}

export default function PostView({ post }: PostViewProps) {
  return (
    <div key={post.id} className="flex gap-3 border-b border-slate-900 p-4">
      <Image
        src={post.user.profileImageUrl}
        className="h-14 w-14 rounded-full"
        alt={`@${post.user.username}'s profile picture`}
        width={56}
        height={56}
      />

      <div className="flex flex-col">
        <div className="flex gap-1 text-slate-300">
          <span>{`@${post.user.username} `}</span>
          <span className="font-thin">{` · ${dayjs(
            post.createdAt
          ).fromNow()}`}</span>
        </div>
        <span className="text-2xl">{post.body}</span>
      </div>
    </div>
  )
}
