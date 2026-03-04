/**
 * main.jsx — Entry point dell'applicazione React.
 *
 * Monta il componente <App /> nel DOM, all'interno dell'elemento
 * con id "root" definito in index.html.
 * StrictMode attiva controlli extra durante lo sviluppo.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'   // Importa il design system (colori, glass, font)
import App from './App.jsx'

// Crea la root React e renderizza l'app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
