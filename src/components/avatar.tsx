import Image from "next/image"

type AvatarProps = {
  src: string
  alt: string
}

export default function Avatar({ src, alt }: AvatarProps) {
  return (
    <Image
      src={src}
      className="h-8 w-8 rounded-full"
      alt={alt}
      width={56}
      height={56}
    />
  )
}
