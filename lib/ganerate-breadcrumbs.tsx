export const generateBreadcrumbs = ({
  pathname,
  links,
}: {
  pathname: string
  links: { label: string; link: string }[]
}) => {
  const segments = pathname.slice(1).split('/')
  let currentPath = ''

  return segments.map((segment) => {
    currentPath += `/${segment}`
    const matchedLink = links.find((link) => link.link === currentPath)

    if (matchedLink) {
      return {
        label: matchedLink.label,
        href: matchedLink.link,
        active: currentPath === pathname,
      }
    }

    return {
      label: segment,
      href: currentPath,
      active: currentPath === pathname,
    }
  })
}
