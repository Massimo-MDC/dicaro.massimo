/**
 * CodeBackground.jsx — Animazione canvas con linee di codice in background.
 *
 * Crea un effetto decorativo: frammenti di codice appaiono da tutti
 * e 4 i lati dello schermo e attraversano la pagina con un effetto typing.
 *
 * Caratteristiche:
 * - Posizionato a z-index -1 (dietro tutto il contenuto)
 * - Opacità molto bassa (4-8%) per non disturbare la lettura
 * - Le linee appaiono da: alto, basso, sinistra, destra
 * - Effetto cursore lampeggiante durante la digitazione
 * - Canvas fullscreen fixed, pointer-events: none
 */

import { useEffect, useRef } from "react";

// ─── SNIPPET DI CODICE MOSTRATI IN BACKGROUND ───────────
const CODE_LINES = [
    'const app = express();',
    'import React from "react";',
    'function handleClick() {',
    '  return response.json();',
    'export default App;',
    'const [state, setState] = useState();',
    '@RestController',
    'public class UserService {',
    'SELECT * FROM users;',
    'npm install react',
    'git commit -m "feat"',
    'border-radius: 0.75rem;',
    'async function fetchData() {',
    '  const res = await fetch(url);',
    'console.log("Hello World");',
    '@GetMapping("/api")',
    'private final Repository repo;',
    'useEffect(() => {}, []);',
    'docker-compose up -d',
    'transition: all 0.3s ease;',
    'interface Props { id: number }',
    'throw new Exception();',
    '.filter(x => x.active)',
    'margin: 0 auto;',
];

// Direzioni da cui le linee possono apparire
// 0 = dall'alto verso il basso
// 1 = dal basso verso l'alto
// 2 = da sinistra verso destra
// 3 = da destra verso sinistra
const SIDES = 4;

export const CodeBackground = () => {
    const canvasRef = useRef(null); // Riferimento al canvas DOM

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        let animationId;    // ID per cancellare requestAnimationFrame
        let lines = [];     // Array di linee di codice attive
        let tick = 0;       // Contatore frame (usato per timing spawn)

        /**
         * Ridimensiona il canvas in base alla finestra.
         * Chiamata all'avvio e ad ogni resize della finestra.
         */
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        /**
         * Genera una nuova linea di codice da un lato random.
         * La linea ha velocità, dimensione e opacità casuali.
         */
        const spawnLine = () => {
            const side = Math.floor(Math.random() * SIDES);  // Lato casuale (0-3)
            const text = CODE_LINES[Math.floor(Math.random() * CODE_LINES.length)];
            const speed = 0.15 + Math.random() * 0.2;        // Velocità di movimento
            const size = 11 + Math.floor(Math.random() * 3); // Font size (11-13px)
            const opacity = 0.04 + Math.random() * 0.04;     // Opacità (4-8%)

            let x, y, vx, vy, angle;

            // Imposta posizione e direzione in base al lato di origine
            switch (side) {
                case 0: // Dall'alto verso il basso (testo orizzontale)
                    x = Math.random() * canvas.width;
                    y = -20;           // Parte sopra lo schermo
                    vx = 0;
                    vy = speed;        // Si muove verso il basso
                    angle = 0;
                    break;
                case 1: // Dal basso verso l'alto (testo orizzontale)
                    x = Math.random() * canvas.width;
                    y = canvas.height + 20; // Parte sotto lo schermo
                    vx = 0;
                    vy = -speed;       // Si muove verso l'alto
                    angle = 0;
                    break;
                case 2: // Da sinistra verso destra (testo ruotato -90°)
                    x = -20;           // Parte a sinistra dello schermo
                    y = Math.random() * canvas.height;
                    vx = speed;        // Si muove verso destra
                    vy = 0;
                    angle = -Math.PI / 2; // Testo verticale
                    break;
                case 3: // Da destra verso sinistra (testo ruotato 90°)
                    x = canvas.width + 20; // Parte a destra dello schermo
                    y = Math.random() * canvas.height;
                    vx = -speed;       // Si muove verso sinistra
                    vy = 0;
                    angle = Math.PI / 2;  // Testo verticale
                    break;
            }

            // Aggiunge la nuova linea all'array
            lines.push({
                text,
                x, y,               // Posizione corrente
                vx, vy,             // Velocità (pixel per frame)
                angle,              // Rotazione del testo
                typed: 0,           // Caratteri "digitati" finora
                typeSpeed: 0.3 + Math.random() * 0.4, // Velocità di typing
                opacity,
                fontSize: size,
            });
        };

        /**
         * Loop di disegno — chiamato ad ogni frame via requestAnimationFrame.
         * Muove le linee, anima il typing, disegna il cursore e rimuove
         * le linee che sono uscite dallo schermo.
         */
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Pulisce il canvas
            tick++;

            // Genera una nuova linea ogni ~60 frame (≈1 al secondo)
            // Massimo 18 linee contemporaneamente per non appesantire
            if (tick % 60 === 0 && lines.length < 18) {
                spawnLine();
            }

            // Itera al contrario per poter rimuovere elementi in sicurezza
            for (let i = lines.length - 1; i >= 0; i--) {
                const line = lines[i];

                // Aggiorna posizione
                line.x += line.vx;
                line.y += line.vy;

                // Effetto typing: incrementa i caratteri visibili gradualmente
                line.typed = Math.min(line.text.length, line.typed + line.typeSpeed);

                const displayText = line.text.substring(0, Math.floor(line.typed));
                const showCursor = line.typed < line.text.length; // Mostra cursore se non ha finito

                ctx.save();
                ctx.translate(line.x, line.y);
                ctx.rotate(line.angle); // Ruota per linee laterali

                // Disegna il testo con font monospace e colore teal semi-trasparente
                ctx.font = `${line.fontSize}px "JetBrains Mono", "Fira Code", monospace`;
                ctx.fillStyle = `rgba(32, 178, 166, ${line.opacity})`; // Teal (#20b2a6)
                ctx.fillText(displayText, 0, 0);

                // Cursore lampeggiante (alterna ogni 15 frame)
                if (showCursor && Math.floor(tick / 15) % 2 === 0) {
                    const cursorX = ctx.measureText(displayText).width;
                    ctx.fillStyle = `rgba(32, 178, 166, ${line.opacity * 2})`; // Cursore più visibile
                    ctx.fillRect(cursorX + 1, -line.fontSize + 2, 2, line.fontSize);
                }

                ctx.restore();

                // Rimuove le linee che sono uscite dallo schermo (con margine di 300px)
                const margin = 300;
                if (
                    line.x < -margin || line.x > canvas.width + margin ||
                    line.y < -margin || line.y > canvas.height + margin
                ) {
                    lines.splice(i, 1);
                }
            }

            animationId = requestAnimationFrame(draw); // Prossimo frame
        };

        // ─── INIZIALIZZAZIONE ────────────────────────────
        resize();
        // Genera 8 linee iniziali per avere subito contenuto visibile
        for (let i = 0; i < 8; i++) spawnLine();

        window.addEventListener("resize", resize);
        draw(); // Avvia il loop di animazione

        // ─── CLEANUP AL DISMOUNT ─────────────────────────
        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    // Canvas fullscreen fisso, non intercetta click (pointer-events: none)
    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: -1 }}
        />
    );
};
