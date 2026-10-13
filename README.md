# Prism Snap Studio — Photography Website

A modern, editorial photography studio site — weddings first, plus family ceremonies (annaprashan, mundan, namkaran…), commercial & advertising, portrait work and a photography **Academy** — built with **React + Vite**, **GSAP**, **Three.js** (React Three Fiber) and **Lenis** smooth scrolling. Frontend only for now — all data is stored in the browser until a backend is added.

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
| `/` | Logo loader, 3D gold-rings hero, philosophy, "What we photograph" services grid, pinned horizontal "Selected work", process, testimonials carousel, **leave-a-review form**, booking CTA |
| `/academy` | Photography Academy: course packages with In-studio / Live online pricing, comparison table, weekend workshops, upcoming batches, "What you'll need", student stories, **enquiry form with redeem codes**, FAQ |
| `/portfolio` | Filterable gallery — Weddings, Pre-wedding, Ceremonies, Commercial, Portraits (GSAP Flip) + lightbox. `?category=ceremonies` opens pre-filtered |
| `/services` | One section per service with its packages, add-ons, FAQ. `/services#commercial` jumps to a section |
| `/about` | Story, animated stats, values, quote |
| `/reviews` | All reviews, rating breakdown, sort, review form |
| `/booking` | 5-step booking: occasion → date & venue → package → details → confirm. `?service=ceremonies` or `?package=signature` preselects |
| `/contact` | Contact details + message form |
| `/signin`, `/signup` | Email/password + "Continue with Google" (**mock**) |

## Customising

- **Brand, contact details, stats, currency** → `src/config/site.js`
- **Photos** → replace files in `public/images/` (keep the same names), or edit `src/data/images.js`. Current images are free placeholders from [Unsplash](https://unsplash.com).
- **Services (names, copy, occasions, cover photos)** → `src/data/services.js`
- **Packages, prices & add-ons per service** → `src/data/packages.js`
- **Academy courses, workshops, batches, requirements & FAQ** → `src/data/academy.js`
- **Academy redeem codes** → `src/data/redeemCodes.js` (placeholders — real codes must be validated by the backend)
- **Process steps, FAQ, values** → `src/data/content.js`
- **Seed testimonials** → `src/data/reviews.js` — these are **placeholders**; replace them with real client reviews before launch.
- **Colours & fonts** → CSS variables at the top of `src/styles/global.css`

## Connecting a backend later

All data access goes through `src/services/`:

- `authService.js` — sign up / sign in / Google / sign out
- `bookingService.js`, `reviewService.js`, `contactService.js`, `academyService.js`

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
