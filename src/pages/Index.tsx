import { useState } from 'react'
import { ZodiacWheel } from '@/components/ZodiacWheel'
import { LeadModal } from '@/components/LeadModal'
import { ResultModal } from '@/components/ResultModal'
import { type ZodiacSign } from '@/lib/zodiac'
import { ChevronDown } from 'lucide-react'
import bannerImg from '@/assets/imagem-topo-47f11.png'

export default function Index() {
  const [result, setResult] = useState<ZodiacSign | null>(null)
  const [isResultModalOpen, setIsResultModalOpen] = useState(false)
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)

  const handleResult = (sign: ZodiacSign) => {
    setResult(sign)
    setIsResultModalOpen(true)
  }

  const handleClaim = () => {
    setIsResultModalOpen(false)
    // Small delay to allow the result modal to close smoothly
    setTimeout(() => {
      setIsLeadModalOpen(true)
    }, 200)
  }

  return (
    <div className="flex w-full flex-col flex-1">
      {/* Top Banner */}
      <div className="w-full flex justify-center pt-4 px-4 relative z-20">
        <img
          src={bannerImg}
          alt="Ano Novo Chinês Lig-Lig"
          className="w-full max-w-sm md:max-w-lg object-contain drop-shadow-2xl"
        />
      </div>

      {/* Hero Section */}
      <section className="relative flex min-h-[300px] flex-col items-center justify-start px-4 pt-4 pb-8 text-center text-white md:min-h-[400px] md:pt-6 md:pb-20">
        <div className="relative z-10 mx-auto max-w-4xl animate-fade-in-down space-y-3 md:space-y-6">
          <h1 className="mt-[10px] flex flex-col items-center justify-center font-sans font-black uppercase leading-none tracking-tighter">
            <span className="text-3xl leading-[0.9] text-white sm:text-4xl md:text-5xl md:leading-none lg:text-6xl">
              DESCUBRA SUA SORTE NO
            </span>
            <span className="text-gold-texture text-5xl leading-[0.85] sm:text-5xl md:text-6xl md:leading-none lg:text-[5rem] py-0 md:py-2">
              HORÓSCOPO CHINÊS
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-sm font-medium leading-snug text-white/90 px-8 md:px-0 md:text-xl md:leading-relaxed">
            Veja o que este ano reserva para você — e ganhe um presente
            exclusivo do Lig-Lig para celebrar os bons momentos.
          </p>

          <div className="animate-bounce">
            <ChevronDown className="mx-auto h-8 w-8 text-white/50" />
          </div>
        </div>
      </section>

      {/* Main Interaction Section */}
      <section className="relative -mt-6 mb-20 w-full md:-mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center gap-12">
            {/* Wheel */}
            <div className="relative z-20 animate-fade-in-up">
              <ZodiacWheel onResult={handleResult} />
            </div>
          </div>
        </div>
      </section>

      {/* Result Modal - Shows result text and prompts to claim */}
      <ResultModal
        isOpen={isResultModalOpen}
        onOpenChange={setIsResultModalOpen}
        result={result}
        onClaim={handleClaim}
      />

      {/* Lead Modal - Captures lead and shows coupon */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onOpenChange={setIsLeadModalOpen}
        zodiacResult={result}
      />
    </div>
  )
}
