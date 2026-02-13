/* Main entry point for the application - renders the root React component */
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './main.css'
import { verifySupabaseConnection } from '@/lib/supabase'

createRoot(document.getElementById('root')!).render(<App />)

// Verificação de conexão com o Supabase (apenas em dev, log no console)
verifySupabaseConnection().then(({ ok, error }) => {
  if (ok) {
    console.log('[Supabase] Conexão OK.')
  } else {
    console.error('[Supabase] Falha na conexão:', error)
  }
})
