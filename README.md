# Cong Feng — research website

[define.sh](https://define.sh/) is a static personal research website for Cong Feng. The homepage connects bioinformatics, population genomics and genetics, scientific software, and emerging interests in AI for biology and agentic science.

## Implementation

Plain semantic HTML, a core stylesheet and optional character/greenhouse styles and JavaScript. No framework, build step, package installation, external font request, analytics, or icon library is needed for the redesigned pages. Native anchors and `<details>` keep navigation and the publication archive usable without JavaScript. The separate, existing MkDocs guide at `/AI/` keeps its own assets and runtime.

- `index.html`: biography, research, publications, software, career, contact and Person structured data.
- `assets/css/style.css`: responsive layout, a fluid 17–22px reading scale, focus states and print styles. The content width grows to 1600px for large displays. Expansive research chapters pair large headings with original botanical and genomic illustrations.
- `assets/images/researcher.svg`: original vector researcher with layered side-parted hair, detailed clothing, hands and props. CSS variables control gaze, expression, greeting, book, laptop and DNA poses.
- `assets/images/research-visuals.svg`: original pea, wheat, DNA and network illustrations, rendered through SVG symbols.
- `assets/js/story.js`: a passive scroll listener batches updates through `requestAnimationFrame`. The character moves into the side margin on wide displays or the reserved navigation space on smaller screens. It changes pose by section and responds to pointer hover with gaze and expression. Reduced-motion preference leaves the character in the hero and disables movement.
- `assets/js/greenhouse.js` and `assets/css/greenhouse.css`: the optional pocket greenhouse, opened by the character button. Native dialog semantics, keyboard focus cycling, touch controls and reduced-motion support are included.
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

Edit `index.html` directly. All substantive content remains available without JavaScript; the character illustration is decorative, while its enabled button has an accessible name. Without JavaScript the button stays disabled and the experiment stays hidden. The haplotype matrix contains explicitly labelled illustrative samples, not research results.

The pocket greenhouse is a playful, single-gene model of pea seed colour ([OpenStax reference](https://openstax.org/books/biology/pages/12-2-characteristics-and-traits)). Each parent contributes either allele with equal probability; the four combinations determine the displayed phenotype probabilities. A draw samples one combination independently. Changing parents clears the harvest, and only the latest twelve seeds are drawn while counts cover the current cross. This educational interaction does not represent personal research results. It has no remote service, saved data or additional dependencies.

The owner requested removal of the open-notebook section, both blog links, the AI-guide homepage link and the discontinued cloud-disk link. The existing AI guide files and companion GitHub profile remain separate, unchanged resources.

Publications are static, crawlable HTML: the three selected entries are followed by four further publications in a native disclosure. Preserve author ordering, DOI links, and collaborator credits when editing. Update visible biographical text and JSON-LD together.

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
- Check the character in all scroll scenes, pointer hover, touch activation and modal focus return.
- Check all nine parental crosses, repeated draws, harvest reset, closing during growth and reduced-motion outcomes.
- Check console/network errors and metadata; review the Git diff before publishing.

The previous version was based on the vCard template by Sadee. Its tab navigation, percentage bars, modal/filter code, Poppins/ionicons dependencies and unused screenshot assets were removed in this redesign. Historical changes are recorded in `CHANGES.md`.
