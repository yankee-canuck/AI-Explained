# AI Edu — Duolingo x Khan Academy Starter

A minimal **Next.js App Router + TypeScript** starter for an AI education site with:
- Tailwind + basic shadcn-style components
- Prisma + Postgres (Supabase or local)
- NextAuth (Email magic links)
- Lesson player with quiz flow + “Learn more” panel
- Two demo games (Prompt Debugger & Token Buster placeholders)

## Quick Start
1) Install deps
```bash
npm install
```
2) Copy env
```bash
cp .env.example .env.local
```
3) Init database
```bash
npx prisma migrate dev --name init
```
4) Run dev server
```bash
npm run dev
```

Open http://localhost:3000

### Env (.env.local)
```
DATABASE_URL=postgresql://user:pass@host:5432/db
NEXTAUTH_SECRET=change_me_32_chars
NEXTAUTH_URL=http://localhost:3000
EMAIL_SERVER=smtp://user:pass@smtp.host:587
EMAIL_FROM="AI Edu <no-reply@yourdomain.com>"
```

### Notes
- MDX rendering is left simple (plain text) to keep the starter lightweight. Swap in `next-mdx-remote` later.
- Seed more lessons via `npx prisma studio`.
- Add your games under `/app/games/*` (I left placeholders).

Happy shipping 🚀
