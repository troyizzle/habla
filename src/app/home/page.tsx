import { AddPostForm } from "@/components/forms/add-post-form";
import { UserButton, currentUser } from "@clerk/nextjs";
import { getPostsAction } from "../_actions/post";

export default async function HomePage() {
  const user = await currentUser();
  const posts = await getPostsAction();

  return <div className="grid grid-cols-4">
    <div></div>
    <div className="col-span-2">
      <div>
        <div className="flex items-center">
          <div><UserButton afterSignOutUrl="/"/></div>
          {user && <AddPostForm userId={user.id} />}
        </div>
      </div>
      {posts.map((post) => {
        return <div key={post.id} className="flex items-center">
        {post.body}
        posted by: {post.user.username}
        </div>
      })}
    </div>
    <div>Grid 3</div>
  </div>;
}
