import Link from "next/link";
import { Icons } from "./icons";

export default function HomeBackButton() {
  return (
    <Link href="/">
      <Icons.arrowLeft className="fill-white" />
    </Link>
  )
}

