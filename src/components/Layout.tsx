import { Outlet } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import bgImage from '@/assets/bg-ano-novo-chines-02-67df6.png'

export default function Layout() {
  return (
    <div
      className="flex min-h-screen flex-col font-sans text-foreground selection:bg-secondary selection:text-secondary-foreground overflow-x-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
