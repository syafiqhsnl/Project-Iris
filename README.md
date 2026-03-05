# Project Iris

> A temporal study in chronological data orchestration and state-driven UI.

A high-end frontend architectural study and UI component showcase built to demonstrate fluid, dual-state timeline rendering, complex client-side state management, and production-grade animation patterns.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |

---

## Key Features

- **Spring-based scroll animations** — Fluid, physics-driven entry transitions orchestrated via Framer Motion's spring engine.
- **Seamless state crossfading** — Dual-panel timeline toggling powered by `AnimatePresence` for zero-flash state transitions.
- **Encrypted authentication modal** — A simulated 2-step challenge/response access flow with shake-on-failure feedback and step-scoped input isolation.
- **Dark-mode-first design** — Minimalist, accessible UI inspired by Linear and Vercel. Fully responsive across all viewport sizes.

---

## Environment Variables

The encrypted modal feature reads its validation targets from environment variables. To test locally, create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_TARGET_COLLEGE=your_value_here
NEXT_PUBLIC_TARGET_DOB=your_value_here
```

> `.env.local` is excluded from version control. Never commit secrets to the repository.

---

## Getting Started

```bash
npm install
npm run dev
```

The development server will be available at `http://localhost:3000`.

---

## Docker Deployment

The repository includes a multi-stage `Dockerfile` optimized for standalone Next.js output, targeting minimal final image size and production parity.

```bash
docker compose up -d --build
```

Ensure your environment variables are configured in a `.env.local` file or passed directly to the container before deployment.

---

## License

MIT
