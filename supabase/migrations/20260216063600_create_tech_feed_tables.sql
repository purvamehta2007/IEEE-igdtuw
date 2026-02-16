/*
  # Tech Feed System Tables

  ## Overview
  Database schema for IEEE IGDTUW Daily Tech Feed featuring trending stories,
  AI/tech categories, research, developer content, and opportunities.

  ## New Tables

  ### 1. tech_feed_articles
  - `id` (uuid, primary key)
  - `title` (text, not null)
  - `summary` (text)
  - `full_content` (text)
  - `category` (text) - trending, ai, research, developer, ieee_updates, opportunities
  - `subcategory` (text) - AI, Cybersecurity, Robotics, etc.
  - `image_url` (text)
  - `source_url` (text)
  - `source_name` (text)
  - `tags` (text array)
  - `is_trending` (boolean)
  - `view_count` (integer)
  - `ai_tldr` (text) - AI-generated summary
  - `published_date` (timestamptz)
  - `created_at` (timestamptz)

  ### 2. tech_feed_bookmarks
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `article_id` (uuid, references tech_feed_articles)
  - `bookmarked_at` (timestamptz)
  - Unique constraint on (user_id, article_id)

  ### 3. tech_feed_views
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `article_id` (uuid, references tech_feed_articles)
  - `viewed_at` (timestamptz)

  ### 4. coding_challenges
  - `id` (uuid, primary key)
  - `title` (text, not null)
  - `description` (text)
  - `difficulty` (text) - easy, medium, hard
  - `language` (text array)
  - `starter_code` (text)
  - `solution` (text)
  - `test_cases` (jsonb)
  - `published_date` (timestamptz)
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Add policies for authenticated users
*/

-- Create tech_feed_articles table
CREATE TABLE IF NOT EXISTS tech_feed_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  summary text,
  full_content text,
  category text NOT NULL,
  subcategory text,
  image_url text,
  source_url text,
  source_name text,
  tags text[] DEFAULT '{}',
  is_trending boolean DEFAULT false,
  view_count integer DEFAULT 0,
  ai_tldr text,
  published_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create tech_feed_bookmarks table
CREATE TABLE IF NOT EXISTS tech_feed_bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  article_id uuid REFERENCES tech_feed_articles(id) ON DELETE CASCADE,
  bookmarked_at timestamptz DEFAULT now(),
  UNIQUE(user_id, article_id)
);

-- Create tech_feed_views table
CREATE TABLE IF NOT EXISTS tech_feed_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  article_id uuid REFERENCES tech_feed_articles(id) ON DELETE CASCADE,
  viewed_at timestamptz DEFAULT now()
);

-- Create coding_challenges table
CREATE TABLE IF NOT EXISTS coding_challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  difficulty text NOT NULL,
  language text[] DEFAULT '{}',
  starter_code text,
  solution text,
  test_cases jsonb DEFAULT '{}',
  published_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE tech_feed_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_feed_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_feed_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE coding_challenges ENABLE ROW LEVEL SECURITY;

-- tech_feed_articles policies
CREATE POLICY "Anyone can view articles"
  ON tech_feed_articles FOR SELECT
  TO authenticated
  USING (true);

-- tech_feed_bookmarks policies
CREATE POLICY "Users can view own bookmarks"
  ON tech_feed_bookmarks FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bookmarks"
  ON tech_feed_bookmarks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookmarks"
  ON tech_feed_bookmarks FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- tech_feed_views policies
CREATE POLICY "Users can create own views"
  ON tech_feed_views FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own history"
  ON tech_feed_views FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- coding_challenges policies
CREATE POLICY "Anyone can view challenges"
  ON coding_challenges FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_tech_feed_category ON tech_feed_articles(category);
CREATE INDEX IF NOT EXISTS idx_tech_feed_subcategory ON tech_feed_articles(subcategory);
CREATE INDEX IF NOT EXISTS idx_tech_feed_trending ON tech_feed_articles(is_trending);
CREATE INDEX IF NOT EXISTS idx_tech_feed_published ON tech_feed_articles(published_date);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON tech_feed_bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_views_user ON tech_feed_views(user_id);
CREATE INDEX IF NOT EXISTS idx_challenges_difficulty ON coding_challenges(difficulty);

