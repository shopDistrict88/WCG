-- Wilson Collective OS - Supabase Schema
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/zrngcvmyydzvrgopgtzd/sql

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Auth credentials (for custom login until Supabase Auth is used)
create table if not exists auth_credentials (
  email text primary key,
  password_hash text not null,
  created_at timestamptz default now()
);

-- Users
create table if not exists os_users (
  id text primary key,
  name text not null,
  email text not null unique,
  role text not null,
  avatar text not null default '',
  title text not null default '',
  brands text[] default '{}',
  joined_date text not null,
  created_at timestamptz default now()
);

-- Brands
create table if not exists brands (
  id text primary key,
  name text not null,
  category text not null,
  status text not null,
  color text not null,
  members text[] default '{}',
  description text default '',
  created_at timestamptz default now()
);

-- Projects
create table if not exists projects (
  id text primary key,
  name text not null,
  brand_id text not null,
  description text default '',
  status text not null,
  deadline text not null,
  members text[] default '{}',
  progress int default 0,
  tasks int default 0,
  completed_tasks int default 0,
  created_at timestamptz default now()
);

-- Tasks
create table if not exists tasks (
  id text primary key,
  title text not null,
  description text default '',
  project_id text,
  assignee_id text not null,
  priority text not null,
  status text not null,
  due_date text not null,
  comments int default 0,
  attachments int default 0,
  created_at timestamptz default now()
);

-- Campaigns
create table if not exists campaigns (
  id text primary key,
  name text not null,
  brand_id text not null,
  status text not null,
  start_date text not null,
  end_date text not null,
  budget text default '',
  reach text default '',
  strategy text default '',
  created_at timestamptz default now()
);

-- Ideas
create table if not exists ideas (
  id text primary key,
  title text not null,
  description text default '',
  category text not null,
  author_id text not null,
  votes int default 0,
  comments int default 0,
  status text not null,
  created_at text not null,
  created_at_ts timestamptz default now()
);

-- Announcements
create table if not exists announcements (
  id text primary key,
  title text not null,
  content text default '',
  author_id text not null,
  date text not null,
  priority text not null,
  created_at timestamptz default now()
);

-- Wiki articles
create table if not exists wiki_articles (
  id text primary key,
  title text not null,
  category text not null,
  content text default '',
  last_updated text not null,
  author_id text not null,
  created_at timestamptz default now()
);

-- Assets
create table if not exists assets (
  id text primary key,
  name text not null,
  type text not null,
  brand_id text not null,
  project_id text,
  url text not null,
  uploaded_by text not null,
  uploaded_at text not null,
  size text default '',
  created_at timestamptz default now()
);

-- Photoshoots
create table if not exists photoshoots (
  id text primary key,
  concept text not null,
  location text default '',
  date text not null,
  brand_id text not null,
  status text not null,
  team_members text[] default '{}',
  shot_count int default 0,
  created_at timestamptz default now()
);

-- Moderation items
create table if not exists moderation_items (
  id text primary key,
  type text not null,
  reason text not null,
  reported_by text not null,
  status text not null,
  date text not null,
  content text default '',
  created_at timestamptz default now()
);

-- Audit logs
create table if not exists audit_logs (
  id text primary key,
  user_id text not null,
  action text not null,
  target text not null,
  timestamp text not null,
  created_at timestamptz default now()
);

-- Enable RLS but allow all for now (anon key has access)
alter table os_users enable row level security;
alter table brands enable row level security;
alter table projects enable row level security;
alter table tasks enable row level security;
alter table campaigns enable row level security;
alter table ideas enable row level security;
alter table announcements enable row level security;
alter table wiki_articles enable row level security;
alter table assets enable row level security;
alter table photoshoots enable row level security;
alter table moderation_items enable row level security;
alter table audit_logs enable row level security;

-- Permissive policies (allow read/write for anon - tighten in production)
create policy "Allow all os_users" on os_users for all using (true) with check (true);
create policy "Allow all brands" on brands for all using (true) with check (true);
create policy "Allow all projects" on projects for all using (true) with check (true);
create policy "Allow all tasks" on tasks for all using (true) with check (true);
create policy "Allow all campaigns" on campaigns for all using (true) with check (true);
create policy "Allow all ideas" on ideas for all using (true) with check (true);
create policy "Allow all announcements" on announcements for all using (true) with check (true);
create policy "Allow all wiki_articles" on wiki_articles for all using (true) with check (true);
create policy "Allow all assets" on assets for all using (true) with check (true);
create policy "Allow all photoshoots" on photoshoots for all using (true) with check (true);
create policy "Allow all moderation_items" on moderation_items for all using (true) with check (true);
create policy "Allow all audit_logs" on audit_logs for all using (true) with check (true);
