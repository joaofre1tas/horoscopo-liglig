import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Loader2,
  Ticket,
  CheckCircle2,
  Copy,
  ExternalLink,
  ShoppingBag,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { type ZodiacSign, getPinForCoupon } from '@/lib/zodiac'
import { supabase } from '@/lib/supabase'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'O nome deve ter pelo menos 2 caracteres.',
  }),
  email: z.string().email({
    message: 'Por favor, informe um email válido.',
  }),
  whatsapp: z.string().min(14, {
    message: 'Informe um WhatsApp válido (DDD + número).',
  }),
})

interface LeadModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  zodiacResult: ZodiacSign | null
  birthYear: number | null
}

export function LeadModal({
  isOpen,
  onOpenChange,
  zodiacResult,
  birthYear,
}: LeadModalProps) {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      whatsapp: '',
    },
  })

  // Simple phone formatter: (11) 99999-9999
  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d)(\d{4})$/, '$1-$2')
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const year = birthYear ?? new Date().getFullYear()
    const couponCode = zodiacResult?.couponCode ?? 'ANONOVOCHINES'
    const couponCondition = zodiacResult?.couponCondition ?? null
    const zodiacSignName = zodiacResult?.name ?? ''
    const pin = getPinForCoupon(couponCode)

    const { error } = await supabase.from('leads').insert({
      birth_year: year,
      name: values.name,
      email: values.email,
      whatsapp: values.whatsapp,
      coupon_code: couponCode,
      coupon_condition: couponCondition,
      zodiac_sign_name: zodiacSignName,
      pin: pin || null,
    })

    setIsLoading(false)
    if (error) {
      console.error('[LeadModal] Supabase insert error:', error.code, error.message)
      toast({
        title: 'Erro ao salvar',
        description:
          error.code === '42501' || error.message?.includes('policy')
            ? 'Permissão negada. Verifique as políticas RLS da tabela leads no Supabase.'
            : 'Não foi possível gerar seu cupom. Tente novamente.',
        variant: 'destructive',
      })
      return
    }
    setIsSuccess(true)
  }

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open)
    // Reset state when modal is closed
    if (!open) {
      setTimeout(() => {
        setIsSuccess(false)
        form.reset()
      }, 300)
    }
  }

  const couponCode = zodiacResult?.couponCode || 'ANONOVOCHINES'
  const couponCondition = zodiacResult?.couponCondition || ''
  const pin = getPinForCoupon(couponCode)

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText(couponCode)
    toast({
      title: 'Cupom copiado!',
      description: `Código ${couponCode} copiado para a área de transferência.`,
      duration: 3000,
    })
  }

  const handleCopyPin = () => {
    if (!pin) return
    navigator.clipboard.writeText(pin)
    toast({
      title: 'PIN copiado!',
      description: `PIN ${pin} copiado para a área de transferência.`,
      duration: 3000,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="border-secondary bg-white text-primary sm:max-w-md">
        {!isSuccess ? (
          <>
            <DialogHeader className="space-y-3 text-center sm:text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Ticket className="h-7 w-7 text-primary" />
              </div>
              <DialogTitle className="font-sans font-black uppercase text-2xl text-primary">
                Resgate seu presente!
              </DialogTitle>
              <DialogDescription className="text-gray-600 font-medium">
                Preencha seus dados para receber um cupom exclusivo do Lig-Lig.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 pt-2"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-medium">
                        Nome
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Como você se chama?"
                          className="border-primary/20 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-primary/20 font-medium"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-medium">
                        E-mail
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="seu@email.com"
                          className="border-primary/20 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-primary/20 font-medium"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="whatsapp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-medium">
                        WhatsApp
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="(11) 99999-9999"
                          className="border-primary/20 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-primary/20 font-medium"
                          {...field}
                          maxLength={15}
                          onChange={(e) => {
                            const formatted = formatPhone(e.target.value)
                            field.onChange(formatted)
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="mt-2 w-full bg-black text-secondary hover:bg-black/90 font-black uppercase text-lg h-12 transition-all shadow-md hover:shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Gerando cupom...
                    </>
                  ) : (
                    'QUERO MEU CUPOM'
                  )}
                </Button>
              </form>
            </Form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-6 py-4 text-center animate-in fade-in zoom-in duration-300">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 shadow-sm">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div className="space-y-2">
              <h3 className="font-sans font-black uppercase text-2xl text-primary">
                Sorte Garantida!
              </h3>
              <p className="text-gray-600 px-2 text-sm font-medium">
                Use o cupom abaixo no nosso delivery e aproveite seu desconto
                especial.
              </p>
            </div>

            {/* Coupon Display */}
            <div className="w-full space-y-2 rounded-xl border-2 border-dashed border-secondary bg-secondary/5 p-4">
              <p className="text-xs font-black uppercase tracking-widest text-primary/70">
                Seu Cupom
              </p>
              <div className="flex items-center justify-between gap-2 rounded-lg bg-white p-2 shadow-sm ring-1 ring-black/5">
                <code className="flex-1 font-mono text-xl font-bold text-primary tracking-wider pl-2">
                  {couponCode}
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-9 text-primary hover:bg-primary/10 hover:text-primary gap-2 px-3 font-semibold font-medium"
                  onClick={handleCopyCoupon}
                >
                  <Copy className="h-4 w-4" />
                  COPIAR
                </Button>
              </div>
              {couponCondition && (
                <p className="text-[10px] font-bold text-primary/60 uppercase tracking-tight">
                  {couponCondition}
                </p>
              )}
            </div>

            {/* PIN Display - mesmo estilo do cupom */}
            <div className="w-full space-y-2 rounded-xl border-2 border-dashed border-secondary bg-secondary/5 p-4">
              <p className="text-xs font-black uppercase tracking-widest text-primary/70">
                Seu PIN
              </p>
              <div className="flex items-center justify-between gap-2 rounded-lg bg-white p-2 shadow-sm ring-1 ring-black/5">
                <code className="flex-1 font-mono text-xl font-bold text-primary tracking-wider pl-2">
                  {pin || '—'}
                </code>
                {pin ? (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-9 text-primary hover:bg-primary/10 hover:text-primary gap-2 px-3 font-semibold font-medium"
                    onClick={handleCopyPin}
                  >
                    <Copy className="h-4 w-4" />
                    COPIAR
                  </Button>
                ) : null}
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 pt-2">
              <Button
                asChild
                className="w-full bg-black text-white hover:bg-black/90 font-black uppercase h-12 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 transition-all"
              >
                <a
                  href="https://delivery.liglig.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ShoppingBag className="h-5 w-5" />
                  USAR NO DELIVERY
                  <ExternalLink className="h-4 w-4 opacity-70" />
                </a>
              </Button>

              <Button
                variant="outline"
                className="w-full border-primary/20 text-primary hover:bg-primary/5 hover:text-primary hover:border-primary/50 font-medium"
                onClick={() => onOpenChange(false)}
              >
                Fechar
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
