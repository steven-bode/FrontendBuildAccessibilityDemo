# Barrierefreies Frontend Demo

Ein modernes Frontend-Projekt, das **Sass**, **Gulp** und **barrierefreies Webdesign** demonstriert.

## Projektziel

Zeigt Best Practices für zugängliche Webentwicklung mit:
- **Semantisches HTML5** + Barrierefreiheit (WCAG 2.1 AA)
- **Sass (SCSS)** mit BEM-Namenskonvention  
- **Gulp 4** Build-Automatisierung
- **Vanilla JavaScript** für Formularvalidierung
- **Responsive Design** ohne externe Frameworks

## Tech-Stack

- HTML5, CSS3 via Sass, JavaScript ES6
- Gulp mit Sass-Kompilierung, Autoprefixer, Minifizierung
- BrowserSync für Live-Reload
- Vollständige Tastaturnavigation und Screenreader-Unterstützung

## Quick Start

```bash
npm install

# Entwicklung starten (mit Live-Reload)
npm run serve

# Build für Produktion
npm run build
```

## Projektstruktur

```
├── gulpfile.js              # Gulp-Konfiguration
├── package.json             # Dependencies
├── src/                     # Quellcode
│   ├── index.html          # Haupt-HTML-Datei
│   ├── styles/
│   │   ├── main.scss       # Haupt-Sass-Datei
│   │   └── _variables.scss # Sass-Variablen
│   └── scripts/
│       └── main.js         # JavaScript-Logik
└── dist/                   # Build-Ausgabe
```

## Accessibility Features

- **WCAG 2.1 AA konform**: Farbkontrast 4.5:1, semantisches HTML
- **Tastaturnavigation**: Vollständig mit Tab/Shift+Tab bedienbar
- **Screenreader**: ARIA-Labels, Skip-Links, Live-Regionen
- **Fokusmanagement**: Sichtbare Fokusringe, logische Tab-Reihenfolge
- **Responsive**: Mobile-first, bis 200% Zoom

## Features

**Kontaktformular:**
- Live-Validierung mit JavaScript
- Barrierefreie Fehlermeldungen (ARIA)
- Tastaturzugänglich

**Navigation:**
- Semantische Navigation mit `<nav>`
- Skip-Links für bessere Accessibility
- Smooth Scrolling für interne Links

## Gulp Tasks

| Befehl | Beschreibung |
|--------|-------------|
| `npm run dev` | Entwicklung (watch mode) |
| `npm run serve` | BrowserSync Server + Watch |
| `npm run build` | Produktions-Build |

## Testing

**Tastatur-Navigation:**
- `Tab` / `Shift + Tab` - Navigation
- `Enter` / `Space` - Aktivierung
- `Escape` - Meldungen schließen
