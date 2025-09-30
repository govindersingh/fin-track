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
          full_name: string
          avatar_url: string | null
          plan: 'free' | 'paid'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name: string
          avatar_url?: string | null
          plan?: 'free' | 'paid'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          avatar_url?: string | null
          plan?: 'free' | 'paid'
          created_at?: string
          updated_at?: string
        }
      }
      accounts: {
        Row: {
          id: string
          user_id: string
          bank_name: string
          branch: string
          account_number: string
          ifsc_code: string
          upi_id: string
          balance: number
          account_type: 'savings' | 'current'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          bank_name: string
          branch: string
          account_number: string
          ifsc_code: string
          upi_id: string
          balance?: number
          account_type: 'savings' | 'current'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          bank_name?: string
          branch?: string
          account_number?: string
          ifsc_code?: string
          upi_id?: string
          balance?: number
          account_type?: 'savings' | 'current'
          created_at?: string
          updated_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          account_id: string
          date: string
          description: string
          amount: number
          type: 'credit' | 'debit'
          category: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          account_id: string
          date: string
          description: string
          amount: number
          type: 'credit' | 'debit'
          category: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          account_id?: string
          date?: string
          description?: string
          amount?: number
          type?: 'credit' | 'debit'
          category?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}