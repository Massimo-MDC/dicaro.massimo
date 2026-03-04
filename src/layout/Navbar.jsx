/**
 * Navbar.jsx — Barra di navigazione responsive.
 *
 * Desktop: logo + link in pill glass + bottone "Contact Me" con animazione particelle.
 * Mobile: hamburger animato → overlay full-screen con link e CTA.
 *
 * Il bottone "Contact Me" usa ParticleButton per l'effetto di
 * disintegrazione prima di aprire il link Telegram.
 */

import { useState } from "react";
import { Button } from "@/components/Button";
import { ParticleButton } from "@/components/ParticleButton";

// ─── LINK DI NAVIGAZIONE ────────────────────────────────
// Ogni href punta a un ID di sezione per lo scroll fluido
const navLinks = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
];

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // Stato menu mobile (aperto/chiuso)

    const toggleMenu = () => setIsOpen(!isOpen);  // Alterna aperto/chiuso
    const closeMenu = () => setIsOpen(false);     // Chiude il menu (usato al click di un link)

    return (
        // Header fisso in cima, z-index 50 per stare sopra tutto tranne modali
        <header className="fixed top-0 left-0 right-0 z-50 py-4 md:py-5">
            <nav className="container mx-auto px-4 sm:px-6 flex items-center justify-between">

                {/* ─── LOGO ──────────────────────────────── */}
                <a href="#" className="text-xl font-bold tracking-tight hover:text-primary z-50">
                    MD<span className="text-primary">.</span>
                </a>

                {/* ─── NAV DESKTOP (nascosta su mobile) ───── */}
                <div className="hidden md:flex items-center gap-1">
                    {/* Pill glass con i link */}
                    <div className="glass rounded-full px-2 py-1 flex items-center gap-1">
                        {navLinks.map((link, index) => (
                            <a href={link.href} key={index} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-full hover:bg-surface transition-colors">{link.label}</a>
                        ))}
                    </div>
                </div>

                {/* ─── CTA DESKTOP: bottone Telegram con particelle ── */}
                <div className="hidden md:block">
                    <a href="https://t.me/er_Mexico">Contact Me</a>
                </div>

                {/* ─── HAMBURGER MOBILE (nascosto su desktop) ── */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
                    aria-label="Menu"
                >
                    {/* 3 linee che si trasformano in X quando il menu è aperto */}
                    <span className={`block w-6 h-0.5 bg-foreground rounded-full transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
                    <span className={`block w-6 h-0.5 bg-foreground rounded-full transition-all duration-300 ${isOpen ? "opacity-0 scale-0" : ""}`} />
                    <span className={`block w-6 h-0.5 bg-foreground rounded-full transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                </button>

                {/* ─── OVERLAY MENU MOBILE ──────────────── */}
                <div
                    className={`fixed inset-0 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6 transition-all duration-500 md:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                        }`}
                >
                    {/* Link con delay progressivo per effetto cascata */}
                    {navLinks.map((link, index) => (
                        <a
                            href={link.href}
                            key={index}
                            onClick={closeMenu} // Chiude il menu al click
                            className="text-2xl font-medium text-muted-foreground hover:text-foreground transition-colors"
                            style={{ transitionDelay: isOpen ? `${index * 75}ms` : "0ms" }}
                        >
                            {link.label}
                        </a>
                    ))}
                    {/* CTA mobile con animazione particelle */}
                    <div className="mt-4">
                        <a href="https://t.me/er_Mexico" onClick={closeMenu}>Contact Me</a>
                    </div>
                </div>
            </nav>
        </header>
    );
};