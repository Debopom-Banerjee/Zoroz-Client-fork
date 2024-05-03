export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      category: {
        Row: {
          id: string
          name: string | null
          sub_categories: Json[] | null
        }
        Insert: {
          id?: string
          name?: string | null
          sub_categories?: Json[] | null
        }
        Update: {
          id?: string
          name?: string | null
          sub_categories?: Json[] | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          admin_approval: boolean | null
          created_at: string
          customer_id: string | null
          id: string
          product_id: string | null
          vendor_approval: boolean | null
          vendor_id: string | null
        }
        Insert: {
          admin_approval?: boolean | null
          created_at?: string
          customer_id?: string | null
          id?: string
          product_id?: string | null
          vendor_approval?: boolean | null
          vendor_id?: string | null
        }
        Update: {
          admin_approval?: boolean | null
          created_at?: string
          customer_id?: string | null
          id?: string
          product_id?: string | null
          vendor_approval?: boolean | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_orders_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          created_at: string
          id: string
          price: string | null
          product_id: string | null
          transaction_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          price?: string | null
          product_id?: string | null
          transaction_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          price?: string | null
          product_id?: string | null
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_payments_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          benefits: Json | null
          category_id: string | null
          description: string | null
          features: string[] | null
          id: string
          image_link: string | null
          mrp: string | null
          name: string | null
          price: string | null
          reviews: Json[] | null
          specifications: Json[] | null
          stock_count: number | null
          sub_category: string | null
          video_link: string | null
        }
        Insert: {
          benefits?: Json | null
          category_id?: string | null
          description?: string | null
          features?: string[] | null
          id?: string
          image_link?: string | null
          mrp?: string | null
          name?: string | null
          price?: string | null
          reviews?: Json[] | null
          specifications?: Json[] | null
          stock_count?: number | null
          sub_category?: string | null
          video_link?: string | null
        }
        Update: {
          benefits?: Json | null
          category_id?: string | null
          description?: string | null
          features?: string[] | null
          id?: string
          image_link?: string | null
          mrp?: string | null
          name?: string | null
          price?: string | null
          reviews?: Json[] | null
          specifications?: Json[] | null
          stock_count?: number | null
          sub_category?: string | null
          video_link?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          id: string
          role: string | null
        }
        Insert: {
          id: string
          role?: string | null
        }
        Update: {
          id?: string
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_roles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_roles_role_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "roles_defined"
            referencedColumns: ["role"]
          },
        ]
      }
      roles_defined: {
        Row: {
          role: string
        }
        Insert: {
          role: string
        }
        Update: {
          role?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          address: string | null
          cart: Json[] | null
          created_at: string
          email: string | null
          id: string
          name: string | null
          phone: string | null
        }
        Insert: {
          address?: string | null
          cart?: Json[] | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
        }
        Update: {
          address?: string | null
          cart?: Json[] | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
