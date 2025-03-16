import Link from 'next/link'

export function FooterLinkSection({
  title,
  links,
}: {
  title: string
  links: { title: string; href: string }[]
}) {
  return (
    <div>
      <h3 className="mb-4 font-semibold text-white">{title}</h3>
      <ul className="space-y-2">
        {links.map((item) => (
          <li key={item.title}>
            <Link
              href={item.href}
              className="text-sm text-gray-200 transition-colors hover:text-white"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
