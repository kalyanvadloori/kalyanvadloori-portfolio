# Kalyan Vadloori — Portfolio

A modern, responsive single-page portfolio built with **React 18**, **Vite** and **Material UI 6**.

🔗 **Live:** https://kalyanvadlooridev.netlify.app

## Features

- Dark / light mode with the choice saved to `localStorage`
- Animated hero: typewriter role cycling, gradient headline, orbiting tech-stack ring
- Scroll-reveal animations via `IntersectionObserver`, with a global `prefers-reduced-motion` guard
- Sticky glass navbar with scroll-spy active link highlighting + mobile drawer
- Timeline-style work experience
- Filterable project grid with expand/collapse details
- Contact form that posts to your inbox via Web3Forms, with a `mailto:` fallback
- Open Graph / Twitter cards + JSON-LD `Person` schema for link previews and search
- Vendor code-splitting so returning visitors re-download only the app chunk
- Scroll progress bar, back-to-top button, resume download

## Getting started

```bash
npm install
cp .env.example .env   # then paste your Web3Forms key
npm run dev            # http://localhost:5173
npm run build          # production build → dist/
npm run preview        # preview the production build
npm run lint           # ESLint
npm run format         # Prettier
```

## Contact form setup

The form POSTs to [Web3Forms](https://web3forms.com) (free, no account needed).

1. Enter your email at web3forms.com — they email you an access key.
2. Put it in `.env` as `VITE_WEB3FORMS_KEY=...`
3. Add the same variable in **Netlify → Site configuration → Environment variables**, then redeploy.

Without a key the form falls back to opening the visitor's mail client. That fallback
**silently fails on machines with no mail app configured**, so set the key before
sharing the site with recruiters.

## Editing your content

**Everything lives in one file:** [`src/data/resume.js`](src/data/resume.js).
Update `profile`, `stats`, `highlights`, `skills`, `experience`, `projects`, `education` and
`certifications` there — no component changes needed.

Colors, fonts and card styling live in [`src/theme.js`](src/theme.js).

### Still to fill in

| What | Where | Why it matters |
| --- | --- | --- |
| `og-image.jpg` | `public/` | A 1200×630 banner makes a much stronger LinkedIn preview than the cropped square headshot currently used. Point the `og:image`/`twitter:image` tags at it once added. |
| Project screenshots | `public/` + `projects[].image` | Every project is currently a monogram tile. Recruiters scan visually. |

If the domain ever changes, update it in `index.html` (canonical, `og:url`, `twitter:image`,
JSON-LD), `public/robots.txt`, `public/sitemap.xml` and `profile.siteUrl`.

## Assets in `public/`

| File | Referenced by | Notes |
| --- | --- | --- |
| `Kalyan_Vadloori_Senior_Software_Engineer_2026.pdf` | `profile.resumeFile` | Keep in sync with the site content — recruiters cross-check both |
| `profile.jpeg` | `profile.photo`, `og:image` | Hero headshot. 264 KB — converting to WebP would cut it to ~40 KB |
| `robots.txt`, `sitemap.xml` | search crawlers | Update the domain if it changes |

## Deploying

Netlify picks up [`netlify.toml`](netlify.toml) automatically: build `npm run build`,
publish `dist`, SPA redirect and cache/security headers included.

Remember to set `VITE_WEB3FORMS_KEY` in the Netlify environment variables — the build
inlines it, so the form stays in fallback mode until you do.

## Project structure

```
src/
  App.jsx              app shell + theme mode state
  theme.js             MUI theme (light/dark palettes, reduced-motion guard, glass card helper)
  data/resume.js       ALL content — edit this
  components/
    Navbar.jsx         sticky nav, scroll-spy, mobile drawer
    Hero.jsx           headline, typewriter, orbiting tech ring, stats
    About.jsx          summary + highlight list
    Skills.jsx         grouped tech stack cards
    Experience.jsx     timeline
    Projects.jsx       filterable cards
    Education.jsx      education + certifications
    Contact.jsx        CTA + Web3Forms contact form
    Footer.jsx         links and socials
    Section.jsx        shared section heading wrapper
    Reveal.jsx         scroll-reveal animation wrapper
    ScrollProgress.jsx top progress bar
    BackToTop.jsx      floating scroll-to-top button
```
