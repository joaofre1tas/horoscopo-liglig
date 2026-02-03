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
import { cn } from '@/lib/utils'

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
}

export function LeadModal({ isOpen, onOpenChange }: LeadModalProps) {
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      console.log('Lead Captured:', values)
      setIsLoading(false)
      setIsSuccess(true)
    }, 1500)
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

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText('ANONOVOCHINES')
    toast({
      title: 'Cupom copiado!',
      description: 'Código ANONOVOCHINES copiado para a área de transferência.',
      duration: 3000,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="border-secondary bg-white text-primary sm:max-w-md">
        {!isSuccess ? (
          <>
            <DialogHeader className="space-y-3 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Ticket className="h-7 w-7 text-primary" />
              </div>
              <DialogTitle className="font-display text-2xl font-bold text-primary">
                Resgate seu presente!
              </DialogTitle>
              <DialogDescription className="text-gray-600">
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
                      <FormLabel className="text-primary font-bold">
                        Nome
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Como você se chama?"
                          className="border-primary/20 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-primary/20"
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
                      <FormLabel className="text-primary font-bold">
                        E-mail
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="seu@email.com"
                          className="border-primary/20 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-primary/20"
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
                      <FormLabel className="text-primary font-bold">
                        WhatsApp
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="(11) 99999-9999"
                          className="border-primary/20 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-primary/20"
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
                  className="mt-2 w-full bg-primary text-white hover:bg-primary/90 font-bold text-lg h-12 transition-all shadow-md hover:shadow-lg"
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
              <h3 className="font-display text-2xl font-bold text-primary">
                Sorte Garantida!
              </h3>
              <p className="text-gray-600 px-2 text-sm">
                Use o cupom abaixo no nosso delivery e aproveite seu desconto
                especial.
              </p>
            </div>

            {/* Coupon Display */}
            <div className="w-full space-y-2 rounded-xl border-2 border-dashed border-secondary bg-secondary/5 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-primary/70">
                Seu Cupom
              </p>
              <div className="flex items-center justify-between gap-2 rounded-lg bg-white p-2 shadow-sm ring-1 ring-black/5">
                <code className="flex-1 font-mono text-xl font-bold text-primary tracking-wider">
                  ANONOVOCHINES
                </code>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-10 w-10 text-primary hover:bg-primary/10 hover:text-primary"
                  onClick={handleCopyCoupon}
                >
                  <Copy className="h-5 w-5" />
                  <span className="sr-only">Copiar</span>
                </Button>
              </div>
              <p className="text-[10px] text-gray-500">
                Clique no ícone para copiar
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 pt-2">
              <Button
                asChild
                className="w-full bg-primary text-white hover:bg-primary/90 font-bold h-12 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
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
                className="w-full border-primary/20 text-primary hover:bg-primary/5 hover:text-primary hover:border-primary/50"
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
