/**
 * About.jsx — Sezione competenze e statistiche.
 *
 * Mostra:
 *  - Griglia di competenze tecnologiche (carosello auto-scroll)
 *  - Riga di statistiche (anni, progetti, tecnologie)
 */

// ─── DATI STATISTICHE ────────────────────────────────────
// Mostrate in fondo alla sezione come numeri evidenziati
const stats = [
    { value: "2+", label: "Anni di esperienza" },
    { value: "5+", label: "Progetti completati" },
    { value: "10+", label: "Tecnologie usate" },
];

// ─── COMPETENZE ──────────────────────────────────────────
// Mostrate come pills in un carosello auto-scrolling
const skills = [
    "React", "JavaScript", "Java", "Spring Boot",
    "Tailwind CSS", "Node.js", "Git", "REST API",
    "HTML/CSS", "SQL",
];

export const About = () => {
    return (
        <section className="relative py-16 md:py-24 px-4 sm:px-6 overflow-x-clip">

            {/* Cerchio ambient glow decorativo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto max-w-5xl relative z-10">

                {/* ─── SKILLS CAROUSEL (auto-scroll infinito) ── */}
                <div className="mb-12 md:mb-16">
                    <h4 className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4 text-center">
                        Competenze
                    </h4>
                    {/* Contenitore con maschere sfumate ai lati */}
                    <div className="skills-carousel-mask overflow-hidden">
                        {/* Nastro scorrevole — duplicato per loop continuo */}
                        <div className="skills-carousel-track flex gap-3 w-max hover:[animation-play-state:paused]">
                            {/* Prima copia */}
                            {skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="shrink-0 px-4 py-2 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/15 whitespace-nowrap"
                                >
                                    {skill}
                                </span>
                            ))}
                            {/* Seconda copia (per seamless loop) */}
                            {skills.map((skill) => (
                                <span
                                    key={`dup-${skill}`}
                                    aria-hidden="true"
                                    className="shrink-0 px-4 py-2 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/15 whitespace-nowrap"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ─── DIVISORE SFUMATO ───────────────── */}
                <div className="mb-12 md:mb-16 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                {/* ─── RIGA STATISTICHE ───────────────── */}
                <div className="grid grid-cols-3 gap-6 text-center">
                    {stats.map((stat) => (
                        <div key={stat.label} className="group">
                            {/* Numero grande con effetto scale al hover */}
                            <p className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-primary group-hover:scale-110 transition-transform duration-300 inline-block">
                                {stat.value}
                            </p>
                            {/* Etichetta sotto il numero */}
                            <p className="text-sm font-mono tracking-wide text-muted-foreground mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};