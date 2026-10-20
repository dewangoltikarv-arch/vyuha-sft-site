# Vyuha Show Follow-Through

Static marketing site for dvyuha.com. Publish dist/ with no build dependencies.

Local preview: python3 -m http.server 4188 --directory dist

Production: https://dvyuha.com
Render: https://vyuha-sft.onrender.com
Source: https://github.com/dewangoltikarv-arch/vyuha-sft-site

The editorial redesign uses the user's supplied Vyuha reference imagery from https://vyuha-follow-through.sites.tab.bot/ (assets under img/), copied into dist/assets for independent hosting. Images are illustrative. Google Fonts provides Cormorant Garamond and DM Sans with local fallbacks.

The phase tabs support keyboard navigation. Reveal motion respects reduced-motion preferences and content remains available if JavaScript is disabled. The Start the conversation button opens an embedded Google Calendar booking window for dewang@dvyuha.com. The 20-minute appointment schedule uses Google Meet and asks for company, show name and dates, plus optional buyer goals. The calendar iframe loads only after the visitor opens booking. The direct booking fallback is https://calendar.app.google/uvvhdR3DRf3gERjU7.

Product source: Workspace/02_Product/02 Product - SFT/vyuha_show_follow_through_product.md (30 September 2026). No fabricated outcomes, testimonials, or fixed public pricing.

Render uses the public repository. Deploy updates explicitly through the Render dashboard when public-repository auto-deploy is unavailable. Website DNS: root A 216.24.57.1 and www CNAME vyuha-sft.onrender.com. Keep existing mail records intact.
