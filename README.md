# romyeskens.com

Personal academic website for Romy Eskens. Built with [Astro](https://astro.build),
content edited through the [Pages CMS](https://pagescms.org) (no coding), and
deployed free to GitHub Pages. The design is print-ready, so the CV page doubles
as an automatically generated, downloadable PDF.

## What's here

- `src/pages/*.astro` — the pages (home, research, The Guilty Mind, talks, public
  philosophy, teaching, CV). You rarely need to touch these.
- `src/layouts/`, `src/components/`, `src/lib/` — the shared layout, nav, and theme logic.
- `public/styles/style.css` — the stylesheet (includes the print styles used for the CV PDF).
- `data/*.json` — **all the content lives here.** Edit directly or via the CMS.
- `.pages.yml` — config for the Pages CMS editing interface.
- `assets/` — images (favicon, portrait, etc.).
- `scripts/` — build helpers: image optimisation and CV-PDF generation.
- `.github/workflows/deploy.yml` — builds and deploys to GitHub Pages on every push to `main`.

## Editing content (the easy way)

Go to [app.pagescms.org](https://app.pagescms.org), sign in with GitHub, and open
this repository. Every section becomes a friendly form — change text, add a
publication, reorder CV sections, swap the photo, or restyle the site under
**Appearance**. Saving commits the change and the site rebuilds automatically
(~1–2 minutes). No JSON, no code.

Most list items (publications, talks, etc.) have **Published** (show on site) and
**Show on CV** toggles, so things can be hidden without deleting them.

## Developing locally

```bash
npm install
npm run dev      # local preview at http://localhost:4321
npm run build    # production build into dist/
```

## Deployment

Pushing to `main` triggers the GitHub Actions workflow, which optimises images,
builds the site, regenerates the CV PDF from the live `/cv` page, and publishes
to GitHub Pages. The custom domain is set via the `CNAME` file (`romyeskens.com`).
