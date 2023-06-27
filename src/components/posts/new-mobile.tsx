import Link from "next/link";
import { Icons } from "../icons";
import { Button } from "../ui/button";

export default function NewMobilePost() {
  return (
    <div className="fixed bottom-5 right-5 z-50">
      <Link href="/compose/habla">
        <Button variant="default" className="w-14 h-14 rounded-full shadow">
          <Icons.feather className="fill-white h-8" />
        </Button>
      </Link>
    </div>
  )
}
