import { AddPostForm } from "@/components/forms/add-post-form";
import { currentUser } from "@clerk/nextjs";
import { SidebarNav } from "@/components/layouts/sidebar-nav";
import { homeConfig } from "@/config/home";
import PostView from "@/components/posts/view";
import { getPostsAction } from "./_actions/post";
import ThemePicker from "@/components/theme-picker";
import { Suspense } from "react";
import { PostWithUser } from "@/types";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type FeedProps = {
  promise: Promise<PostWithUser[]>
}

function FeedLoader() {
  return (
    <div className="flex grow flex-col overflow-y-scroll">
      <Card className="animate-pulse">
        <Skeleton className="h-5 w-3/5" />
      </Card>
    </div>
  )
}

async function Feed({ promise }: FeedProps) {
  // make this wait 60 seconds
  const timeout = new Promise((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 2000);
  });
  await timeout;

  const posts = await promise;

  return <div className="flex grow flex-col overflow-y-scroll p-2">
    {posts.map((post) => <PostView key={post.id} post={post} />)}
  </div>
}

export default async function HomePage() {
  const user = await currentUser();

  const postsData = getPostsAction();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-6">
        <div className="flex justify-end md:justify-start">
          <div>
            <SidebarNav items={homeConfig.sidebarNav} />
          </div>
        </div>
        <div className="col-span-4 border-white border-x-2 flex flex-col h-screen">
          {user && <AddPostForm userId={user.id} />}
          <Suspense fallback={<FeedLoader />}>
            <Feed promise={postsData} />
          </Suspense>
        </div>
        <div>Grid 3
        <ThemePicker />
        </div>
      </div>
    </div>)
}
