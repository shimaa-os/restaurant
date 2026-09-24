export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          description: string | null
          icon_name: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon_name?: string | null
          id: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon_name?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      menu_items: {
        Row: {
          allergens: string[] | null
          calories: number | null
          category_id: string | null
          created_at: string
          customization_options: Json | null
          description: string
          id: string
          image: string
          ingredients: string[] | null
          is_available: boolean | null
          is_chef_special: boolean | null
          is_gluten_free: boolean | null
          is_vegetarian: boolean | null
          name: string
          preparation_time: string | null
          price: number
          rating: number | null
          review_count: number | null
          short_description: string
          wine_pairing: string | null
        }
        Insert: {
          allergens?: string[] | null
          calories?: number | null
          category_id?: string | null
          created_at?: string
          customization_options?: Json | null
          description: string
          id: string
          image: string
          ingredients?: string[] | null
          is_available?: boolean | null
          is_chef_special?: boolean | null
          is_gluten_free?: boolean | null
          is_vegetarian?: boolean | null
          name: string
          preparation_time?: string | null
          price: number
          rating?: number | null
          review_count?: number | null
          short_description: string
          wine_pairing?: string | null
        }
        Update: {
          allergens?: string[] | null
          calories?: number | null
          category_id?: string | null
          created_at?: string
          customization_options?: Json | null
          description?: string
          id?: string
          image?: string
          ingredients?: string[] | null
          is_available?: boolean | null
          is_chef_special?: boolean | null
          is_gluten_free?: boolean | null
          is_vegetarian?: boolean | null
          name?: string
          preparation_time?: string | null
          price?: number
          rating?: number | null
          review_count?: number | null
          short_description?: string
          wine_pairing?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "menu_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          customer_name: string
          customer_phone: string
          delivery_address: string | null
          id: string
          items: Json
          order_number: string
          order_type: string | null
          status: string | null
          table_number: string | null
          total_amount: number
        }
        Insert: {
          created_at?: string
          customer_name: string
          customer_phone: string
          delivery_address?: string | null
          id?: string
          items?: Json
          order_number: string
          order_type?: string | null
          status?: string | null
          table_number?: string | null
          total_amount: number
        }
        Update: {
          created_at?: string
          customer_name?: string
          customer_phone?: string
          delivery_address?: string | null
          id?: string
          items?: Json
          order_number?: string
          order_type?: string | null
          status?: string | null
          table_number?: string | null
          total_amount?: number
        }
        Relationships: []
      }
      reservations: {
        Row: {
          booking_ref: string
          created_at: string
          date: string
          email: string
          full_name: string
          guests: number
          id: string
          occasion: string | null
          phone: string
          seating_preference: string | null
          special_requests: string | null
          status: string | null
          time: string
        }
        Insert: {
          booking_ref: string
          created_at?: string
          date: string
          email: string
          full_name: string
          guests?: number
          id?: string
          occasion?: string | null
          phone: string
          seating_preference?: string | null
          special_requests?: string | null
          status?: string | null
          time: string
        }
        Update: {
          booking_ref?: string
          created_at?: string
          date?: string
          email?: string
          full_name?: string
          guests?: number
          id?: string
          occasion?: string | null
          phone?: string
          seating_preference?: string | null
          special_requests?: string | null
          status?: string | null
          time?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          admin_reply: string | null
          author: string
          avatar: string | null
          comment: string
          created_at: string
          dish_recommended: string | null
          id: string
          rating: number
          status: string | null
        }
        Insert: {
          admin_reply?: string | null
          author: string
          avatar?: string | null
          comment: string
          created_at?: string
          dish_recommended?: string | null
          id?: string
          rating?: number
          status?: string | null
        }
        Update: {
          admin_reply?: string | null
          author?: string
          avatar?: string | null
          comment?: string
          created_at?: string
          dish_recommended?: string | null
          id?: string
          rating?: number
          status?: string | null
        }
        Relationships: []
      }
    }
  }
}
