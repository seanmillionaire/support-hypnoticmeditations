# Hypnotic Meditations Support Hub

Source code for [support.hypnoticmeditations.ai](https://support.hypnoticmeditations.ai), the customer help center for [Hypnotic Meditations](https://hypnoticmeditations.ai).

The support hub helps customers find answers quickly, use their sessions correctly, recover purchases, solve playback problems, understand policies, and discover the right next product.

## What The Site Includes

- Searchable help articles
- Topic-based support collections
- Download and purchase-access help
- Playback and device troubleshooting
- Product and bundle comparisons
- Session usage guides and protocols
- Refund, safety, and policy information
- Responsive desktop and mobile navigation
- Respond.io customer chat
- Links back to the main store, products, reviews, and free sessions

## Support Collections

The knowledge base is organized into eight main collections:

1. Sleep
2. Stress & Calm
3. Money & Abundance
4. Getting Started
5. Programs
6. Purchase & Access
7. Policies & Trust
8. Rituals & Manifestation

Each collection contains individual article pages with practical steps, FAQs, product guidance, and related links.

## Technology

This is a static website built with:

- HTML
- CSS
- Vanilla JavaScript
- Google Fonts
- Externally hosted images

There is no framework, package manager, database, or build step.

## Main File

- `index.html` contains the homepage layout, styles, navigation, search index, search logic, footer, and support-hub interactions.

The repository also contains collection folders and individual article pages used by routes such as:

```text
/sleep/racing-mind-at-night/
/money/money-blocks/
/purchase-access/find-your-download/
/policies-trust/refund-policy/
```

## Run Locally

Use a local web server so folder-based article routes work correctly:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Opening `index.html` directly may not accurately reproduce collection and article routes.

## Search

The homepage search runs in the browser. Article titles, descriptions, tags, reading times, and routes are stored in the `searchData` JavaScript array inside `index.html`.

When adding or changing an article:

1. Create or update the article page.
2. Confirm its collection and route.
3. Update the matching entry in `searchData`.
4. Test searches using the title, topic, and common customer problem.
5. Confirm the search result opens the correct page.

The search opens with two or more typed characters. Visitors can also focus it with `Command+K` on macOS or `Ctrl+K` on Windows.

## Editing Guidelines

When changing the support hub:

- Write for customers who need a fast answer.
- Put the solution before long explanations.
- Use clear steps for downloads, playback, billing, and access issues.
- Keep product names, prices, guarantees, and policy language consistent with the live store.
- Avoid medical promises or unsupported claims.
- Preserve mobile navigation and search behavior.
- Preserve the Respond.io widget unless the support system changes.
- Check repeated links in desktop navigation, mobile navigation, articles, and the footer.

## External Services

The site uses external services for customer experience and media:

- Respond.io for live customer messaging
- Google Fonts for typography
- CloudFront and other hosted sources for images
- HypnoticMeditations.ai for products, store pages, policies, downloads, and contact pages

No environment variables or API keys are required for local preview.

## Deployment

The site can be deployed to static hosting that supports folder-based paths.

The production host should:

- Serve `index.html` at the root
- Preserve collection and article directories
- Serve nested `index.html` files for clean URLs
- Keep HTTPS enabled
- Preserve all external links and scripts

Before publishing, verify:

- Homepage search returns relevant results
- Collection cards open the correct sections
- Individual article routes load directly
- Desktop dropdowns work
- Mobile navigation opens and closes correctly
- Contact, download, refund, and policy links are current
- Product links point to the intended live offers
- Respond.io chat loads
- The site works on mobile and desktop

## Live Site

[https://support.hypnoticmeditations.ai](https://support.hypnoticmeditations.ai)

## Main Brand Site

[https://hypnoticmeditations.ai](https://hypnoticmeditations.ai)

## Repository

[https://github.com/seanmillionaire/support-hypnoticmeditations](https://github.com/seanmillionaire/support-hypnoticmeditations)

## Copyright

Copyright Hypnotic Meditations. All rights reserved.
