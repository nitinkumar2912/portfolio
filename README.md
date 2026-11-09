<p align="center">
  <img src="/public/favicon.svg" width="50" alt="Nitin Kumar monogram" />
</p>
<h1 align="center">Nitin Kumar — MERN Stack Developer</h1>

[Portfolio preview](/public/site-preview.png)

Personal portfolio for Nitin Kumar, a Computer Science student at Delhi Technological University. The site highlights his projects, technical skills, GitHub activity, and contact options. It is built with Remix, React, Three.js, and Framer Motion.

## Run locally

Use Node.js `19.9.0` or newer and npm `9.6.3` or newer.

```bash
npm install
cp .dev.vars.example .dev.vars
npm run dev
```

Add the Telegram bot token and chat ID to `.dev.vars` to enable the contact form locally. Configure `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, and `SESSION_SECRET` in the Cloudflare Pages environment for deployment.

## Useful commands

```bash
npm run dev:storybook
npm run build
npm run deploy
```

The project is licensed under the MIT License; see [LICENSE](LICENSE).
