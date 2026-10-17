# Creature Handbooks

A small static site for the Creature Handbooks project, with the complete *Creatures of Deerfield, IL* sample book and selected page previews.

## Preview locally

From this directory, start Python's built-in static server:

```powershell
python -m http.server 8000 --directory dist
```

Then open `http://localhost:8000`. Serving the `dist` directory keeps the relative sample image and PDF paths working.

## Publish with GitHub Pages

The workflow in `.github/workflows/pages.yml` uploads only `dist/` to GitHub Pages when a commit reaches `main`. It can also be started from the repository's **Actions** tab with **Deploy to GitHub Pages** → **Run workflow**. In the repository settings, set Pages' build and deployment source to **GitHub Actions**.

The site's paths are relative, so the files work from a repository subpath as well as a domain root. `dist/.nojekyll` keeps Pages from applying Jekyll processing.

## Request handoff

The request form builds a reviewable message in the visitor's browser. It does not submit or store the request. Copy is available immediately. To enable the optional **Open email draft** button, replace the empty `CONTACT_EMAIL` constant near the top of `dist/app.js` with an approved receiving address. That button opens the visitor's email app with the request filled in; the visitor reviews and sends it themselves. The copy option remains available if their device has no email app configured.

This static site has no request inbox, payment flow, checkout, or automatic book generation. GitHub Pages does not provide commerce-oriented hosting; if checkout is added later, move the site to a host that supports that use.

## Included sample files

The public sample is the complete 19-page Deerfield handbook PDF, with five rendered pages used by the gallery and its illustrated cover. Keep the PDF and image paths under `dist/assets/` so both the gallery and direct sample links continue to work.
