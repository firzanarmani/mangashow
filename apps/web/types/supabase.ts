export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      Chapters: {
        Row: {
          chapter_no: number;
          created_at: string | null;
          id: number;
          series_id: number;
        };
        Insert: {
          chapter_no: number;
          created_at?: string | null;
          id?: number;
          series_id: number;
        };
        Update: {
          chapter_no?: number;
          created_at?: string | null;
          id?: number;
          series_id?: number;
        };
      };
      ChapterShows: {
        Row: {
          chapter_id: number | null;
          created_at: string | null;
          createdBy: string | null;
          id: number;
          series_id: number;
          shapes: Json | null;
          source: string | null;
          updated_at: string | null;
        };
        Insert: {
          chapter_id?: number | null;
          created_at?: string | null;
          createdBy?: string | null;
          id?: number;
          series_id: number;
          shapes?: Json | null;
          source?: string | null;
          updated_at?: string | null;
        };
        Update: {
          chapter_id?: number | null;
          created_at?: string | null;
          createdBy?: string | null;
          id?: number;
          series_id?: number;
          shapes?: Json | null;
          source?: string | null;
          updated_at?: string | null;
        };
      };
      Profiles: {
        Row: {
          avatar_url: string | null;
          full_name: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
          website: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          full_name?: string | null;
          id: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          full_name?: string | null;
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
      };
      Series: {
        Row: {
          author: string | null;
          created_at: string | null;
          id: number;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          author?: string | null;
          created_at?: string | null;
          id?: number;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          author?: string | null;
          created_at?: string | null;
          id?: number;
          title?: string;
          updated_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
