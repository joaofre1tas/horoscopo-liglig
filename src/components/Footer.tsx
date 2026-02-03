import { Facebook, Instagram } from 'lucide-react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black/80 py-8 text-center text-muted-foreground backdrop-blur-sm">
      <div className="container mx-auto flex flex-col items-center justify-center gap-6">
        <div className="flex items-center gap-2 opacity-80">
          <span className="font-display text-lg font-bold tracking-wider text-white">
            LIG-LIG
          </span>
        </div>

        <div className="flex gap-6">
          <Link
            to="#"
            className="text-secondary transition-colors hover:text-white"
          >
            <Instagram className="h-6 w-6" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link
            to="#"
            className="text-secondary transition-colors hover:text-white"
          >
            <Facebook className="h-6 w-6" />
            <span className="sr-only">Facebook</span>
          </Link>
        </div>

        <div className="text-sm">
          <p>
            &copy; {new Date().getFullYear()} Lig-Lig. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
