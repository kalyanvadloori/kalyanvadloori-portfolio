# Kalyan Vadloori — Portfolio

A modern, responsive single-page portfolio built with **React 18**, **Vite** and **Material UI 6**.

## Features

- Dark / light mode with the choice saved to `localStorage`
- Animated hero: typewriter role cycling, gradient headline, glass "code card"
- Scroll-reveal animations via `IntersectionObserver` (respects `prefers-reduced-motion`)
- Sticky glass navbar with scroll-spy active link highlighting + mobile drawer
- Timeline-style work experience
- Filterable project grid with expand/collapse details
- Scroll progress bar, back-to-top button
- Resume download straight from the navbar and contact section

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Editing your content

**Everything lives in one file:** [`src/data/resume.js`](src/data/resume.js).
Update `profile`, `stats`, `highlights`, `skills`, `experience`, `projects`, `education` and
`certifications` there — no component changes needed.

Two things to fill in yourself:

- `profile.linkedin` — replace the placeholder with your real LinkedIn URL
- `profile.github` — add your GitHub profile (the footer/hero links are ready for it)

Colors, fonts and card styling live in [`src/theme.js`](src/theme.js).

## Assets in `public/`

| File | Referenced by | Notes |
| --- | --- | --- |
| `Kalyan_Vadloori_Senior_Software_Engineer_2026.pdf` | `profile.resumeFile` | Replace with the latest resume PDF |
| `profile.jpg` | `profile.photo` | Hero headshot. **Not yet added** — until you drop it in, the hero shows a "KV" monogram |

A square, centred crop works best for the headshot (the hero renders it in a 92px circle).

## Deploying

The build output in `dist/` is fully static — drop it on Netlify, Vercel, GitHub Pages or S3.

- **Vercel / Netlify:** connect the repo; build command `npm run build`, output directory `dist`
- **GitHub Pages:** set `base: '/<repo-name>/'` in `vite.config.js` before building

## Project structure

```
src/
  App.jsx              app shell + theme mode state
  theme.js             MUI theme (light/dark palettes, glass card helper)
  data/resume.js       ALL content — edit this
  components/
    Navbar.jsx         sticky nav, scroll-spy, mobile drawer
    Hero.jsx           headline, typewriter, code card, stats
    About.jsx          summary + highlight list
    Skills.jsx         grouped tech stack cards
    Experience.jsx     timeline
    Projects.jsx       filterable cards
    Education.jsx      education + certifications
    Contact.jsx        CTA + contact channels
    Footer.jsx         links and socials
    Section.jsx        shared section heading wrapper
    Reveal.jsx         scroll-reveal animation wrapper
    ScrollProgress.jsx top progress bar
    BackToTop.jsx      floating scroll-to-top button
```
