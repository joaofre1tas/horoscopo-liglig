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
        <div className="relative z-10 mx-auto w-full max-w-5xl animate-fade-in-down space-y-4 md:space-y-8">
          <h1 className="flex flex-col items-center justify-center font-sans font-black uppercase w-full select-none">
            {/* Line 1: DESCUBRA SUA SORTE */}
            <span className="text-white leading-tight w-full block text-[1.5rem] sm:text-[2.5rem] md:text-[3.8rem] lg:text-[4.8rem] tracking-tight">
              DESCUBRA SUA SORTE
            </span>

            {/* Line 2: NO */}
            <span className="text-white leading-snug py-2 md:py-3 block text-[1rem] sm:text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] tracking-widest">
              NO
            </span>

            {/* Line 3: HORÓSCOPO */}
            <span className="text-gold-texture leading-none w-full block pb-2 md:pb-4 text-[3.2rem] sm:text-[5rem] md:text-[7.5rem] lg:text-[9.5rem] tracking-tighter">
              HORÓSCOPO
            </span>

            {/* Line 4: CHINÊS */}
            <span className="text-gold-texture leading-none w-full block text-[4.8rem] sm:text-[7.5rem] md:text-[11rem] lg:text-[14rem] tracking-tighter">
              CHINÊS
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-sm font-medium leading-snug text-white/90 px-8 md:px-0 md:text-xl md:leading-relaxed">
            Veja o que este ano reserva para você — e ganhe um presente
            exclusivo do Lig-Lig para celebrar os bons momentos.
          </p>

          <div className="animate-bounce pt-4">
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
