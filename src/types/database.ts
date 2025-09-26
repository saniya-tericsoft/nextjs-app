export interface Database {
  public: {
    Tables: {
      todos: {
        Row: {
          id: number
          text: string
          completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          text: string
          completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          text?: string
          completed?: boolean
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
