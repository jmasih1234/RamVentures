# RAM Ventures - Development Spec

## Overview
This spec defines the implementation plan for upgrading RAM Ventures from Next.js 13 Pages Router to Next.js 14 App Router with full authentication, database integration, and all core features.

---

## Phase 1: Foundation Setup

### 1.1 Upgrade to Next.js 14
- [ ] Update `package.json` dependencies
- [ ] Install TypeScript and type definitions
- [ ] Install Tailwind CSS (if not present)
- [ ] Configure `next.config.js` for App Router
- [ ] Create `tsconfig.json` with strict mode

### 1.2 Project Structure
Create the App Router folder structure:
```
app/
├── (marketing)/
│   ├── page.tsx
│   ├── about/page.tsx
│   ├── events/page.tsx
│   └── layout.tsx
├── (platform)/
│   ├── layout.tsx
│   ├── dashboard/page.tsx
│   ├── ventures/
│   │   ├── page.tsx
│   │   ├── [id]/page.tsx
│   │   └── new/page.tsx
│   ├── pipeline/page.tsx
│   ├── teams/page.tsx
│   ├── recruiting/page.tsx
│   ├── pathways/[pathway]/page.tsx
│   └── profile/page.tsx
├── (admin)/
│   ├── layout.tsx
│   └── admin/
│       ├── page.tsx
│       ├── ventures/page.tsx
│       ├── users/page.tsx
│       └── events/page.tsx
├── (auth)/
│   ├── layout.tsx
│   ├── login/page.tsx
│   └── signup/page.tsx
├── api/
│   ├── ventures/route.ts
│   ├── events/route.ts
│   ├── users/route.ts
│   └── pipeline/route.ts
├── layout.tsx
├── loading.tsx
├── error.tsx
└── not-found.tsx
```

### 1.3 Supabase Setup
- [ ] Create `lib/supabase/client.ts` (browser client)
- [ ] Create `lib/supabase/server.ts` (server client)
- [ ] Create `lib/supabase/middleware.ts` (auth helpers)
- [ ] Run database schema SQL in Supabase

---

## Phase 2: Authentication

### 2.1 Auth Middleware
- [ ] Create `middleware.ts` at root
- [ ] Protect `(platform)` routes - require auth
- [ ] Protect `(admin)` routes - require admin role
- [ ] Allow `(marketing)` routes - public access
- [ ] Redirect unauthenticated users to login

### 2.2 Auth Pages
- [ ] Login page with email/password
- [ ] Login with magic link option
- [ ] Signup page with role selection
- [ ] Password reset flow
- [ ] OAuth buttons (for future CSU SSO)

### 2.3 Auth Context
- [ ] Create auth provider component
- [ ] User session hook
- [ ] Role-based access hook

---

## Phase 3: Core Features

### 3.1 Ventures
- [ ] Ventures list page with filters (stage, major, skills)
- [ ] Venture detail page
- [ ] Create venture form (founders only)
- [ ] Edit venture (owners only)
- [ ] Join venture / apply button
- [ ] Open roles listing

### 3.2 Pipeline Tracker
- [ ] Visual pipeline (Ready → Set → Go)
- [ ] Stage progress indicators
- [ ] Checkpoint tracking
- [ ] Team review interface (for Analytics/Investment teams)
- [ ] Advance stage functionality

### 3.3 Events
- [ ] Events list with type filters
- [ ] Event detail page
- [ ] Registration button
- [ ] Capacity tracking
- [ ] Calendar view (optional)

### 3.4 Pathways
- [ ] Pathway selection page
- [ ] Pathway-specific dashboard
- [ ] Activity tracking
- [ ] Outcome milestones

### 3.5 Teams
- [ ] Team directory (Ops, Analytics, Investment, Tech)
- [ ] Team member list
- [ ] Join team request
- [ ] Team-specific dashboards

### 3.6 Recruiting
- [ ] Open roles marketplace
- [ ] Filter by skills, major, venture stage
- [ ] Application flow
- [ ] Application management (for ventures)

---

## Phase 4: Admin Features

### 4.1 Admin Dashboard
- [ ] Overview stats (ventures, users, events)
- [ ] Recent activity feed
- [ ] Quick actions

### 4.2 User Management
- [ ] User list with search/filter
- [ ] Role assignment
- [ ] Pathway assignment
- [ ] Deactivate users

### 4.3 Venture Management
- [ ] All ventures view
- [ ] Approve/reject ventures
- [ ] Edit any venture
- [ ] Pipeline stage override

### 4.4 Event Management
- [ ] Create/edit events
- [ ] View registrations
- [ ] Mark attendance

---

## Phase 5: Polish & Deploy

### 5.1 UI/UX
- [ ] Responsive design for all pages
- [ ] Loading states
- [ ] Error handling
- [ ] Empty states
- [ ] Toast notifications

### 5.2 Animations
- [ ] Integrate existing GSAP animations
- [ ] Page transitions
- [ ] Smooth scroll with Lenis

### 5.3 Testing
- [ ] Auth flow testing
- [ ] CRUD operations testing
- [ ] Role-based access testing

### 5.4 Deployment
- [ ] Configure Vercel project
- [ ] Set environment variables
- [ ] Deploy to production

---

## Success Criteria

The project is complete when:
1. ✅ All pages render without errors
2. ✅ Authentication works (login, signup, logout)
3. ✅ Role-based access is enforced
4. ✅ Ventures can be created, viewed, and edited
5. ✅ Pipeline stages can be tracked and updated
6. ✅ Events can be created and users can register
7. ✅ Users can select and follow pathways
8. ✅ Admin can manage all content
9. ✅ Database operations work with Supabase
10. ✅ App deploys successfully to Vercel

---

## Ralph Wiggum Loop Prompt

Use this prompt to start an iterative development loop:

```
/ralph-loop "Build the RAM Ventures Next.js 14 application following the spec in docs/DEVELOPMENT_SPEC.md.

Start with Phase 1 (Foundation Setup), then proceed through each phase.

For each phase:
1. Implement all checklist items
2. Test that the code compiles without errors
3. Verify database connections work

Output <promise>PHASE_COMPLETE</promise> after completing each phase.
Output <promise>ALL_COMPLETE</promise> when all phases are done.

Current progress: Starting fresh." --completion-promise "ALL_COMPLETE" --max-iterations 100
```

---

## File Dependencies

Before running Claude Code, ensure these files exist:
- `CLAUDE.md` - Project context (created ✓)
- `docs/architecture.md` - System architecture (created ✓)
- `docs/database-schema.sql` - SQL schema (created ✓)
- `docs/DEVELOPMENT_SPEC.md` - This file (created ✓)
