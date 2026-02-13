import { createClient } from '@supabase/supabase-js'

// Try to get env vars, but fallback to provided credentials if missing to prevent runtime crash
const url =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://xjcjulebwbsiijdyyjdd.supabase.co'
const anonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqY2p1bGVid2JzaWlqZHl5amRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5Mjg4MzYsImV4cCI6MjA4NjUwNDgzNn0.mgjP0PBj_XO8TijxyrKPKAhmiHE8jEBVlXJTrvKjHnc'

if (!url || !anonKey) {
  throw new Error(
    'Variáveis de ambiente do Supabase não encontradas. Verifique VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no .env',
  )
}

export const supabase = createClient(url, anonKey)

/**
 * Verifica se a conexão com o Supabase está funcionando.
 * Usa auth.getSession() para validar URL e anon key sem depender de tabelas.
 */
export async function verifySupabaseConnection(): Promise<{
  ok: boolean
  error?: string
}> {
  try {
    const { error } = await supabase.auth.getSession()
    if (error) {
      return { ok: false, error: error.message }
    }
    return { ok: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return { ok: false, error: message }
  }
}
