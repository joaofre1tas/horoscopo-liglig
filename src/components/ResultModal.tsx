import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { type ZodiacSign } from '@/lib/zodiac'
import { Ticket } from 'lucide-react'

interface ResultModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  result: ZodiacSign | null
  onClaim: () => void
}

export function ResultModal({
  isOpen,
  onOpenChange,
  result,
  onClaim,
}: ResultModalProps) {
  if (!result) return null

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-0 bg-white shadow-2xl p-8 rounded-3xl flex flex-col items-center text-center">
        {/* Animal Icon */}
        <div className="bg-red-100 p-4 rounded-full mb-4 w-24 h-24 flex items-center justify-center">
          <img
            src={`https://img.usecurling.com/i?q=${result.iconQuery}&color=black&shape=fill`}
            alt={result.name}
            className="w-16 h-16 object-contain opacity-80"
          />
        </div>

        {/* Animal Name */}
        <DialogTitle className="text-4xl font-black text-red-600 uppercase mb-2 text-center">
          {result.name}
        </DialogTitle>

        {/* Decorative Divider */}
        <div className="w-16 h-1 bg-yellow-400 mb-6 rounded-full" />

        {/* Prediction Text */}
        <DialogDescription className="text-gray-600 font-medium text-lg leading-relaxed text-center mb-8">
          "{result.prediction}"
        </DialogDescription>

        {/* Action Button */}
        <Button
          className="w-full bg-black hover:bg-black/90 text-yellow-400 font-black uppercase text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
          onClick={onClaim}
        >
          <span className="mr-2">SUA SORTE NO LIG-LIG</span>
          <Ticket className="w-5 h-5" />
        </Button>

        {/* Footer Text */}
        <p className="mt-4 text-xs text-gray-400 font-medium">
          *Ao clicar, você ganhará um benefício exclusivo.
        </p>
      </DialogContent>
    </Dialog>
  )
}
