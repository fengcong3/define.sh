# Cong Feng — research website

[define.sh](https://define.sh/) is a static personal research website for Cong Feng. The homepage connects bioinformatics, population genomics and genetics, scientific software, and emerging interests in AI for biology and agentic science.

## Implementation

Plain semantic HTML and one CSS file. No application JavaScript, framework, build step, package installation, external font request, analytics, or icon library is needed for the redesigned pages. Native anchors and `<details>` keep navigation and the publication archive usable without JavaScript. The separate, existing MkDocs guide at `/AI/` keeps its own assets and runtime.

- `index.html`: biography, research, publications, software, career, notes, contact and Person structured data.
- `assets/css/style.css`: responsive layout, focus states and print styles.
- `assets/images/my-avatar.png`: original portrait, reused without alteration.
- `assets/images/favicon.svg`: small typographic favicon; `logo.ico` remains the fallback.
- `cv/index.html`: accessible wrapper around the unchanged archived PDF files.
- `AI/`: existing compiled AI practical guide; preserved as supplied.
- `fengcong3/`: companion GitHub profile and its assets.
- `404.html`, `robots.txt`, `sitemap.xml`: error page and search-engine metadata.

## Preview

Serve the **repository root**, not the nested `fengcong3` directory:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8000/`. Asset paths start at `/` to support the custom domain and nested error-page URLs. Deploy at the domain root.

## Editing content

Edit `index.html` directly. Publications are static, crawlable HTML: the three selected entries are followed by four further publications in a native disclosure. Preserve author ordering, DOI links, and collaborator credits when editing. Update visible biographical text and JSON-LD together. Keep the SVG in the hero decorative: it is a schematic motif, not research data.

Facts were retained from the previous homepage, the companion profile and the PDFs already in `cv/`. The HKU appointment (Research Assistant, late January 2026–present) was supplied by the owner. The exact end date of the preceding CAAS appointment was not supplied, so that entry shows its known start date and identifies it as a previous appointment. AI/agentic science is presented as an interest, without implying published results or a specific HKU project.

The two CV PDFs are historical documents and remain unchanged. The CV page labels their dates explicitly. Research portal contributions are described using the existing CV; the original homepage’s website-creation credit to Zejian Huang is preserved for WWWG2B and Mendel Pea G2P. Older personal details and awards remain available in the CV archive.

## Deployment

The existing GitHub repository is `fengcong3/define.sh`, with `main` as the current branch. GitHub reports Pages enabled, and the existing `pages build and deployment` workflow published the pre-redesign `main` commit successfully. `CNAME` remains `define.sh`. `.nojekyll` serves these already-built static files without Jekyll processing; no new deployment service or custom workflow is introduced.

Push to the configured Pages source branch, then check the repository’s Actions/Pages deployment and `https://define.sh/`. The redesign uses the existing branch and domain. A preview server is not a production server.

## Verification checklist

- Check desktop, tablet, 390px and 320px layouts for overflow and readable text.
- Follow section links; navigate by keyboard and test the skip link and publication disclosure.
- Check the page with JavaScript disabled, increased text size and reduced motion.
- Verify local assets, both CV downloads, `/AI/`, sitemap, and the 404 page.
- Check console/network errors and metadata; review the Git diff before publishing.

The previous version was based on the vCard template by Sadee. Its tab navigation, percentage bars, modal/filter code, Poppins/ionicons dependencies and unused screenshot assets were removed in this redesign. Historical changes are recorded in `CHANGES.md`.
