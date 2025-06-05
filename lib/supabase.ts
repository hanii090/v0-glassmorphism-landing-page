import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export const createClient = () => createClientComponentClient()

export const createServerClient = () => createServerComponentClient({ cookies })

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: "student" | "admin"
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: "student" | "admin"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: "student" | "admin"
          created_at?: string
          updated_at?: string
        }
      }
      submissions: {
        Row: {
          id: string
          user_id: string
          name: string
          email: string
          deadline: string
          subject: string
          description: string
          assignment_file_url: string | null
          payment_proof_url: string | null
          solution_file_url: string | null
          status: "pending" | "processing" | "delivered" | "rejected"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          email: string
          deadline: string
          subject: string
          description: string
          assignment_file_url?: string | null
          payment_proof_url?: string | null
          solution_file_url?: string | null
          status?: "pending" | "processing" | "delivered" | "rejected"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          email?: string
          deadline?: string
          subject?: string
          description?: string
          assignment_file_url?: string | null
          payment_proof_url?: string | null
          solution_file_url?: string | null
          status?: "pending" | "processing" | "delivered" | "rejected"
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          submission_id: string
          user_id: string
          student_name: string
          rating: number
          review: string | null
          created_at: string
        }
        Insert: {
          id?: string
          submission_id: string
          user_id: string
          student_name: string
          rating: number
          review?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          submission_id?: string
          user_id?: string
          student_name?: string
          rating?: number
          review?: string | null
          created_at?: string
        }
      }
    }
  }
}
