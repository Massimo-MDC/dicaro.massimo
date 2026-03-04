/**
 * GlowCursor.jsx — Cursore personalizzato luminoso.
 *
 * Sostituisce il cursore di default con un puntino teal che brilla.
 * Segue il mouse con un leggero ritardo (effetto smooth).
 * Include un alone (glow) che si espande al hover su elementi cliccabili.
 *
 * Nascosto su dispositivi touch (mobile/tablet).
 */

import { useState, useEffect, useRef } from "react";

export const GlowCursor = () => {
    const dotRef = useRef(null);
    const glowRef = useRef(null);
    const [isPointer, setIsPointer] = useState(false); // true quando il mouse è sopra un elemento cliccabile
    const [isVisible, setIsVisible] = useState(false);  // nasconde finché il mouse non si muove
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        // Rileva dispositivi touch — non mostrare il cursore custom
        const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
        setIsTouchDevice(hasTouch);
        if (hasTouch) return;

        let mouseX = 0, mouseY = 0;
        let dotX = 0, dotY = 0;
        let glowX = 0, glowY = 0;
        let animId;

        // Aggiorna posizione del mouse
        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!isVisible) setIsVisible(true);
        };

        // Rileva se il mouse è su un elemento interattivo (per ingrandire il cursore)
        const handleMouseOver = (e) => {
            const el = e.target;
            const interactive = el.closest("a, button, [role='button'], input, textarea, select, [onclick], [tabindex]");
            setIsPointer(!!interactive);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        // Animazione smooth con lerp (interpolazione lineare)
        const animate = () => {
            // Il puntino segue con leggero ritardo
            dotX += (mouseX - dotX) * 0.25;
            dotY += (mouseY - dotY) * 0.25;
            // Il glow segue più lentamente per un effetto "scia"
            glowX += (mouseX - glowX) * 0.12;
            glowY += (mouseY - glowY) * 0.12;

            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${dotX}px, ${dotY}px)`;
            }
            if (glowRef.current) {
                glowRef.current.style.transform = `translate(${glowX}px, ${glowY}px)`;
            }

            animId = requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);
        document.documentElement.addEventListener("mouseleave", handleMouseLeave);
        document.documentElement.addEventListener("mouseenter", handleMouseEnter);

        animId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
            document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
            document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
            cancelAnimationFrame(animId);
        };
    }, [isVisible]);

    // Non renderizzare su dispositivi touch
    if (isTouchDevice) return null;

    return (
        <>
            {/* Puntino centrale — piccolo cerchio solido */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999]"
                style={{
                    width: isPointer ? "40px" : "10px",
                    height: isPointer ? "40px" : "10px",
                    marginLeft: isPointer ? "-20px" : "-5px",
                    marginTop: isPointer ? "-20px" : "-5px",
                    borderRadius: "50%",
                    backgroundColor: isPointer ? "transparent" : "var(--color-primary)",
                    border: isPointer ? "2px solid var(--color-primary)" : "none",
                    opacity: isVisible ? 1 : 0,
                    transition: "width 0.3s, height 0.3s, margin 0.3s, background-color 0.3s, border 0.3s, opacity 0.3s",
                    boxShadow: isPointer
                        ? "0 0 20px rgba(32, 178, 166, 0.4)"
                        : "0 0 12px rgba(32, 178, 166, 0.8), 0 0 4px rgba(32, 178, 166, 1)",
                }}
            />
            {/* Alone glow — cerchio più grande e sfumato che segue con ritardo */}
            <div
                ref={glowRef}
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                style={{
                    width: "36px",
                    height: "36px",
                    marginLeft: "-18px",
                    marginTop: "-18px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(32, 178, 166, 0.25) 0%, transparent 70%)",
                    opacity: isVisible && !isPointer ? 1 : 0,
                    transition: "opacity 0.3s",
                }}
            />
        </>
    );
};
