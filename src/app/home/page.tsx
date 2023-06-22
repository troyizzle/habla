import { AddPostForm } from "@/components/forms/add-post-form";
import { UserButton } from "@clerk/nextjs";

export default function Page() {
  return <div className="grid grid-cols-4">
    <div></div>
    <div className="col-span-2">
      <div>
        <div className="flex items-center">
          <div><UserButton afterSignOutUrl="/"/></div>
          <AddPostForm />
        </div>
      </div>
    </div>
    <div>Grid 3</div>
  </div>;
}
