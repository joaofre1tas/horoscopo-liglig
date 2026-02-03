import { useState, useRef } from 'react'
import { ZodiacWheel } from '@/components/ZodiacWheel'
import { LeadModal } from '@/components/LeadModal'
import { type ZodiacSign } from '@/lib/zodiac'
import { Button } from '@/components/ui/button'
import { ChevronDown, Star, Ticket } from 'lucide-react'

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
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-background pt-20">
      {/* Hero Section */}
      <section className="relative flex min-h-[600px] flex-col items-center justify-center bg-pattern-brand px-4 py-16 text-center text-white md:py-24">
        {/* Decorative background overlay */}
        <div className="absolute inset-0 bg-[url('https://img.usecurling.com/i?q=chinese%20clouds%20pattern%20red&color=red&shape=fill')] opacity-10 mix-blend-overlay"></div>

        <div className="relative z-10 mx-auto max-w-4xl animate-fade-in-down space-y-6">
          <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-1 backdrop-blur-sm">
            <Star className="h-4 w-4 text-secondary fill-secondary" />
            <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
              Lig-Lig Especial
            </span>
          </div>

          <h1 className="font-display text-4xl font-bold leading-tight drop-shadow-sm md:text-6xl lg:text-7xl">
            Descubra sua sorte no <br />
            <span className="text-secondary text-glow">Horóscopo Chinês</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-white/90 md:text-xl font-light leading-relaxed">
            Veja o que este ano reserva para você — e ganhe um presente
            exclusivo do Lig-Lig para celebrar os bons momentos.
          </p>

          <div className="pt-8 animate-bounce">
            <ChevronDown className="mx-auto h-8 w-8 text-white/50" />
          </div>
        </div>
      </section>

      {/* Main Interaction Section */}
      <section className="relative -mt-10 mb-20 w-full md:-mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center gap-12 lg:flex-row">
            {/* Wheel */}
            <div className="relative z-20 animate-fade-in-up">
              <ZodiacWheel onResult={handleResult} />
            </div>

            {/* Result Display - Shows only after spin */}
            <div
              ref={resultRef}
              className={`w-full max-w-xl transition-all duration-1000 ${result ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 lg:translate-x-10 pointer-events-none absolute lg:relative'}`}
            >
              {result && (
                <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-black/5 md:p-12">
                  {/* Card Decoration */}
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-secondary/20 blur-3xl"></div>

                  <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
                    <div className="mb-6 rounded-full bg-red-50 p-4">
                      <img
                        src={`https://img.usecurling.com/i?q=${result.iconQuery}&color=red&shape=fill`}
                        alt={result.name}
                        className="h-16 w-16 md:h-20 md:w-20 object-contain"
                      />
                    </div>

                    <h2 className="mb-2 font-display text-4xl font-bold text-primary md:text-5xl">
                      {result.name}
                    </h2>
                    <div className="mb-6 h-1 w-24 bg-secondary lg:mx-0 mx-auto rounded-full" />

                    <p className="mb-8 text-lg leading-relaxed text-gray-600">
                      "{result.prediction}"
                    </p>

                    <Button
                      size="lg"
                      onClick={() => setIsModalOpen(true)}
                      className="group relative w-full overflow-hidden rounded-xl bg-primary px-8 py-8 text-xl font-bold text-white shadow-xl transition-all hover:scale-[1.02] hover:bg-primary/90 md:w-auto"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <span className="relative z-10">
                          SUA SORTE NO LIG-LIG
                        </span>
                        <Ticket className="h-6 w-6 relative z-10" />
                      </div>
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                    </Button>
                    <p className="mt-4 text-xs text-muted-foreground">
                      *Ao clicar, você ganhará um benefício exclusivo.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <LeadModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  )
}
