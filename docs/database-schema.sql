-- RAM Ventures Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PATHWAYS (must create first for FK reference)
-- ============================================
CREATE TABLE pathways (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE CHECK (name IN ('explorer', 'entrepreneur', 'civic', 'creative', 'intrapreneur')),
    description TEXT,
    activities JSONB DEFAULT '[]',
    outcomes JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed pathways
INSERT INTO pathways (name, description) VALUES
    ('explorer', 'For students curious about innovation. Workshops and job shadowing.'),
    ('entrepreneur', 'For founders creating ventures. The Ready, Set, Go pipeline.'),
    ('civic', 'For social impact focus. Partner with nonprofits and community groups.'),
    ('creative', 'For artists and media creators. Brand building and media startups.'),
    ('intrapreneur', 'For students seeking corporate innovation skills. Work within ventures.');

-- ============================================
-- USERS
-- ============================================
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'founder', 'mentor', 'investor', 'admin')),
    pathway_id UUID REFERENCES pathways(id),
    major TEXT,
    graduation_year TEXT,
    bio TEXT,
    skills JSONB DEFAULT '[]',
    linkedin_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TEAMS (Internal support teams)
-- ============================================
CREATE TABLE teams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE CHECK (name IN ('operations', 'analytics', 'investment', 'tech')),
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed teams
INSERT INTO teams (name, description) VALUES
    ('operations', 'Manages physical space, events, and day-to-day workflow.'),
    ('analytics', 'Validates business models, reviews data, tracks venture performance.'),
    ('investment', 'Manages Alumni Hub relationships, evaluates pitches, allocates funding.'),
    ('tech', 'Provides technical resources, software support, and dev guidance.');

-- ============================================
-- TEAM MEMBERS
-- ============================================
CREATE TABLE team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('lead', 'member')),
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(team_id, user_id)
);

-- ============================================
-- VENTURES
-- ============================================
CREATE TABLE ventures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    stage TEXT NOT NULL DEFAULT 'ready' CHECK (stage IN ('ready', 'set', 'go')),
    logo_url TEXT,
    majors_needed JSONB DEFAULT '[]',
    contact_email TEXT,
    website_url TEXT,
    created_by UUID REFERENCES users(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- VENTURE MEMBERS
-- ============================================
CREATE TABLE venture_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    venture_id UUID NOT NULL REFERENCES ventures(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('founder', 'cofounder', 'member')),
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(venture_id, user_id)
);

-- ============================================
-- PIPELINE PROGRESS (Ready/Set/Go tracking)
-- ============================================
CREATE TABLE pipeline_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    venture_id UUID NOT NULL REFERENCES ventures(id) ON DELETE CASCADE,
    stage TEXT NOT NULL CHECK (stage IN ('ready', 'set', 'go')),

    -- Ready stage checkpoints
    mvp_complete BOOLEAN DEFAULT false,
    customer_validated BOOLEAN DEFAULT false,

    -- Set stage checkpoints
    pitch_ready BOOLEAN DEFAULT false,
    financial_model BOOLEAN DEFAULT false,

    -- Go stage checkpoints
    funded BOOLEAN DEFAULT false,
    launched BOOLEAN DEFAULT false,

    notes TEXT,
    reviewed_by UUID REFERENCES users(id),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE(venture_id, stage)
);

-- ============================================
-- EVENTS
-- ============================================
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL CHECK (type IN ('workshop', 'demo_day', 'hackathon', 'networking', 'other')),
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    location TEXT,
    capacity INT,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- EVENT REGISTRATIONS
-- ============================================
CREATE TABLE event_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'registered' CHECK (status IN ('registered', 'attended', 'cancelled')),
    registered_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(event_id, user_id)
);

-- ============================================
-- OPEN ROLES
-- ============================================
CREATE TABLE open_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    venture_id UUID NOT NULL REFERENCES ventures(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    skills_required JSONB DEFAULT '[]',
    is_filled BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- APPLICATIONS
-- ============================================
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    venture_id UUID NOT NULL REFERENCES ventures(id) ON DELETE CASCADE,
    role_id UUID REFERENCES open_roles(id) ON DELETE SET NULL,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
    applied_at TIMESTAMPTZ DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ,
    reviewed_by UUID REFERENCES users(id)
);

-- ============================================
-- MENTORSHIPS
-- ============================================
CREATE TABLE mentorships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mentor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    mentee_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    venture_id UUID REFERENCES ventures(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
    started_at TIMESTAMPTZ DEFAULT NOW(),
    ended_at TIMESTAMPTZ,
    UNIQUE(mentor_id, mentee_id, venture_id)
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE ventures ENABLE ROW LEVEL SECURITY;
ALTER TABLE venture_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE pipeline_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE pathways ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE open_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentorships ENABLE ROW LEVEL SECURITY;

-- Public read access for some tables
CREATE POLICY "Public pathways" ON pathways FOR SELECT USING (true);
CREATE POLICY "Public teams" ON teams FOR SELECT USING (true);
CREATE POLICY "Public events" ON events FOR SELECT USING (is_active = true);
CREATE POLICY "Public ventures" ON ventures FOR SELECT USING (is_active = true);
CREATE POLICY "Public open_roles" ON open_roles FOR SELECT USING (is_filled = false);

-- Users can read their own data
CREATE POLICY "Users read own" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own" ON users FOR UPDATE USING (auth.uid() = id);

-- Authenticated users can read all active content
CREATE POLICY "Auth read ventures" ON ventures FOR SELECT TO authenticated USING (true);
CREATE POLICY "Auth read users" ON users FOR SELECT TO authenticated USING (true);

-- Founders can manage their ventures
CREATE POLICY "Founders manage ventures" ON ventures
    FOR ALL TO authenticated
    USING (created_by = auth.uid());

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_ventures_stage ON ventures(stage);
CREATE INDEX idx_ventures_active ON ventures(is_active);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_pathway ON users(pathway_id);
CREATE INDEX idx_events_date ON events(start_date);
CREATE INDEX idx_applications_status ON applications(status);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ventures_updated_at
    BEFORE UPDATE ON ventures
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();
