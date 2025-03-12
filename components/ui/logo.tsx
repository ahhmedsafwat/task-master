import { cn } from '@/lib/utils'
import Link from 'next/link'

export const Logo = ({
  className,
  textClassName,
  href,
  svgSize = 45,
  svgClassName = 'group',
}: {
  className?: string
  textClassName?: string
  href: string
  svgSize?: number
  svgClassName?: string
}) => {
  return (
    <Link href={href} className={cn(`flex items-center space-x-2`, className)}>
      <svg
        width={svgSize}
        height={svgSize}
        viewBox="0 0 45 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(svgClassName)}
      >
        <circle
          cx="22"
          cy="22"
          r="22"
          className="fill-foreground transition-colors duration-300"
        />
        <path
          d="M22.3393 32.192C17.2522 32.0792 12.7452 30.8879 9.57783 29.1262C6.34286 27.3269 4.86181 25.1664 4.9051 23.2124C4.9484 21.2585 6.52369 19.1656 9.83518 17.5114C13.0775 15.8918 17.6328 14.9012 22.7199 15.0139C27.807 15.1266 32.3139 16.318 35.4813 18.0797C38.7163 19.8789 40.1973 22.0395 40.154 23.9934C40.1107 25.9474 38.5354 28.0402 35.224 29.6944C31.9817 31.3141 27.4264 32.3047 22.3393 32.192Z"
          className="stroke-background transition-all duration-500"
          strokeWidth="3"
        />
        <path
          d="M30.9242 22.6894C30.9242 27.7806 29.8463 32.3154 28.176 35.5226C26.4676 38.8031 24.3709 40.3182 22.4621 40.3182C20.5534 40.3182 18.4567 38.8031 16.7482 35.5226C15.0779 32.3154 14 27.7806 14 22.6894C14 17.5982 15.0779 13.0634 16.7482 9.85616C18.4567 6.5757 20.5534 5.06061 22.4621 5.06061C24.3709 5.06061 26.4676 6.5757 28.176 9.85616C29.8463 13.0634 30.9242 17.5982 30.9242 22.6894Z"
          className="stroke-background transition-all duration-500"
          strokeWidth="3"
        />
      </svg>
      <div
        className={cn(
          'font-cabinet text-base font-extrabold tracking-wide sm:text-lg',
          textClassName,
        )}
      >
        TASKMASTER
      </div>
    </Link>
  )
}
