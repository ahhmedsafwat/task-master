import Image from 'next/image'

export default function ContentDisplay({ content }: { content: string }) {
  const isImageUrl = (url: string) => {
    return (
      /\.(jpg|jpeg|png|gif|webp)$/i.test(url) || url.startsWith('data:image/')
    )
  }

  return isImageUrl(content) ? (
    <Image
      src={content}
      alt="Content"
      width={500}
      height={500}
      className="h-auto max-w-full"
    />
  ) : (
    <p className="text-gray-700">{content}</p>
  )
}
