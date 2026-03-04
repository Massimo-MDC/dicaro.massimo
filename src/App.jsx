/**
 * App.jsx — Componente root dell'applicazione.
 *
 * Assembla tutte le sezioni del portfolio in ordine:
 * CodeBackground → Navbar → Hero → About → Projects → Experience → Testimonials → Contact
 *
 * Il CodeBackground è posizionato a z-index -1, dietro a tutto il contenuto.
 */

import { CodeBackground } from "@/components/CodeBackground";
import { GlowCursor } from "@/components/GlowCursor";
import { Navbar } from "@/layout/Navbar";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects"
import { Experience } from "@/sections/Experience";
import { Testimonials } from "@/sections/Testimonials";
import { Contact } from "@/sections/Contact";

function App() {
  return (
    // Container principale: altezza minima schermo intero, overflow orizzontale nascosto
    <div className="min-h-screen overflow-x-hidden">
      <GlowCursor />         {/* Cursore luminoso personalizzato */}
      <CodeBackground />   {/* Animazione codice in background (z-index -1) */}
      <Navbar />            {/* Navigazione fissa in alto (z-index 50) */}
      <main>
        <Hero />            {/* Sezione hero (placeholder) */}
        <About />           {/* Chi sono, competenze, statistiche */}
        <Projects />        {/* Carosello progetti GitHub */}
        <Experience />      {/* Esperienza — 404 NOT FOUND creativo */}
        <Testimonials />    {/* Testimonianze (placeholder) */}
        <Contact />         {/* Link social + footer */}
      </main>
    </div>
  )
}

export default App
