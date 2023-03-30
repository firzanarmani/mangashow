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
      chapters: {
        Row: {
          chapter_no: number | null;
          created_at: string | null;
          createdBy: string | null;
          id: number;
          series_id: number;
          shapes: Json | null;
          source: string | null;
          updated_at: string | null;
        };
        Insert: {
          chapter_no?: number | null;
          created_at?: string | null;
          createdBy?: string | null;
          id?: number;
          series_id: number;
          shapes?: Json | null;
          source?: string | null;
          updated_at?: string | null;
        };
        Update: {
          chapter_no?: number | null;
          created_at?: string | null;
          createdBy?: string | null;
          id?: number;
          series_id?: number;
          shapes?: Json | null;
          source?: string | null;
          updated_at?: string | null;
        };
      };
      profiles: {
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
      series: {
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
