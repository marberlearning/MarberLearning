# Developer Notes — Marber Learning Website

Technical handover notes for anyone picking up this project after Alesha Shahid.

## Stack

- **Next.js 16** (App Router, Turbopack) with **React 19** and **TypeScript**
- **Tailwind CSS v4** — CSS-based config, no `tailwind.config.ts`; theme lives in `app/globals.css` under `@theme inline`
- **shadcn/ui v4** — components in `components/ui/`
- **Framer Motion v12** — animations
- **lucide-react** — icons (no social brand icons like Facebook/Instagram; those are inline SVGs)

## Getting the project running locally

```bash
npm install
npm run dev      # localhost:3000, Turbopack
npm run build    # production build
npm run lint      # ESLint
```

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in real values:

```
ZOHO_EMAIL_USER=
ZOHO_EMAIL_PASSWORD=
```

These power the contact form's email sending (Zoho SMTP) in `app/api/contact/route.ts`. `.env.local` is git-ignored — it is never committed. Whoever deploys this site must also set these two variables in the hosting platform's dashboard (currently Netlify → Site configuration → Environment variables), or the contact form will silently fail to send emails.

## Project structure

```
app/
  page.tsx              Home page
  about/page.tsx         About page (renders components/AboutContent.tsx)
  services/page.tsx      Programs/Services page
  contact/page.tsx       Contact page (renders components/ContactContent.tsx)
  api/contact/route.ts   Server-side handler that emails form submissions via Zoho SMTP
  layout.tsx             Root layout — fonts, metadata, Open Graph tags
  globals.css             Tailwind v4 theme config (@theme inline)
components/
  ui/                     shadcn/ui primitives (button, card)
  Navbar, Footer, Hero, TrustBar, SubjectsGrid, WhyMarber, Testimonials,
  CTASection, CommunityOutreach, ServiceAreaMap, *Content.tsx
public/
  logo.png, marber logo 2.png, and program/event photos
  _redirects            Netlify redirect rules (old domain -> current domain)
```

The home page composes components in this order (see `app/page.tsx`):

```
Navbar -> Hero -> TrustBar -> SubjectsGrid -> WhyMarber -> Testimonials -> CTASection -> Footer
```

## Editing copy

Every component keeps its editable text in constants near the top of the file, marked `// Editable`. Text changes should not require touching JSX/markup — just edit the constant values.

## Brand colors

Defined in `app/globals.css` under `@theme inline`:

| Utility class       | Hex value |
|----------------------|-----------|
| `primary`            | `#8B7AAB` |
| `primary-light`      | `#B8A9D9` |
| `accent-mint`        | `#5BA89A` |
| `accent-mint-light`  | `#8FC9BD` |
| `bg-cream`           | `#FAF7F2` |
| `bg-soft`            | `#F0EBF7` |
| `text-dark`          | `#2D2A3E` |
| `text-muted`         | `#6B6880` |

Fonts: `font-heading` (Playfair Display), `font-sans` (Inter) — loaded via `next/font/google` in `app/layout.tsx`.

## Contact form

`components/ContactContent.tsx` renders the form; submissions POST to `app/api/contact/route.ts`, which sends an email via Zoho SMTP using the `ZOHO_EMAIL_USER`/`ZOHO_EMAIL_PASSWORD` credentials. There is no database — every submission is a direct email, nothing is stored.

## Deployment

- **Code hosting:** `github.com/marberlearning/Marber-Learning` — push here for changes to go live.
- **Hosting/build:** Netlify, configured via `netlify.toml` (`npm run build`, publishes `.next`, uses `@netlify/plugin-nextjs`).
- **Domain:** registered on Namecheap; DNS points at Netlify. See `docs/DNS-SETUP.md` for the domain/DNS reference.

## Known open items (as of last handover)

- No `robots.txt` or `sitemap.xml` yet — recommended for SEO, especially after the domain change, but not blocking.

