# Railway Deployment & Setup Guide for AssistantOS

This document provides complete instructions for deploying and testing **AssistantOS (Go Gator Resort & Spa)** on [Railway](https://railway.app).

---

## 1. Summary of Changes Made to the Codebase

The repository is already pre-configured for zero-config Railway deployment:

1. **[`railway.json`](file:///Users/nicksilvestro/GitHub%20Repos/AssistantOS/assistantOS/railway.json)**:
   - Configured with the **Nixpacks** builder.
   - Configured automated startup command:
     ```bash
     prisma db push && tsx prisma/seed.ts && next start -H 0.0.0.0 -p ${PORT:-3000}
     ```
   - Automatically provisions and seeds the database (`admin` / `HotelAdmin2026!`) on every boot.

2. **[`package.json`](file:///Users/nicksilvestro/GitHub%20Repos/AssistantOS/assistantOS/package.json)**:
   - Moved `prisma` and `tsx` into production `dependencies`.
   - Updated `start` script to bind to host `0.0.0.0` and dynamic port `${PORT:-3000}`.

3. **[`DESIGN_PROCESS.md`](file:///Users/nicksilvestro/GitHub%20Repos/AssistantOS/assistantOS/DESIGN_PROCESS.md)**:
   - Documented Session 9 and checked off Milestone 9.

---

## 2. 3-Step Railway Deployment Process

### Step 1: Connect Your GitHub Repository
1. Log in to [railway.app](https://railway.app).
2. Click **+ New Project** &rarr; **Deploy from GitHub repo**.
3. Select **`SlickPickleNick/assistantOS`**.
4. Railway will automatically detect the Next.js application.

---

### Step 2: Configure Environment Variables
1. In the Railway dashboard canvas, click on your newly created service.
2. Navigate to the **Variables** tab.
3. Click the **Raw Editor** button in the top-right corner.
4. Copy and paste the following block into the editor:

```env
DATABASE_URL=file:./dev.db
NEXTAUTH_SECRET=hotel-concierge-super-secret-jwt-key-2026
NEXTAUTH_URL=https://${{RAILWAY_PUBLIC_DOMAIN}}
DEFAULT_ADMIN_USERNAME=admin
DEFAULT_ADMIN_PASSWORD=HotelAdmin2026!
DEFAULT_ADMIN_EMAIL=admin@luxuryhotel.demo
```

> **Note on `NEXTAUTH_URL`**: Railway automatically substitutes `${{RAILWAY_PUBLIC_DOMAIN}}` with your generated public domain name.

---

### Step 3: Generate Public Domain
1. In your service, navigate to **Settings** &rarr; **Networking** (or **Public Networking**).
2. Click **Generate Domain**.
3. Railway will assign a public URL (e.g., `assistantos-production.up.railway.app`).
4. Railway will automatically trigger a build and deploy in ~45–60 seconds.

---

## 3. Testing Your Live Application

Once the deployment finishes and shows a green **Active** status:

### 1. Guest Experience & Testing
- Visit your generated Railway URL.
- On the gatekeeper login screen, click **"Continue as Guest (Demo)"**.
- **What to test**:
  - Floating concierge chat bubble (bottom-right).
  - Room categories (Garden View to Two-Bedroom Villa).
  - Dining venues (Go Gator Buffet, Waterfront, Gator Grill, etc.).
  - Daily Resort Bulletins banner.
  - Interactive Property Map lightbox.
  - Gator Rewards loyalty tiers.

### 2. Admin Portal (`/admin`)
- Navigate to `https://<YOUR-RAILWAY-DOMAIN>/admin`.
- **Credentials**:
  - **Username**: `admin`
  - **Password**: `HotelAdmin2026!`
- **What to test**:
  - Real-time chat session metrics and rating breakdown.
  - Searchable query & response log table.
  - Flagged responses queue (messages downvoted by guests).
  - Correction editor (provide ideal answers to refine few-shot prompting).
  - Transcript export (.md / .txt).

---

## 4. Database Persistence Options (For Future Reference)

- **Default (Current Setup - Ephemeral SQLite)**:
  - Database is automatically created and seeded on container start. Perfect for fast testing and demonstrations.
- **Option A: Railway Volume (Persistent SQLite)**:
  - In Railway service settings, click **Add Volume** mounted to `/data`.
  - Update variable: `DATABASE_URL=file:/data/app.db`.
- **Option B: Railway PostgreSQL (Production)**:
  - In Railway, click **+ New** &rarr; **Database** &rarr; **PostgreSQL**.
  - Connect the variable: `DATABASE_URL=${{Postgres.DATABASE_URL}}`.
