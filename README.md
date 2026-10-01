# Aurelia Studio — Wedding Photography Website

A modern, editorial wedding-photography site built with **React + Vite**, **GSAP**, **Three.js** (React Three Fiber) and **Lenis** smooth scrolling. Frontend only for now — all data is stored in the browser until a backend is added.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # unit tests (Vitest)
npm run build      # production build → dist/
```

## Pages

| Route | What's there |
| --- | --- |
| `/` | Loader, 3D gold-rings hero, philosophy, pinned horizontal "Selected work", collections, process, testimonials carousel, **leave-a-review form**, booking CTA |
| `/portfolio` | Filterable gallery (GSAP Flip) + lightbox (keyboard ← → Esc) |
| `/services` | Collections, what's included, add-ons, FAQ |
| `/about` | Story, animated stats, values, quote |
| `/reviews` | All reviews, rating breakdown, sort, review form |
| `/booking` | 4-step booking form with live summary (`?package=signature` preselects) |
| `/contact` | Contact details + message form |
| `/signin`, `/signup` | Email/password + "Continue with Google" (**mock**) |

## Customising

- **Brand, contact details, stats, currency** → `src/config/site.js`
- **Photos** → replace files in `public/images/` (keep the same names), or edit `src/data/images.js`. Current images are free placeholders from [Unsplash](https://unsplash.com).
- **Collections & prices** → `src/data/packages.js`
- **Process steps, FAQ, values** → `src/data/content.js`
- **Seed testimonials** → `src/data/reviews.js` — these are **placeholders**; replace them with real client reviews before launch.
- **Colours & fonts** → CSS variables at the top of `src/styles/global.css`

## Connecting a backend later

All data access goes through `src/services/`:

- `authService.js` — sign up / sign in / Google / sign out
- `bookingService.js`, `reviewService.js`, `contactService.js`

Each function returns a Promise and currently persists to `localStorage`. Swap their bodies for `fetch()` calls (or Firebase, Supabase, etc.) and the UI keeps working unchanged. Validation lives in `src/utils/validation.js` and should be mirrored on the server.

> ⚠️ Authentication is a **UI-only mock**: accounts exist only in the visitor's browser and "Continue with Google" signs in a demo profile. Do not treat it as secure — wire up real auth before launch.

## Project structure

```
src/
  components/   UI building blocks (layout, loader, motion, three, reviews, auth, ui)
  sections/     Page sections (home/*, ReviewSection, BookingCTA)
  pages/        Route components
  services/     Mock data layer (swap for API later)
  context/      Auth, toast notifications, intro state
  data/         Content: images, packages, reviews, FAQ
  lib/          GSAP setup + Lenis smooth scroll
  styles/       Design tokens + global styles
```

Animations respect the visitor's "reduce motion" setting, and the 3D scene falls back to a soft gradient where WebGL isn't available.
