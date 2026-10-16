# GitHub Pages deployment

Repository name: `portfolio`. The project is built for `/portfolio/`.
The site is static; it has no server, database, private API keys or login.

## First publication

1. Create the `portfolio` repository on your GitHub account after approving publication.
2. Push this existing folder's `main` branch to that repository.
3. In the repository, open **Settings → Pages → Build and deployment → Source → GitHub Actions**.
4. Open **Actions → Deploy portfolio to GitHub Pages** and wait for both jobs to succeed.
5. The deployment's **github-pages** environment provides the final URL.

The expected URL format is `https://USERNAME.github.io/portfolio/`.
All project media and fonts are included in `public/`; local reference folders stay on this computer.
The public site includes the contact information currently displayed in Contact.

## Future updates

Edit this same folder in Codex. In GitHub Desktop, review changes, commit to `main`, then **Push origin**.
Each push automatically rebuilds and publishes through `.github/workflows/deploy.yml`.
Do not upload `dist/` or `node_modules/`; GitHub Actions builds the release itself.

## Build and preview

The existing dependencies are locked in `pnpm-lock.yaml`.
Install Node.js 24 and pnpm 10, then run:

```sh
pnpm install --frozen-lockfile
npm run build
npm run preview -- --host 127.0.0.1
```

Open `http://127.0.0.1:4173/portfolio/` for the built site.
Normal local development (`npm run dev`) remains at `/`.

If you rename the repository, change the production base in `vite.config.js` to match.
