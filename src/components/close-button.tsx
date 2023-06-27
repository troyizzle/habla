import { XIcon } from "lucide-react"
import { Button } from "./ui/button"

type CloseButtonProps = {
  onClick?: () => void
}

export function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <Button type="button" onClick={onClick} className="p-0" variant="ghost">
      <XIcon size={14} className="text-white font-bold p-0" />
    </Button>
  )
}

