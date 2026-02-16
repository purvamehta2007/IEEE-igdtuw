export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          year: number | null
          branch: string | null
          phone: string | null
          skills: string[]
          interests: string[]
          total_points: number
          level: number
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          year?: number | null
          branch?: string | null
          phone?: string | null
          skills?: string[]
          interests?: string[]
          total_points?: number
          level?: number
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          year?: number | null
          branch?: string | null
          phone?: string | null
          skills?: string[]
          interests?: string[]
          total_points?: number
          level?: number
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          category: string
          event_date: string
          registration_deadline: string | null
          location: string | null
          image_url: string | null
          registration_link: string | null
          max_participants: number | null
          current_participants: number
          status: string
          speakers: Json
          tags: string[]
          is_featured: boolean
          created_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          category: string
          event_date: string
          registration_deadline?: string | null
          location?: string | null
          image_url?: string | null
          registration_link?: string | null
          max_participants?: number | null
          current_participants?: number
          status?: string
          speakers?: Json
          tags?: string[]
          is_featured?: boolean
          created_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          category?: string
          event_date?: string
          registration_deadline?: string | null
          location?: string | null
          image_url?: string | null
          registration_link?: string | null
          max_participants?: number | null
          current_participants?: number
          status?: string
          speakers?: Json
          tags?: string[]
          is_featured?: boolean
          created_at?: string
          created_by?: string | null
        }
      }
      event_registrations: {
        Row: {
          id: string
          event_id: string
          user_id: string
          registration_date: string
          attendance_status: string
          feedback_submitted: boolean
        }
        Insert: {
          id?: string
          event_id: string
          user_id: string
          registration_date?: string
          attendance_status?: string
          feedback_submitted?: boolean
        }
        Update: {
          id?: string
          event_id?: string
          user_id?: string
          registration_date?: string
          attendance_status?: string
          feedback_submitted?: boolean
        }
      }
      bookmarks: {
        Row: {
          id: string
          user_id: string
          event_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          event_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          event_id?: string
          created_at?: string
        }
      }
      recruitment_applications: {
        Row: {
          id: string
          user_id: string
          role: string
          domain: string
          application_data: Json
          status: string
          score: number
          submitted_at: string
          reviewed_at: string | null
          reviewed_by: string | null
        }
        Insert: {
          id?: string
          user_id: string
          role: string
          domain: string
          application_data?: Json
          status?: string
          score?: number
          submitted_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          role?: string
          domain?: string
          application_data?: Json
          status?: string
          score?: number
          submitted_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
        }
      }
      feedback: {
        Row: {
          id: string
          event_id: string
          user_id: string
          rating: number
          emoji_reaction: string | null
          comment: string | null
          suggestions: string | null
          is_anonymous: boolean
          sentiment_score: number | null
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          user_id: string
          rating: number
          emoji_reaction?: string | null
          comment?: string | null
          suggestions?: string | null
          is_anonymous?: boolean
          sentiment_score?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          user_id?: string
          rating?: number
          emoji_reaction?: string | null
          comment?: string | null
          suggestions?: string | null
          is_anonymous?: boolean
          sentiment_score?: number | null
          created_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          user_id: string
          achievement_type: string
          achievement_name: string
          description: string | null
          icon: string | null
          points_earned: number
          earned_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_type: string
          achievement_name: string
          description?: string | null
          icon?: string | null
          points_earned?: number
          earned_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          achievement_type?: string
          achievement_name?: string
          description?: string | null
          icon?: string | null
          points_earned?: number
          earned_at?: string
        }
      }
      past_events_gallery: {
        Row: {
          id: string
          event_id: string
          images: string[]
          highlights: string[]
          impact_stats: Json
          testimonials: Json
        }
        Insert: {
          id?: string
          event_id: string
          images?: string[]
          highlights?: string[]
          impact_stats?: Json
          testimonials?: Json
        }
        Update: {
          id?: string
          event_id?: string
          images?: string[]
          highlights?: string[]
          impact_stats?: Json
          testimonials?: Json
        }
      }
      social_links: {
        Row: {
          id: string
          platform: string
          url: string
          preview_title: string | null
          preview_description: string | null
          icon_color: string | null
          is_active: boolean
          display_order: number
        }
        Insert: {
          id?: string
          platform: string
          url: string
          preview_title?: string | null
          preview_description?: string | null
          icon_color?: string | null
          is_active?: boolean
          display_order?: number
        }
        Update: {
          id?: string
          platform?: string
          url?: string
          preview_title?: string | null
          preview_description?: string | null
          icon_color?: string | null
          is_active?: boolean
          display_order?: number
        }
      }
    }
  }
}
