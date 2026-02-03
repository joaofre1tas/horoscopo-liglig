import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useState } from 'react'
import logoImg from '@/assets/logo-lig-lig.png' // Using mock path, will use text if not available

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: 'CARDÁPIO', href: '#' },
    { name: 'PROMOÇÕES', href: '#' },
    { name: 'LOJAS', href: '#' },
    { name: 'O LIG-LIG', href: '#' },
    { name: 'SEJA UM FRANQUEADO', href: '#' },
    { name: 'TRABALHE CONOSCO', href: '#' },
  ]

  return (
    <header className="fixed left-0 right-0 top-0 z-50 h-20 border-b border-white/10 bg-[#E30613] text-white shadow-md transition-all">
      <div className="container mx-auto flex h-full items-center justify-between px-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white border-2 border-secondary shadow-lg overflow-hidden p-1">
            <img
              src="https://img.usecurling.com/i?q=chinese%20food%20chef%20logo&color=red&shape=fill"
              alt="Lig-Lig Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <span className="hidden font-display text-2xl font-bold tracking-widest text-white md:block">
            LIG-LIG
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-xs font-bold uppercase tracking-wider text-white transition-colors hover:text-secondary"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden items-center gap-4 lg:flex">
          <Button className="rounded-none bg-secondary px-6 py-2 font-bold text-primary hover:bg-secondary/90 hover:scale-105 transition-transform">
            PEÇA JÁ
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-[#E30613] text-white border-l-white/10"
            >
              <nav className="mt-8 flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-bold text-white hover:text-secondary"
                  >
                    {item.name}
                  </a>
                ))}
                <Button className="mt-4 w-full rounded-none bg-secondary font-bold text-primary hover:bg-white hover:text-primary">
                  PEÇA JÁ
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
