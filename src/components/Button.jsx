/**
 * Button.jsx — Bottone riutilizzabile con stile primario.
 *
 * Stile: pill arrotondato, sfondo teal (primary), testo bianco.
 * Accetta tutte le props standard di un <button> HTML.
 *
 * @param {ReactNode} children - Contenuto del bottone (testo, icone, ecc.)
 * @param {string} className   - Classi CSS aggiuntive (opzionale)
 * @param {object} props       - Props aggiuntive passate al <button>
 */
export const Button = ({ children, className = "", ...props }) => {
    return (
        <button
            className={`px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
