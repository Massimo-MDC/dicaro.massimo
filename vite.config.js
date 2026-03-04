/**
 * vite.config.js — Configurazione di Vite.
 *
 * Plugin:
 *  - @vitejs/plugin-react: supporto React (JSX, Fast Refresh)
 *  - @tailwindcss/vite: integrazione Tailwind CSS v4
 *
 * Alias:
 *  - "@" punta a "./src" per import puliti (es. @/components/Button)
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),         // Abilita JSX e Fast Refresh per React
    tailwindcss()    // Compila le classi Tailwind CSS
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // @ → cartella src
    }
  }
})
