/**
 * Hero.jsx — Sezione hero principale del portfolio.
 *
 * Full-viewport landing con:
 *  - Etichetta portfolio e stato disponibilità
 *  - Nome grande in stile tipografico (serif + italic)
 *  - Sottotitolo con ruolo e descrizione
 *  - Due CTA: "Vedi Progetti" e "Contattami"
 *  - Testo decorativo "FS" in background
 *  - Griglia sottile decorativa
 */

export const Hero = () => {
    return (
        <section
            id="about"
            className="relative min-h-screen flex items-center overflow-hidden px-6 sm:px-10 md:px-16 lg:px-24"
        >
            {/* ─── GRIGLIA DECORATIVA DI SFONDO ────────── */}
            <div className="hero-grid absolute inset-0 pointer-events-none" />

            {/* ─── TESTO DECORATIVO "FS" (Full Stack) ─── */}
            <div
                className="absolute right-[-2%] bottom-[-5%] text-[20rem] sm:text-[28rem] md:text-[34rem] font-serif font-bold leading-none pointer-events-none select-none"
                style={{
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(255,255,255,0.04)",
                }}
                aria-hidden="true"
            >
                FS
            </div>

            {/* ─── CONTENUTO PRINCIPALE ────────────────── */}
            <div className="relative z-10 w-full max-w-5xl pt-28 pb-20 md:pt-36 md:pb-28">

                {/* Tag portfolio versione + anno */}
                <p className="text-xs sm:text-sm font-mono tracking-widest text-primary/70 mb-3">
                    // PORTFOLIO.V1 — 2026
                </p>

                {/* Badge disponibilità */}
                <div className="flex items-center gap-2 mb-10 md:mb-14">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                    </span>
                    <span className="text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-muted-foreground">
                        Disponibile per opportunità
                    </span>
                </div>

                {/* ─── NOME GRANDE ──────────────────────── */}
                <h1 className="hero-name mb-6 md:mb-8">
                    <span className="block text-[3.5rem] sm:text-[5rem] md:text-[6.5rem] lg:text-[8rem] font-serif font-bold leading-[0.9] tracking-tight text-foreground">
                        Massimo
                    </span>
                    <span className="block text-[3.5rem] sm:text-[5rem] md:text-[6.5rem] lg:text-[8rem] font-serif font-bold italic leading-[0.9] tracking-tight text-primary">
                        Di Caro
                    </span>
                </h1>

                {/* ─── SOTTOTITOLO / BIO ────────────────── */}
                <p className="max-w-lg text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed mb-10 md:mb-14 font-mono">
                    Studente di <span className="text-foreground font-semibold">Informatica</span> &amp; Full Stack Developer.
                    <br />
                    Costruisco interfacce e sistemi che funzionano —
                    <br className="hidden sm:block" />
                    dalla logica all'estetica.
                </p>


            </div>

            {/* ─── LINEA DECORATIVA IN BASSO ───────────── */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </section>
    );
};