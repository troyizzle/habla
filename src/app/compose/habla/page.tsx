import { AddPostMobileForm } from "@/components/forms/add-post-mobile-form";
import { currentUser } from "@clerk/nextjs";

export default async function Page() {
  const user = await currentUser();

  if (!user) {
    return null
  }

  return (
    <AddPostMobileForm userId={user.id} avatarSrc={user.profileImageUrl} />
  )
}
