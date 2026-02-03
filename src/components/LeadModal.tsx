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
                  name="contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-bold">
                        Email ou Telefone
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="seu@email.com ou (11) 99999-9999"
                          className="border-primary/20 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-primary/20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-primary text-white hover:bg-primary/90 font-bold text-lg h-12"
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
          <div className="flex flex-col items-center justify-center space-y-6 py-6 text-center animate-in fade-in zoom-in duration-300">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display text-2xl font-bold text-primary">
                Sua sorte está garantida!
              </h3>
              <p className="text-gray-600 px-4">
                Em breve você receberá seu cupom do Lig-Lig. Aproveite para
                conhecer nosso cardápio e fazer seu pedido.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:flex-row pt-4">
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary/5"
                onClick={handleClose}
              >
                Fechar
              </Button>
              <Button className="w-full bg-secondary text-primary hover:bg-secondary/90 font-bold">
                Ver Cardápio
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
