"use client"
import { User } from "@clerk/nextjs/dist/types/server"
import { AddPostForm } from "./forms/add-post-form"
import Image from "next/image"
import { Suspense } from "react";
import { getPostsAction } from "@/app/_actions/post";
import PostView from "./posts/view";
import { PostWithUser } from "@/types";
import { Input } from "./ui/input";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import Link from "next/link";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { useClerk } from "@clerk/nextjs";
import NewMobilePost from "./posts/new-mobile";

type TweetsProp = {
  user: User | null
}

type HeaderProps = {
  user: User
}

function Header({ user }: HeaderProps) {
  const { signOut } = useClerk()

  return <div className="p-2">
    <div className="flex">
      <div className="w-1/2">
        <Sheet>
          <SheetTrigger>
            <Image
              src={user.profileImageUrl}
              className="h-8 w-8 rounded-full"
              alt={`@${user.username}'s profile picture`}
              width={56}
              height={56}
            />
          </SheetTrigger>
          <SheetContent className="w-3/4" position="left">
            <SheetHeader>
              <SheetTitle>Account info</SheetTitle>
            </SheetHeader>
            <SheetDescription>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Settings and Support</AccordionTrigger>
                  <AccordionContent>
                    <Button onClick={() => signOut()} variant="ghost" className="w-full">
                      Sign out
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </SheetDescription>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  </div >
}

type FeedProps = {
  promise: Promise<PostWithUser[]>
}

async function Feed({ promise }: FeedProps) {
  const posts = await promise;

  return <div className="flex grow flex-col">
    {posts.map((post) => <PostView key={post.id} post={post} />)}
  </div>
}

function FeedLoader() {
  return (
    <div className="flex items-center justify-center">
      <Icons.spinner className="animate-spin h-8 w-8 text-primary" />
    </div>
  )
}


export default function Tweets({ user }: TweetsProp) {
  const postsData = getPostsAction();
  const SearchIcon = Icons.search;

  return (
    <div
      className="flex grow flex-col h-screen overflow-y-scroll">
      {user ? (
        <>
          <div className="hidden md:block">
            <AddPostForm userId={user.id} />
          </div>
          <div className="block md:hidden">
            {<Header user={user} />}
          </div>
          <Suspense fallback={<FeedLoader />}>
            <Feed promise={postsData} />
          </Suspense>
          <NewMobilePost />
        </>
      ) : (
        <>
          <div className="p-2">
            <div className="flex items-center justify-between">
              <div>Icon</div>
              <div className="flex items-center rounded bg-secondary">
                <SearchIcon className="relative ml-2 fill-gray-500" />
                <Input
                  className="bg-none outline-none border-none"
                  type="text"
                  placeholder="Seach Twitter" />
              </div>
              <div className="">
                ---
              </div>
            </div>
            <Suspense fallback={<FeedLoader />}>
              <Feed promise={postsData} />
            </Suspense>
          </div>
          <div className="block md:hidden fixed bottom-0 h-[8%] border border-t w-full bg-background p-2">
            <div className="flex items-center justify-between">
              <div className="w-1/2">
                <Button variant="outline" className="w-full">Log in</Button>
              </div>
              <div className="w-1/2">
                <Link href="/i/flow/signup" className="w-full">
                  <Button variant="default" className="w-full">Sign Up</Button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
