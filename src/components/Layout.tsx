import { Outlet } from 'react-router-dom'
import { Footer } from '@/components/Footer'
import bgImage from '@/assets/bg-ano-novo-chines-04-e7d0d.png'

export default function Layout() {
  return (
    <div className="flex min-h-[100dvh] w-full flex-col font-sans font-medium text-foreground selection:bg-secondary selection:text-secondary-foreground overflow-x-hidden bg-[#E30613]">
      <main
        className="flex-1 w-full flex flex-col bg-no-repeat bg-top bg-cover md:bg-size-full-auto"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
