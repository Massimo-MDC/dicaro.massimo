/**
 * ParticleButton.jsx — Bottone con animazione di disintegrazione particellare.
 *
 * Al click, il bottone si "smaterializza" in ~120 particelle teal che
 * esplodono verso l'esterno, restano sospese brevemente, poi si
 * riassemblano al centro. Al termine dell'animazione (5 secondi),
 * viene aperto il link target (es. Telegram).
 *
 * Fasi dell'animazione:
 *   0%-45%   → Esplosione: particelle volano verso l'esterno (easeOutCubic)
 *   45%-55%  → Sospensione: particelle restano sparse
 *   55%-100% → Implosione: particelle tornano al centro con glow (easeInCubic)
 *
 * @param {ReactNode} children - Contenuto del bottone
 * @param {string} href        - URL da aprire dopo l'animazione
 * @param {function} onClick   - Callback opzionale dopo l'animazione
 * @param {string} className   - Classi CSS aggiuntive
 */

import { useRef, useState, useCallback } from "react";

// ─── COSTANTI DELL'ANIMAZIONE ────────────────────────────
const PARTICLE_COUNT = 120;         // Numero totale di particelle
const ANIMATION_DURATION = 5000;    // Durata totale: 5 secondi
const EXPLODE_PHASE = 0.45;         // Fine fase esplosione (45%)
const HOLD_PHASE = 0.55;            // Fine fase sospensione (55%)
const IMPLODE_PHASE = 1.0;          // Fine fase implosione (100%)

export const ParticleButton = ({ children, href, onClick, className = "" }) => {
    const buttonRef = useRef(null);     // Riferimento al bottone DOM
    const canvasRef = useRef(null);     // Non usato (legacy)
    const [animating, setAnimating] = useState(false); // Stato: animazione in corso

    /**
     * Avvia l'animazione particellare al click.
     * Crea un canvas fullscreen temporaneo sopra tutto il contenuto (z-index 9999),
     * genera le particelle dalla posizione del bottone, e le anima.
     */
    const startAnimation = useCallback((e) => {
        e.preventDefault();
        if (animating) return; // Previene doppi click

        setAnimating(true);

        const button = buttonRef.current;
        const rect = button.getBoundingClientRect(); // Posizione del bottone sullo schermo

        // Crea un canvas temporaneo a schermo intero per disegnare le particelle
        const canvas = document.createElement("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.cssText = "position:fixed;top:0;left:0;z-index:9999;pointer-events:none;";
        document.body.appendChild(canvas);

        const ctx = canvas.getContext("2d");
        const centerX = rect.left + rect.width / 2;   // Centro X del bottone
        const centerY = rect.top + rect.height / 2;    // Centro Y del bottone

        // ─── GENERAZIONE PARTICELLE ──────────────────────
        const particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const angle = Math.random() * Math.PI * 2;       // Angolo casuale (0-360°)
            const speed = 80 + Math.random() * 200;           // Distanza di esplosione
            const size = 2 + Math.random() * 4;               // Dimensione particella (2-6px)

            // Posizione iniziale: random dentro i bordi del bottone
            const startX = rect.left + Math.random() * rect.width;
            const startY = rect.top + Math.random() * rect.height;

            particles.push({
                startX,
                startY,
                targetX: centerX + Math.cos(angle) * speed,   // Destinazione esplosione X
                targetY: centerY + Math.sin(angle) * speed,   // Destinazione esplosione Y
                size,
                opacity: 0.6 + Math.random() * 0.4,           // Opacità (60-100%)
                hue: 168 + Math.floor(Math.random() * 20 - 10), // Tonalità teal (158-178)
                rotation: Math.random() * Math.PI * 2,         // Rotazione iniziale
                rotationSpeed: (Math.random() - 0.5) * 0.15,   // Velocità di rotazione
            });
        }

        const startTime = performance.now();

        // ─── LOOP DI ANIMAZIONE ──────────────────────────
        const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / ANIMATION_DURATION, 1); // 0→1

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Calcola in quale fase siamo e il progresso delle particelle
            let particleProgress;
            if (progress < EXPLODE_PHASE) {
                // Fase 1: esplosione — particelle volano verso l'esterno
                const t = progress / EXPLODE_PHASE;
                particleProgress = easeOutCubic(t);
            } else if (progress < HOLD_PHASE) {
                // Fase 2: sospensione — particelle restano in posizione
                particleProgress = 1;
            } else {
                // Fase 3: implosione — particelle tornano al centro
                const t = (progress - HOLD_PHASE) / (IMPLODE_PHASE - HOLD_PHASE);
                particleProgress = 1 - easeInCubic(t);
            }

            // Controlla la visibilità del bottone originale (fade out/in)
            button.style.opacity = progress < EXPLODE_PHASE * 0.3
                ? String(1 - (progress / (EXPLODE_PHASE * 0.3)))   // Fade out rapido
                : progress > IMPLODE_PHASE - 0.08
                    ? String((progress - (IMPLODE_PHASE - 0.08)) / 0.08) // Fade in finale
                    : "0"; // Nascosto durante l'animazione

            // Disegna ogni particella sulla sua posizione interpolata
            for (const p of particles) {
                // Interpola tra posizione iniziale e target in base al progresso
                const x = p.startX + (p.targetX - p.startX) * particleProgress;
                const y = p.startY + (p.targetY - p.startY) * particleProgress;

                p.rotation += p.rotationSpeed;

                // Effetto glow durante la fase di implosione
                const glowIntensity = progress > HOLD_PHASE
                    ? (progress - HOLD_PHASE) / (1 - HOLD_PHASE)
                    : 0;

                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(p.rotation);

                // Aggiunge ombra luminosa durante il riassemblaggio
                if (glowIntensity > 0.3) {
                    ctx.shadowColor = `hsla(${p.hue}, 70%, 55%, ${glowIntensity * 0.6})`;
                    ctx.shadowBlur = 10 + glowIntensity * 15;
                }

                // Fade out delle particelle negli ultimi 8% dell'animazione
                ctx.fillStyle = `hsla(${p.hue}, 70%, 55%, ${p.opacity * (progress > 0.92 ? Math.max(0, 1 - (progress - 0.92) / 0.08) : 1)})`;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                ctx.restore();
            }

            if (progress < 1) {
                requestAnimationFrame(animate); // Continua l'animazione
            } else {
                // ─── CLEANUP E NAVIGAZIONE ───────────────
                canvas.remove();                // Rimuove il canvas temporaneo
                button.style.opacity = "1";     // Ripristina il bottone
                setAnimating(false);

                // Apre il link in una nuova tab dopo l'animazione
                if (href) {
                    window.open(href, "_blank", "noopener,noreferrer");
                }
                if (onClick) onClick();
            }
        };

        requestAnimationFrame(animate); // Avvia il primo frame
    }, [animating, href, onClick]);

    // ─── FUNZIONI DI EASING ──────────────────────────────
    // Decelerazione cubica (veloce → lento)
    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
    // Accelerazione cubica (lento → veloce)
    function easeInCubic(t) {
        return t * t * t;
    }

    // ─── RENDER ──────────────────────────────────────────
    return (
        <button
            ref={buttonRef}
            onClick={startAnimation}
            className={`px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer ${className}`}
        >
            {children}
        </button>
    );
};
