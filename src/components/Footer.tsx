import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className="w-full bg-[#E30613] pt-16 text-white">
      <div className="container mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Links Úteis */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-bold uppercase tracking-wider text-white">
              Links Úteis
            </h3>
            <ul className="space-y-3 text-sm font-medium opacity-90">
              <li>
                <Link to="#" className="hover:text-secondary hover:underline">
                  Cardápio
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-secondary hover:underline">
                  Promoções
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-secondary hover:underline">
                  Lojas
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-secondary hover:underline">
                  Ficha Nutricional
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Institucional */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-bold uppercase tracking-wider text-white">
              Institucional
            </h3>
            <ul className="space-y-3 text-sm font-medium opacity-90">
              <li>
                <Link to="#" className="hover:text-secondary hover:underline">
                  O Lig-Lig
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-secondary hover:underline">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-secondary hover:underline">
                  Trabalhe Conosco
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-secondary hover:underline">
                  Seja um Fornecedor
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-secondary hover:underline">
                  Seja um Franqueado
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Baixe o App */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-bold uppercase tracking-wider text-white">
              Baixe o App
            </h3>
            <div className="flex flex-col gap-3">
              <Link
                to="#"
                className="block w-40 transition-transform hover:scale-105"
              >
                <img
                  src="https://img.usecurling.com/i?q=app%20store%20badge%20black&color=black&shape=fill"
                  alt="Disponível na App Store"
                  className="h-auto w-full rounded-md border border-white/20 bg-black"
                />
              </Link>
              <Link
                to="#"
                className="block w-40 transition-transform hover:scale-105"
              >
                <img
                  src="https://img.usecurling.com/i?q=google%20play%20badge%20black&color=black&shape=fill"
                  alt="Disponível no Google Play"
                  className="h-auto w-full rounded-md border border-white/20 bg-black"
                />
              </Link>
            </div>
          </div>

          {/* Column 4: Redes Sociais */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-bold uppercase tracking-wider text-white">
              Acompanhe Nossas Redes
            </h3>
            <div className="flex flex-wrap gap-4">
              <Link
                to="#"
                className="rounded-full bg-white p-2 text-primary transition-colors hover:bg-secondary hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                to="#"
                className="rounded-full bg-white p-2 text-primary transition-colors hover:bg-secondary hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                to="#"
                className="rounded-full bg-white p-2 text-primary transition-colors hover:bg-secondary hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                to="#"
                className="rounded-full bg-white p-2 text-primary transition-colors hover:bg-secondary hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                to="#"
                className="rounded-full bg-white p-2 text-primary transition-colors hover:bg-secondary hover:text-primary"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10 bg-black py-6 text-center text-xs text-white/60">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>Site desenvolvido por João Freitas Web Design</p>
          <p>Políticas de Privacidade</p>
        </div>
      </div>
    </footer>
  )
}
