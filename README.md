# 💼 Portfolio — Massimo Di Caro

Portfolio personale di **Massimo Di Caro**, Full-Stack Developer.  
Un sito one-page moderno, dark-themed, costruito con **React + Vite + Tailwind CSS**.

---

## 🚀 Demo

```
npm run dev → http://localhost:5173
```

---

## 📦 Tech Stack

| Tecnologia      | Versione | Ruolo                           |
|-----------------|----------|---------------------------------|
| **React**       | 19       | Libreria UI                     |
| **Vite**        | 7        | Build tool e dev server         |
| **Tailwind CSS**| 4        | Utility-first CSS framework     |
| **JavaScript**  | ES2022+  | Linguaggio principale           |

---

## 📂 Struttura del Progetto

```
my_portfolio_FULL/
├── public/                          # Asset statici
│   ├── portrait-placeholder.png     # Foto profilo (About)
│   ├── project-ticketflow.png       # Preview progetto TicketFlow
│   ├── project-hairbooker.png       # Preview progetto Hairbooker
│   └── project-taskmanager.png      # Preview progetto Task Manager
│
├── src/
│   ├── components/                  # Componenti riutilizzabili
│   │   ├── Button.jsx               # Bottone base con stile primario
│   │   ├── ParticleButton.jsx       # Bottone con animazione particelle
│   │   └── CodeBackground.jsx       # Animazione canvas di sfondo
│   │
│   ├── layout/                      # Layout dell'app
│   │   └── Navbar.jsx               # Navigazione responsive (desktop + mobile)
│   │
│   ├── sections/                    # Sezioni della pagina
│   │   ├── Hero.jsx                 # Sezione Hero (placeholder)
│   │   ├── About.jsx                # Chi sono, competenze, statistiche
│   │   ├── Projects.jsx             # Carosello progetti con animazioni
│   │   ├── Experience.jsx           # Esperienza — creativa 404 NOT FOUND
│   │   ├── Testimonials.jsx         # Testimonianze (placeholder)
│   │   └── Contact.jsx              # Contatti + link social + footer
│   │
│   ├── App.jsx                      # Componente root, assembla le sezioni
│   ├── main.jsx                     # Entry point React
│   └── index.css                    # Design system (colori, font, glass)
│
├── index.html                       # HTML base (Vite)
├── vite.config.js                   # Configurazione Vite + alias
├── package.json                     # Dipendenze e scripts
└── README.md                        # Questo file
```

---

## 🎨 Design System

### Palette Colori
| Token                 | Valore     | Uso                          |
|-----------------------|------------|------------------------------|
| `--color-background`  | `#0f1418`  | Sfondo principale            |
| `--color-foreground`  | `#f0f2f5`  | Testo principale             |
| `--color-primary`     | `#20b2a6`  | Accento teal                 |
| `--color-surface`     | `#1a2329`  | Sfondo card                  |
| `--color-border`      | `#242b32`  | Bordi                        |
| `--color-muted`       | `#252e37`  | Sfondo muted                 |
| `--color-highlight`   | `#f5a623`  | Accento dorato (terminale)   |

### Font
- **Body**: Inter (sans-serif)
- **Titoli**: Playfair Display (serif)

### Effetto Glass
```css
.glass {
  background: color-mix(in srgb, var(--color-surface) 50%, transparent);
  backdrop-filter: blur(16px);
  border: 1px solid color-mix(in srgb, var(--color-border), 50%, transparent);
}
```

---

## 🧩 Sezioni

### 1. Navbar
- **Desktop**: pill glass con link + bottone "Contact Me" (Telegram)
- **Mobile**: hamburger animato → overlay full-screen
- Il bottone "Contact Me" ha un'animazione di **disintegrazione in particelle** prima di aprire Telegram

### 2. About
- Card glassmorphism con foto profilo, bio, competenze (pills) e statistiche

### 3. Projects (Carosello)
- Navigazione ← → tra i 3 progetti GitHub
- Transizioni smooth (fade + slide + scale)
- Ogni progetto: immagine, descrizione, tag tecnologici, link GitHub

### 4. Experience (404 NOT FOUND)
- Risposta creativa "404 NOT FOUND ...per ora"
- Mini-terminale animato con cursore lampeggiante

### 5. Contact
- Griglia di cards social: **LinkedIn, Instagram, GitHub, Email**
- Hover effects con scala e glow
- Footer con copyright

### 6. Code Background
- Animazione canvas a z-index -1
- Linee di codice con effetto typing da tutti i lati dello schermo
- Opacità bassissima (4-8%) per non disturbare la lettura

---

## 🛠️ Come Iniziare

### Prerequisiti
- **Node.js** ≥ 18
- **npm** ≥ 9

### Installazione
```bash
# Clona il repo
git clone https://github.com/Massimo-MDC/my_portfolio_FULL.git
cd my_portfolio_FULL

# Installa le dipendenze
npm install

# Avvia il dev server
npm run dev
```

### Build per Produzione
```bash
npm run build
npm run preview
```

---

## 📫 Contatti

- 💼 [LinkedIn](https://www.linkedin.com/in/massimo-di-caro/)
- 📸 [Instagram](https://www.instagram.com/dicaro.massimo/)
- 🐙 [GitHub](https://github.com/Massimo-MDC)
- 📧 [dicaromassimo8@gmail.com](mailto:dicaromassimo8@gmail.com)
- ✈️ [Telegram @er_Mexico](https://t.me/er_Mexico)

---

## 📄 Licenza

© 2026 Massimo Di Caro — Tutti i diritti riservati.
