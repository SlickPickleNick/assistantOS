# AssistantOS: Hotel AI Concierge & Administrative Operations Platform

An enterprise-grade, luxury boutique hotel web application featuring an integrated, authenticated AI Concierge assistant, human-in-the-loop response curation, and administrative operations dashboard.

---

## Key Features

1. **Gatekeeper Authentication**:
   - Site-wide access control protecting the demonstration experience and AI token quotas.
   - **Guests (Testers)**: Instant 1-click or OAuth simulation (Google / Discord) granting the `guest` role to explore the hotel website and test the concierge chat.
   - **Administrators**: On-site credentials portal granting the `admin` role with full access to `/admin` management tools.

2. **Luxury Boutique Hotel Showcase ("The Grand Azure Resort & Spa")**:
   - Modern, high-aesthetic UI styled with tailored luxury dark/gold color schemes.
   - Interactive hero banner, luxury suites gallery, culinary dining experiences, and thalasso spa showcase.

3. **Floating AI Concierge Chat Widget**:
   - Bottom-right floating bubble with smooth opening transitions, starter prompt chips, and Markdown response rendering.
   - Simulated intelligent knowledge base ready to answer check-in/checkout, dining, pet policies, amenities, and local excursions.

4. **Continuous Feedback Loop & Active Corrections**:
   - Interactive **Thumbs Up / Thumbs Down** ratings on every assistant message.
   - Structured negative feedback categorization (*Inaccurate info, Unhelpful, Tone, Other*) with optional guest commentary.
   - **Active Few-Shot Exemplar Override**: When administrators author a correction in the admin portal, the AI immediately prioritizes the verified answer in subsequent guest inquiries.

5. **Staff Desk Operations Portal (`/admin`)**:
   - Real-time KPI cards: Total Sessions, Message Volume, Satisfaction %, Downvoted Queue, and Verified Corrections.
   - Full-text conversational search across queries, answers, and guest emails.
   - Feedback triage filtering (`All`, `👎 Disliked Only`, `👍 Liked Only`).
   - One-click transcript export in **Markdown (`.md`)** and **Plain Text (`.txt`)** formats.

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Database & Seed Admin
```bash
# Push schema to SQLite
npx prisma db push

# Seed initial admin account and test data
npm run prisma:seed # or npx tsx prisma/seed.ts
```

### 3. Run Application
```bash
# Production mode (Recommended for fast, stable runtime):
npm run build
npm start

# Or development mode:
npm run dev
```

The application will be live at `http://localhost:3000`.

---

## Default Credentials

### Team Administrator Login
- **URL**: `http://localhost:3000/admin`
- **Username**: `admin`
- **Password**: `HotelAdmin2026!`

### Guest Access
- Click **"1-Click Quick Guest Login (Instant Test)"** on the Gatekeeper modal to test as a guest, or input custom name/email.

---

## Project Structure

```text
assistantOS/
├── prisma/
│   ├── schema.prisma        # Normalized relational schema (User, ChatSession, ChatMessage, Feedback, Correction)
│   └── seed.ts              # Database seed script for admin & sample sessions
├── src/
│   ├── app/
│   │   ├── admin/page.tsx   # Staff Desk operations & curation dashboard
│   │   ├── api/
│   │   │   ├── admin/       # Search, stats, corrections, and export endpoints
│   │   │   ├── auth/        # Login, logout, and session verification
│   │   │   ├── chat/        # AI Concierge query processing & active correction injection
│   │   │   └── feedback/    # Thumbs up/down rating ingestion
│   │   ├── globals.css      # Luxury dark & gold design tokens and micro-interactions
│   │   ├── layout.tsx       # Root layout and font configurations
│   │   └── page.tsx         # Grand Azure Resort & Spa showcase page
│   ├── components/
│   │   ├── ChatWidget.tsx   # Floating concierge chat interface
│   │   ├── GatekeeperModal.tsx # Site-wide authentication barrier
│   │   ├── HotelHero.tsx    # Hotel showcase hero banner
│   │   ├── HotelSuites.tsx  # Accommodations showcase
│   │   ├── HotelDining.tsx  # Culinary experiences showcase
│   │   ├── HotelAmenities.tsx # Spa & resort amenities
│   │   └── Navbar.tsx       # Luxury navigation bar with user profile & sign out
│   └── lib/
│       ├── auth.ts          # JWT session verification and cookie helpers
│       └── prisma.ts        # Prisma client singleton
└── DESIGN_PROCESS.md        # Comprehensive academic design log & architectural journal
```

---

## Design Process Documentation

For a complete chronological record of user requirements, pair-programming interactions, architectural decisions, and system verification, refer to [DESIGN_PROCESS.md](./DESIGN_PROCESS.md).