-- Insert sample tech feed articles
INSERT INTO tech_feed_articles (title, summary, category, subcategory, image_url, source_name, tags, is_trending, ai_tldr, published_date)
VALUES
  (
    'Breakthrough in Quantum Computing',
    'Researchers have achieved a major milestone in quantum error correction, moving us closer to practical quantum computers.',
    'ai',
    'Quantum Computing',
    'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=600',
    'Tech Daily',
    ARRAY['quantum', 'computing', 'breakthrough'],
    true,
    'Scientists made significant progress in quantum error correction technology.',
    now() - interval '1 day'
  ),
  (
    'AI Transforms Healthcare Diagnostics',
    'New AI models show 99% accuracy in detecting early-stage diseases, revolutionizing medical diagnosis.',
    'ai',
    'Artificial Intelligence',
    'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=600',
    'Science Weekly',
    ARRAY['ai', 'healthcare', 'ml', 'medical'],
    true,
    'AI models now achieve near-perfect accuracy in disease detection.',
    now() - interval '2 hours'
  ),
  (
    'Cybersecurity Alert: New Malware Variant Detected',
    'Security experts warn about a new sophisticated malware targeting financial institutions.',
    'ai',
    'Cybersecurity',
    'https://images.pexels.com/photos/279810/pexels-photo-279810.jpeg?auto=compress&cs=tinysrgb&w=600',
    'Cyber News',
    ARRAY['cybersecurity', 'malware', 'security'],
    true,
    'New malware variant poses significant threat to financial sector.',
    now() - interval '4 hours'
  ),
  (
    'Robot Arm Completes Complex Surgery',
    'AI-powered robotic arm successfully performs a delicate cardiac surgery with improved precision.',
    'ai',
    'Robotics',
    'https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg?auto=compress&cs=tinysrgb&w=600',
    'Innovation Hub',
    ARRAY['robotics', 'ai', 'surgery', 'medical'],
    false,
    'Robotic surgery systems demonstrate superior precision in cardiac procedures.',
    now() - interval '8 hours'
  ),
  (
    'IEEE Releases New Engineering Standards',
    'IEEE IGDTUW announces updated standards for software development and best practices.',
    'ieee_updates',
    'Standards',
    'https://images.pexels.com/photos/3594615/pexels-photo-3594615.jpeg?auto=compress&cs=tinysrgb&w=600',
    'IEEE Official',
    ARRAY['ieee', 'standards', 'engineering'],
    false,
    'IEEE releases updated engineering standards for 2024.',
    now() - interval '12 hours'
  ),
  (
    'Student Wins National Hackathon',
    'IGDTUW student team wins prestigious national hackathon with innovative IoT solution.',
    'ieee_updates',
    'Student Achievement',
    'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600',
    'IGDTUW News',
    ARRAY['hackathon', 'students', 'achievement'],
    true,
    'Local student team achieves victory in national hackathon competition.',
    now() - interval '6 hours'
  );

-- Insert sample coding challenges
INSERT INTO coding_challenges (title, description, difficulty, language, published_date)
VALUES
  (
    'Reverse a Linked List',
    'Write a function to reverse a singly linked list. You may not modify the values in the list, only changing the next pointers can be changed.',
    'medium',
    ARRAY['Python', 'Java', 'C++'],
    now()
  ),
  (
    'Valid Parentheses',
    'Given a string s containing just the characters ''('', '')'', ''{'' and ''}'', ''['' and '']'', determine if the input string is valid.',
    'easy',
    ARRAY['Python', 'JavaScript', 'Java'],
    now()
  ),
  (
    'Longest Palindromic Substring',
    'Given a string s, return the longest palindromic substring in s.',
    'hard',
    ARRAY['Python', 'Java', 'C++'],
    now() - interval '1 day'
  );
