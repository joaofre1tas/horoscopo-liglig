import { useState, useRef } from 'react'
import { ZodiacWheel } from '@/components/ZodiacWheel'
import { LeadModal } from '@/components/LeadModal'
import { type ZodiacSign } from '@/lib/zodiac'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Index() {
  const [result, setResult] = useState<ZodiacSign | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)

  const handleResult = (sign: ZodiacSign) => {
    setResult(sign)
    // Smooth scroll to result
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-pattern-oriental">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute -left-20 top-20 h-96 w-96 animate-float opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #D32F2F 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute -right-20 bottom-20 h-96 w-96 animate-float opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)',
            animationDelay: '2s',
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto flex flex-col items-center px-4 py-12 md:py-20">
        {/* Hero Section */}
        <section className="mb-12 text-center md:mb-20">
          <div className="mx-auto mb-6 max-w-4xl animate-fade-in-down">
            <h1 className="font-display text-4xl font-bold leading-tight text-white drop-shadow-md md:text-6xl lg:text-7xl">
              Descubra sua sorte no <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 text-glow">
                Horóscopo Chinês
              </span>
            </h1>
          </div>
          <p className="mx-auto max-w-2xl animate-fade-in text-lg text-white/80 md:text-xl">
            Veja o que este ano reserva para você — e ganhe um presente
            exclusivo do Lig-Lig para celebrar.
          </p>
        </section>

        {/* Wheel Section */}
        <section className="relative mb-16 w-full animate-fade-in-up">
          <div className="flex justify-center">
            <ZodiacWheel onResult={handleResult} />
          </div>
        </section>

        {/* Result Section */}
        <div ref={resultRef} className="w-full scroll-mt-32">
          {result && (
            <section className="mx-auto max-w-4xl animate-fade-in-up rounded-2xl border border-secondary/20 bg-black/60 p-8 backdrop-blur-md md:p-12">
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div className="relative flex justify-center">
                  <div className="absolute inset-0 animate-pulse rounded-full bg-secondary/10 blur-2xl" />
                  <img
                    src={`https://img.usecurling.com/p/400/400?q=${result.imageQuery}&dpr=2`}
                    alt={result.name}
                    className="relative z-10 h-64 w-64 object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="space-y-6 text-center md:text-left">
                  <div>
                    <h2 className="mb-2 font-display text-3xl font-bold text-secondary md:text-5xl">
                      {result.name}
                    </h2>
                    <div className="h-1 w-20 bg-primary md:mx-0 mx-auto rounded-full" />
                  </div>
                  <p className="text-xl leading-relaxed text-white/90">
                    "{result.prediction}"
                  </p>
                  <div className="pt-4">
                    <Button
                      size="lg"
                      onClick={() => setIsModalOpen(true)}
                      className="group relative overflow-hidden rounded-full bg-secondary px-8 py-6 text-lg font-bold text-primary transition-all hover:scale-105 hover:bg-white"
                    >
                      <span className="relative z-10">
                        Sua sorte no Lig-Lig
                      </span>
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>

      <LeadModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  )
}
