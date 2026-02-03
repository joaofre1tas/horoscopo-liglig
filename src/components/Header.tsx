import { Link } from 'react-router-dom'
import logoImg from '@/assets/logo-site-reduzido-58094.png'

export const Header = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 h-20 border-b border-white/10 bg-[#E30613] text-white shadow-md transition-all">
      <div className="container mx-auto flex h-full items-center justify-center px-4">
        {/* Brand Logo - Centered and Updated */}
        <Link
          to="/"
          className="flex h-full items-center py-1 transition-transform hover:scale-105"
        >
          <img
            src={logoImg}
            alt="Lig-Lig"
            className="h-full w-auto object-contain drop-shadow-md"
          />
        </Link>
      </div>
    </header>
  )
}
