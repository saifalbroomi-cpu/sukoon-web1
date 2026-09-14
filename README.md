# Sukoon

Coming-soon teaser for **Sukoon** — [wearsukoon.online](https://wearsukoon.online)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Cormorant Garamond + Jost

## Deploy on Netlify

1. Push this repo to GitHub (`saifalbroomi-cpu/sukoon-web1`).
2. In [Netlify](https://app.netlify.com): **Add new site → Import an existing project → GitHub**.
3. Select `sukoon-web1`.
4. Build settings (auto-detected; also in `netlify.toml`):
   - **Build command:** `npm run build`
   - **Node version:** `22`
5. Deploy.

### Connect wearsukoon.online

1. Netlify → your site → **Domain management → Add a domain** → `wearsukoon.online`.
2. Also add `www.wearsukoon.online` if you want www.
3. At your domain registrar, either:
   - **Option A (recommended):** Use Netlify DNS — point the domain’s nameservers to the ones Netlify shows, **or**
   - **Option B:** Keep your current DNS and add the records Netlify lists (usually an **A** / **ALIAS** for apex and a **CNAME** for `www`).
4. Wait for DNS + SSL (Let’s Encrypt) to finish — often a few minutes, sometimes up to 24–48h.

Production URL once live: **https://wearsukoon.online**

## Assets

- `public/sukoon-logo.png` — official brand mark
- `public/sukoon-fabric-hero.jpg` — fashion campaign backdrop

To swap the fashion image, change `HERO_IMAGE` in `src/components/ComingSoon.tsx`.
