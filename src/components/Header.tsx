import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between border-b border-white/10 bg-black/50 px-6 backdrop-blur-md transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          {/* Logo Placeholder - Lig-Lig Brand */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-secondary">
            <span className="font-display text-xl font-bold">L</span>
          </div>
          <span className="font-display text-2xl font-bold tracking-widest text-white">
            LIG-LIG
          </span>
        </Link>
        <nav className="hidden md:block">
          {/* Decorative element or secondary nav */}
          <div className="h-0.5 w-12 bg-secondary/50"></div>
        </nav>
      </div>
    </header>
  )
}
