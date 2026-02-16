/*
  # IEEE IGDTUW Application Database Schema

  ## Overview
  Complete database schema for a cyberpunk-themed IEEE student engagement platform
  with event management, recruitment, gamification, and social features.

  ## New Tables

  ### 1. profiles
  - `id` (uuid, primary key, references auth.users)
  - `email` (text, unique, not null)
  - `full_name` (text)
  - `year` (integer) - Academic year
  - `branch` (text) - Branch of study
  - `phone` (text)
  - `skills` (text array) - User skills for matching
  - `interests` (text array) - Interest categories
  - `total_points` (integer) - Gamification points
  - `level` (integer) - User level based on points
  - `avatar_url` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. events
  - `id` (uuid, primary key)
  - `title` (text, not null)
  - `description` (text)
  - `category` (text) - AI, Robotics, Coding, Workshops, Hackathons
  - `event_date` (timestamptz, not null)
  - `registration_deadline` (timestamptz)
  - `location` (text)
  - `image_url` (text)
  - `registration_link` (text) - Google Forms link
  - `max_participants` (integer)
  - `current_participants` (integer)
  - `status` (text) - upcoming, ongoing, completed
  - `speakers` (jsonb) - Array of speaker info
  - `tags` (text array)
  - `is_featured` (boolean)
  - `created_at` (timestamptz)
  - `created_by` (uuid, references profiles)

  ### 3. event_registrations
  - `id` (uuid, primary key)
  - `event_id` (uuid, references events)
  - `user_id` (uuid, references profiles)
  - `registration_date` (timestamptz)
  - `attendance_status` (text) - registered, attended, missed
  - `feedback_submitted` (boolean)

  ### 4. bookmarks
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `event_id` (uuid, references events)
  - `created_at` (timestamptz)

  ### 5. recruitment_applications
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `role` (text) - core_team, associate, coordinator
  - `domain` (text) - technical, design, content, management
  - `application_data` (jsonb) - Form responses
  - `status` (text) - pending, under_review, accepted, rejected
  - `score` (integer) - Gamified scoring
  - `submitted_at` (timestamptz)
  - `reviewed_at` (timestamptz)
  - `reviewed_by` (uuid, references profiles)

  ### 6. feedback
  - `id` (uuid, primary key)
  - `event_id` (uuid, references events)
  - `user_id` (uuid, references profiles)
  - `rating` (integer) - 1-5 stars
  - `emoji_reaction` (text)
  - `comment` (text)
  - `suggestions` (text)
  - `is_anonymous` (boolean)
  - `sentiment_score` (numeric) - AI sentiment analysis
  - `created_at` (timestamptz)

  ### 7. achievements
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `achievement_type` (text) - event_attendance, feedback, recruitment, etc.
  - `achievement_name` (text)
  - `description` (text)
  - `icon` (text)
  - `points_earned` (integer)
  - `earned_at` (timestamptz)

  ### 8. past_events_gallery
  - `id` (uuid, primary key)
  - `event_id` (uuid, references events)
  - `images` (text array)
  - `highlights` (text array)
  - `impact_stats` (jsonb) - Participation count, satisfaction, etc.
  - `testimonials` (jsonb)

  ### 9. social_links
  - `id` (uuid, primary key)
  - `platform` (text) - linkedin, instagram, twitter, website
  - `url` (text, not null)
  - `preview_title` (text)
  - `preview_description` (text)
  - `icon_color` (text)
  - `is_active` (boolean)
  - `display_order` (integer)

  ## Security
  - Enable RLS on all tables
  - Add policies for authenticated users
  - Restrict admin operations
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  year integer,
  branch text,
  phone text,
  skills text[] DEFAULT '{}',
  interests text[] DEFAULT '{}',
  total_points integer DEFAULT 0,
  level integer DEFAULT 1,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL,
  event_date timestamptz NOT NULL,
  registration_deadline timestamptz,
  location text,
  image_url text,
  registration_link text,
  max_participants integer,
  current_participants integer DEFAULT 0,
  status text DEFAULT 'upcoming',
  speakers jsonb DEFAULT '[]',
  tags text[] DEFAULT '{}',
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES profiles(id)
);

-- Create event_registrations table
CREATE TABLE IF NOT EXISTS event_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  registration_date timestamptz DEFAULT now(),
  attendance_status text DEFAULT 'registered',
  feedback_submitted boolean DEFAULT false,
  UNIQUE(event_id, user_id)
);

-- Create bookmarks table
CREATE TABLE IF NOT EXISTS bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, event_id)
);

-- Create recruitment_applications table
CREATE TABLE IF NOT EXISTS recruitment_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  role text NOT NULL,
  domain text NOT NULL,
  application_data jsonb DEFAULT '{}',
  status text DEFAULT 'pending',
  score integer DEFAULT 0,
  submitted_at timestamptz DEFAULT now(),
  reviewed_at timestamptz,
  reviewed_by uuid REFERENCES profiles(id)
);

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  emoji_reaction text,
  comment text,
  suggestions text,
  is_anonymous boolean DEFAULT false,
  sentiment_score numeric,
  created_at timestamptz DEFAULT now()
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_type text NOT NULL,
  achievement_name text NOT NULL,
  description text,
  icon text,
  points_earned integer DEFAULT 0,
  earned_at timestamptz DEFAULT now()
);

-- Create past_events_gallery table
CREATE TABLE IF NOT EXISTS past_events_gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  images text[] DEFAULT '{}',
  highlights text[] DEFAULT '{}',
  impact_stats jsonb DEFAULT '{}',
  testimonials jsonb DEFAULT '[]'
);

-- Create social_links table
CREATE TABLE IF NOT EXISTS social_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL,
  url text NOT NULL,
  preview_title text,
  preview_description text,
  icon_color text,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE recruitment_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE past_events_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Events policies
CREATE POLICY "Anyone can view events"
  ON events FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create events"
  ON events FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Event creators can update their events"
  ON events FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Event registrations policies
CREATE POLICY "Users can view their own registrations"
  ON event_registrations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own registrations"
  ON event_registrations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own registrations"
  ON event_registrations FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Bookmarks policies
CREATE POLICY "Users can view own bookmarks"
  ON bookmarks FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bookmarks"
  ON bookmarks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookmarks"
  ON bookmarks FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Recruitment applications policies
CREATE POLICY "Users can view own applications"
  ON recruitment_applications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own applications"
  ON recruitment_applications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Feedback policies
CREATE POLICY "Users can view all feedback"
  ON feedback FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create own feedback"
  ON feedback FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Achievements policies
CREATE POLICY "Users can view own achievements"
  ON achievements FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view all achievements for leaderboard"
  ON achievements FOR SELECT
  TO authenticated
  USING (true);

-- Past events gallery policies
CREATE POLICY "Anyone can view past events gallery"
  ON past_events_gallery FOR SELECT
  TO authenticated
  USING (true);

-- Social links policies
CREATE POLICY "Anyone can view active social links"
  ON social_links FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_event_registrations_user ON event_registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_event_registrations_event ON event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_feedback_event ON feedback(event_id);
CREATE INDEX IF NOT EXISTS idx_achievements_user ON achievements(user_id);

-- Insert default social links
INSERT INTO social_links (platform, url, preview_title, preview_description, icon_color, display_order)
VALUES 
  ('linkedin', 'https://www.linkedin.com/company/ieee-igdtuw', 'IEEE IGDTUW on LinkedIn', 'Connect with us professionally', '#0A66C2', 1),
  ('instagram', 'https://www.instagram.com/ieeeigdtuw', 'IEEE IGDTUW on Instagram', 'Follow our journey', '#E4405F', 2),
  ('website', 'https://ieeeigdtuw.com', 'IEEE IGDTUW Official Website', 'Explore our world', '#00D9FF', 3),
  ('twitter', 'https://twitter.com/ieeeigdtuw', 'IEEE IGDTUW on Twitter', 'Stay updated', '#1DA1F2', 4)
ON CONFLICT DO NOTHING;