import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !anonKey) {
  throw new Error(
    'Variáveis de ambiente do Supabase não encontradas. Verifique VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no .env'
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
