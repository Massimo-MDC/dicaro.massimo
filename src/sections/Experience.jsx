/**
 * Experience.jsx — Sezione "Esperienza" del portfolio.
 *
 * Mostra un messaggio creativo "404 NOT FOUND ...per ora" per indicare
 * che non c'è ancora esperienza lavorativa, ma con un tono positivo.
 *
 * Include:
 *  - Grande "404" semi-trasparente con effetto pulse
 *  - Messaggio "NOT FOUND ...per ora"
 *  - Mini-terminale animato con comandi finti
 */

export const Experience = () => {
    return (
        <section id="experience" className="relative py-20 md:py-28 px-4 sm:px-6">

            {/* Cerchio ambient glow decorativo */}
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto max-w-5xl relative z-10">

                {/* ─── HEADER SEZIONE ──────────────────── */}
                <div className="mb-10 md:mb-16 text-center">
                    <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase text-primary border border-primary/20 bg-primary/5 mb-5">
                        Esperienza
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif">
                        Il mio <span className="text-primary">percorso</span>
                    </h2>
                </div>

                {/* ─── CARD 404 (glassmorphism) ────────── */}
                <div className="glass rounded-2xl p-8 sm:p-12 md:p-16 text-center">

                    {/* "404" gigante con 2 livelli: gradiente + pulse */}
                    <div className="relative mb-6 select-none">
                        {/* Layer 1: testo con gradiente (sfumato verso il trasparente) */}
                        <span className="text-[8rem] sm:text-[10rem] md:text-[12rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-primary/20 to-primary/5">
                            404
                        </span>
                        {/* Layer 2: sovrapposto, con animazione pulse per effetto "glitch" */}
                        <span className="absolute inset-0 flex items-center justify-center text-[8rem] sm:text-[10rem] md:text-[12rem] font-black leading-none tracking-tighter text-primary/10 animate-pulse">
                            404
                        </span>
                    </div>

                    {/* ─── MESSAGGIO CENTRALE ─────────────── */}
                    <div className="space-y-4 max-w-lg mx-auto">
                        <h3 className="text-2xl sm:text-3xl font-bold">
                            <span className="text-primary">NOT FOUND</span>
                            {/* "...per ora" — tocco ironico e positivo */}
                            <span className="text-muted-foreground ml-2 text-lg font-normal">...per ora</span>
                        </h3>

                        <p className="text-muted-foreground leading-relaxed">
                            Nessuna esperienza lavorativa ancora, ma sto costruendo il mio percorso
                            un progetto alla volta. Ogni riga di codice mi avvicina al mio obiettivo.
                        </p>

                        {/* ─── MINI-TERMINALE ANIMATO ─────── */}
                        {/* Simula un terminale con comandi e output */}
                        <div className="inline-block mt-6 px-5 py-3 rounded-lg bg-background/80 border border-border font-mono text-sm text-left">
                            {/* Comando: $ status --esperienza */}
                            <span className="text-muted-foreground">$</span>{" "}
                            <span className="text-primary">status</span>{" "}
                            <span className="text-foreground">--esperienza</span>
                            <br />
                            {/* Output: ⚡ In fase di caricamento... (colore highlight dorato) */}
                            <span className="text-highlight">⚡ In fase di caricamento...</span>
                            <br />
                            {/* Comando: $ echo "Pronto a tutto!" */}
                            <span className="text-muted-foreground">$</span>{" "}
                            <span className="text-primary">echo</span>{" "}
                            <span className="text-foreground">"Pronto a tutto!"</span>
                            {/* Cursore lampeggiante */}
                            <span className="inline-block w-2 h-4 bg-primary/70 ml-1 animate-pulse align-middle" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};