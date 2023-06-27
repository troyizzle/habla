import { currentUser } from "@clerk/nextjs";
import { SidebarNav } from "@/components/layouts/sidebar-nav";
import { homeConfig } from "@/config/home";
import Tweets from "@/components/tweets";

export default async function HomePage() {
  const user = await currentUser();

  return (
    <div className="md:flex">
      <div className="hidden md:block md:w-1/4">
        <div className="flex">
          <div className="w-1/2">
          </div>
          <div className="w-1/2">
            <SidebarNav items={homeConfig.sidebarNav} />
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 border-2 border-slate-900">
        <Tweets user={user} />
      </div>
      <div className="w-1/4">
        <div className="hidden lg:block">
        </div>
      </div>
    </div>)
}
