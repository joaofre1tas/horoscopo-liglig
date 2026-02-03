import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2, Ticket, CheckCircle2 } from 'lucide-react'

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
  contact: z.string().min(5, {
    message: 'Informe um email ou telefone válido.',
  }),
})

interface LeadModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function LeadModal({ isOpen, onOpenChange }: LeadModalProps) {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      contact: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsLoading(false)
      setIsSuccess(true)
    }, 1500)
  }

  const handleClose = () => {
    onOpenChange(false)
    // Reset state after transition
    setTimeout(() => {
      setIsSuccess(false)
      form.reset()
    }, 300)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="border-secondary/20 bg-background/95 text-foreground backdrop-blur-xl sm:max-w-md">
        {!isSuccess ? (
          <>
            <DialogHeader className="space-y-3 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary/20">
                <Ticket className="h-6 w-6 text-secondary" />
              </div>
              <DialogTitle className="font-display text-2xl text-secondary">
                Resgate seu presente!
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Receba um cupom especial do Lig-Lig para usar na sua próxima
                visita.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 pt-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-secondary/80">Nome</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Como você se chama?"
                          className="border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-secondary focus:ring-secondary/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-secondary/80">
                        Email ou Telefone
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="seu@email.com ou (11) 99999-9999"
                          className="border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-secondary focus:ring-secondary/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-secondary font-bold text-primary hover:bg-secondary/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Gerando cupom...
                    </>
                  ) : (
                    'Quero meu cupom'
                  )}
                </Button>
              </form>
            </Form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-6 py-6 text-center animate-in fade-in zoom-in duration-300">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-green-500">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display text-2xl font-bold text-secondary">
                Sua sorte está garantida!
              </h3>
              <p className="text-muted-foreground">
                Em breve você receberá seu cupom do Lig-Lig. Aproveite para
                conhecer nosso cardápio.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:flex-row">
              <Button
                variant="outline"
                className="w-full border-secondary text-secondary hover:bg-secondary/10"
                onClick={handleClose}
              >
                Fechar
              </Button>
              <Button className="w-full bg-secondary text-primary hover:bg-secondary/90">
                Ver Cardápio
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
