import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { CSV_COLUMNS, type Lead, type LeadCsvColumnKey } from '@/types/lead'

function escapeCsvValue(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return ''
  const s = String(value)
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`
  }
  return s
}

function formatCreatedAt(created_at: string): string {
  try {
    const d = new Date(created_at)
    return d.toLocaleString('pt-BR')
  } catch {
    return created_at
  }
}

interface ExportCsvModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  leads: Lead[]
}

export function ExportCsvModal({
  open,
  onOpenChange,
  leads,
}: ExportCsvModalProps) {
  const [selectedColumns, setSelectedColumns] = useState<LeadCsvColumnKey[]>(
    CSV_COLUMNS.map((c) => c.key),
  )

  const toggleColumn = (key: LeadCsvColumnKey) => {
    setSelectedColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    )
  }

  const selectAll = () => {
    setSelectedColumns(CSV_COLUMNS.map((c) => c.key))
  }

  const handleExport = () => {
    const columns = CSV_COLUMNS.filter((c) => selectedColumns.includes(c.key))
    const header = columns.map((c) => c.label).join(',')
    const rows = leads.map((lead) => {
      return columns
        .map((col) => {
          let value: string | number | null | undefined
          if (col.key === 'created_at') {
            value = formatCreatedAt(lead.created_at)
          } else {
            value = lead[col.key as keyof Lead]
          }
          return escapeCsvValue(value)
        })
        .join(',')
    })
    const csv = [header, ...rows].join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Exportar CSV</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Selecione as colunas que deseja incluir no arquivo:
        </p>
        <div className="grid gap-2 py-2">
          <Button type="button" variant="outline" size="sm" onClick={selectAll}>
            Selecionar todas
          </Button>
          {CSV_COLUMNS.map(({ key, label }) => (
            <label
              key={key}
              className="flex items-center gap-2 cursor-pointer text-sm"
            >
              <Checkbox
                checked={selectedColumns.includes(key)}
                onCheckedChange={() => toggleColumn(key)}
              />
              {label}
            </label>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleExport}
            disabled={selectedColumns.length === 0}
          >
            Exportar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
