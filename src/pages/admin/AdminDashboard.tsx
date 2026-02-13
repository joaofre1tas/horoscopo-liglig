import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, Download, Loader2, Trash2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { ExportCsvModal } from '@/components/admin/ExportCsvModal'
import type { Lead } from '@/types/lead'

function formatDate(created_at: string) {
  try {
    return new Date(created_at).toLocaleString('pt-BR')
  } catch {
    return created_at
  }
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [exportOpen, setExportOpen] = useState(false)
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null)
  const [deleting, setDeleting] = useState(false)

  const fetchLeads = () => {
    supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        setLoading(false)
        if (error) {
          console.error(error)
          return
        }
        setLeads((data as Lead[]) ?? [])
      })
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  async function handleDeleteLead() {
    if (!leadToDelete) return
    setDeleting(true)
    const { error } = await supabase.from('leads').delete().eq('id', leadToDelete.id)
    setDeleting(false)
    setLeadToDelete(null)
    if (error) {
      console.error(error)
      return
    }
    setLeads((prev) => prev.filter((l) => l.id !== leadToDelete.id))
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/admin', { replace: true })
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b bg-white px-4 py-3 shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <h1 className="text-xl font-semibold">Admin — Leads</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setExportOpen(true)}
              disabled={leads.length === 0}
            >
              <Download className="mr-2 h-4 w-4" />
              Exportar CSV
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl p-4">
        <Card>
          <CardHeader>
            <CardTitle>Leads capturados</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : leads.length === 0 ? (
              <p className="py-8 text-center text-muted-foreground">
                Nenhum lead ainda.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ano</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>E-mail</TableHead>
                      <TableHead>WhatsApp</TableHead>
                      <TableHead>Cupom</TableHead>
                      <TableHead>PIN</TableHead>
                      <TableHead>Condição</TableHead>
                      <TableHead>Signo</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead className="w-[80px]">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell>{lead.birth_year}</TableCell>
                        <TableCell>{lead.name}</TableCell>
                        <TableCell>{lead.email}</TableCell>
                        <TableCell>{lead.whatsapp}</TableCell>
                        <TableCell>{lead.coupon_code}</TableCell>
                        <TableCell>{lead.pin ?? '—'}</TableCell>
                        <TableCell className="max-w-[180px] truncate">
                          {lead.coupon_condition ?? '—'}
                        </TableCell>
                        <TableCell>{lead.zodiac_sign_name}</TableCell>
                        <TableCell className="whitespace-nowrap text-muted-foreground">
                          {formatDate(lead.created_at)}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => setLeadToDelete(lead)}
                            title="Excluir lead"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <ExportCsvModal
        open={exportOpen}
        onOpenChange={setExportOpen}
        leads={leads}
      />

      <AlertDialog open={!!leadToDelete} onOpenChange={(open) => !open && setLeadToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir lead?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O registro de {leadToDelete?.name} será removido.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault()
                handleDeleteLead()
              }}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? 'Excluindo...' : 'Excluir'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
