/**
 * Projects.jsx — Sezione progetti del portfolio.
 *
 * Mostra i progetti in una lista verticale con:
 *  - Card con immagine preview e dettagli sovrapposti
 *  - Hover effect con glow e leggero scale
 *  - Click per aprire un modal zoom con descrizione completa e tecnologie
 *  - Backdrop blur per il modal
 *  - Animazioni smooth di entrata/uscita
 */

import { useState, useEffect } from "react";

// ─── DATI DEI PROGETTI ───────────────────────────────────
const projects = [
    {
        title: "TicketFlow",
        description:
            "Piattaforma completa di gestione eventi e biglietteria. Backend RESTful con autenticazione JWT, gestione ruoli, CRUD completo per eventi, artisti, venue e ordini.",
        image: "/project-ticketflow.png",
        tags: ["Java", "Spring Boot", "REST API", "JWT", "SQL"],
        github: "https://github.com/Massimo-MDC/Exam_Back-End_ticketflow",
    },
    {
        title: "Hairbooker",
        description:
            "Web app per la prenotazione di appuntamenti dal parrucchiere. Interfaccia interattiva con selezione servizio, barbiere, calendario e slot orari disponibili.",
        image: "/project-hairbooker.png",
        tags: ["JavaScript", "React", "Node.js", "CSS"],
        github: "https://github.com/Massimo-MDC/Hairbooker",
    },
    {
        title: "Task Manager",
        description:
            "Applicazione per la gestione delle attività con organizzazione in colonne stile Kanban. Supporto per priorità, assegnazione e tracciamento dello stato dei task.",
        image: "/project-taskmanager.png",
        tags: ["Java", "OOP", "Design Patterns"],
        github: "https://github.com/Massimo-MDC/Task_Manager",
    },
];

export const Projects = () => {
    const [selected, setSelected] = useState(null);  // Progetto aperto nel modal (null = chiuso)
    const [isClosing, setIsClosing] = useState(false); // Animazione di chiusura in corso

    // Blocca lo scroll del body quando il modal è aperto
    useEffect(() => {
        if (selected !== null) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [selected]);

    // Chiusura animata del modal (300ms fade-out, poi rimuove)
    const closeModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setSelected(null);
            setIsClosing(false);
        }, 300);
    };

    // Chiusura con tasto Escape
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape" && selected !== null) closeModal();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [selected]);

    return (
        <section id="projects" className="relative py-20 md:py-28 px-4 sm:px-6">
            {/* Cerchio ambient glow decorativo */}
            <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto max-w-5xl relative z-10">
                {/* ─── HEADER SEZIONE ──────────────────── */}
                <div className="mb-10 md:mb-16 text-center">
                    <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase text-primary border border-primary/20 bg-primary/5 mb-5">
                        Progetti
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif">
                        I miei <span className="text-primary">lavori</span>
                    </h2>
                </div>

                {/* ─── LISTA PROGETTI CON LINEA LED ──────── */}
                <div className="flex gap-6 md:gap-10">

                    {/* Linea LED laterale (solo desktop) */}
                    <div className="hidden md:flex flex-col items-center py-4 shrink-0">
                        {projects.map((_, index) => (
                            <div key={index} className="flex flex-col items-center flex-1">
                                {/* Dot LED luminoso */}
                                <div className="relative">
                                    <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_rgba(32,178,166,0.8),0_0_20px_rgba(32,178,166,0.4)] z-10 relative" />
                                    {/* Pulse animato */}
                                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-primary/50 animate-ping" />
                                </div>
                                {/* Segmento linea tra i dot */}
                                {index < projects.length - 1 && (
                                    <div className="w-px flex-1 bg-gradient-to-b from-primary/60 via-primary/20 to-primary/60 shadow-[0_0_6px_rgba(32,178,166,0.3)]" />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Lista card progetti */}
                    <div className="space-y-6 flex-1 min-w-0">
                        {projects.map((project, index) => (
                            <div
                                key={project.title}
                                onClick={() => setSelected(index)}
                                className="group glass rounded-2xl overflow-hidden cursor-pointer
                                       transition-all duration-500 ease-out
                                       hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(32,178,166,0.12)]
                                       hover:border-primary/30"
                            >
                                <div className="grid md:grid-cols-5 gap-0">
                                    {/* Immagine preview */}
                                    <div className="md:col-span-2 relative h-52 sm:h-60 md:h-64 bg-surface overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                        />
                                        {/* Gradiente sfumato sul bordo destro (desktop) / basso (mobile) */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[var(--color-surface)]/60" />

                                        {/* Numero progetto overlay */}
                                        <span className="absolute top-4 left-4 text-5xl font-bold font-serif text-primary/20 group-hover:text-primary/40 transition-colors duration-500">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                    </div>

                                    {/* Contenuto testuale */}
                                    <div className="md:col-span-3 p-5 sm:p-6 md:p-8 flex flex-col justify-center">
                                        {/* Titolo */}
                                        <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                                            {project.title}
                                        </h3>

                                        {/* Descrizione troncata */}
                                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                                            {project.description}
                                        </p>

                                        {/* Tag tecnologici */}
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/15"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Hint "clicca per dettagli" */}
                                        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            Clicca per i dettagli
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ─── MODAL ZOOM PROGETTO ──────────────────── */}
                {selected !== null && (
                    <div
                        className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8
                                transition-all duration-300
                                ${isClosing ? "opacity-0" : "opacity-100"}`}
                        onClick={closeModal}
                    >
                        {/* Backdrop blur */}
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />

                        {/* Card del modal */}
                        <div
                            className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto
                                    glass rounded-2xl shadow-2xl shadow-primary/10
                                    transition-all duration-300
                                    ${isClosing
                                    ? "scale-90 opacity-0"
                                    : "scale-100 opacity-100"
                                }`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Bottone chiudi */}
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/60 backdrop-blur-sm border border-border
                                       flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
                                aria-label="Chiudi"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Immagine grande */}
                            <div className="relative h-56 sm:h-72 md:h-80 bg-surface overflow-hidden rounded-t-2xl">
                                <img
                                    src={projects[selected].image}
                                    alt={projects[selected].title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent" />
                            </div>

                            {/* Contenuto dettaglio */}
                            <div className="p-6 sm:p-8 md:p-10 space-y-5">
                                {/* Titolo */}
                                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                                    {projects[selected].title}
                                </h3>

                                {/* Descrizione completa */}
                                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                                    {projects[selected].description}
                                </p>

                                {/* Tecnologie */}
                                <div>
                                    <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                                        Tecnologie utilizzate
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {projects[selected].tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-4 py-1.5 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/15"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Link GitHub */}
                                <a
                                    href={projects[selected].github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary border border-primary/20
                                           hover:bg-primary/20 hover:scale-105 transition-all duration-300 text-sm font-medium group"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    <span className="group-hover:underline">Vedi su GitHub</span>
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};