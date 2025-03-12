import { Button } from './button'

export const MenuIcon = ({
  isMenuOpen,
  toggleMenu,
  className,
}: {
  isMenuOpen: boolean
  toggleMenu: () => void
  className: string
}) => {
  return (
    <Button
      variant="outline"
      size="icon"
      className={`p-2 ${className}`}
      onClick={toggleMenu}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'rotate-90' : ''
        }`}
      >
        <g className="transition-all duration-300 ease-in-out">
          <circle
            cx="8"
            cy="8"
            r="3"
            fill="currentColor"
            className={isMenuOpen ? 'opacity-0' : 'opacity-100'}
          />
          <circle
            cx="24"
            cy="8"
            r="3"
            fill="currentColor"
            className={isMenuOpen ? 'opacity-0' : 'opacity-100'}
          />
          <circle
            cx="8"
            cy="24"
            r="3"
            fill="currentColor"
            className={isMenuOpen ? 'opacity-0' : 'opacity-100'}
          />
          <circle
            cx="24"
            cy="24"
            r="3"
            fill="currentColor"
            className={isMenuOpen ? 'opacity-0' : 'opacity-100'}
          />

          <line
            x1="7"
            y1="7"
            x2="25"
            y2="25"
            stroke="currentColor"
            strokeWidth="3"
            className={`transition-opacity duration-300 ease-in-out ${
              isMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <line
            x1="25"
            y1="7"
            x2="7"
            y2="25"
            stroke="currentColor"
            strokeWidth="3"
            className={`transition-opacity duration-300 ease-in-out ${
              isMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </g>
      </svg>
      <span className="sr-only">Toggle menu</span>
    </Button>
  )
}
