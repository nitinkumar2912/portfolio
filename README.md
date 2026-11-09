<p align="center">
  <img src="/public/favicon.svg" width="50" alt="Nitin Kumar monogram" />
</p>
<h1 align="center">Nitin Kumar — MERN Stack Developer</h1>

[Portfolio preview](/public/site-preview.png)

Personal portfolio for Nitin Kumar, a Computer Science student at Delhi Technological University. The site highlights his projects, technical skills, GitHub activity, and contact options. It is built with Remix, React, Three.js, and Framer Motion.

## Run locally

Use Node.js `20.0.0` or newer and npm `9.6.3` or newer.

```bash
npm install
npm run dev
```

Set `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, and `SESSION_SECRET` in your local shell to enable the contact form and signed theme session. Add the same variables to the Vercel project’s Environment Variables settings for the Preview and Production environments where you want those features enabled. Keep their values out of Git.

Keep Vercel system environment variables enabled so `VERCEL_PROJECT_PRODUCTION_URL` is available for canonical URLs in Preview deployments.

## Useful commands

```bash
npm run dev:storybook
npm run build
```

Vercel builds the app with `npm run build`. Push a separate Git branch to create a Vercel Preview Deployment; no custom output directory is required.

The project is licensed under the MIT License; see [LICENSE](LICENSE).
