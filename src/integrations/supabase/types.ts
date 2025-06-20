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
      clientes: {
        Row: {
          cidade: string | null
          created_at: string | null
          email: string
          empresa: string
          id: string
          nome: string
          observacoes: string | null
          status: string | null
          telefone: string | null
          updated_at: string | null
          user_id: string
          valor_contrato: number | null
        }
        Insert: {
          cidade?: string | null
          created_at?: string | null
          email: string
          empresa: string
          id?: string
          nome: string
          observacoes?: string | null
          status?: string | null
          telefone?: string | null
          updated_at?: string | null
          user_id: string
          valor_contrato?: number | null
        }
        Update: {
          cidade?: string | null
          created_at?: string | null
          email?: string
          empresa?: string
          id?: string
          nome?: string
          observacoes?: string | null
          status?: string | null
          telefone?: string | null
          updated_at?: string | null
          user_id?: string
          valor_contrato?: number | null
        }
        Relationships: []
      }
      contratos: {
        Row: {
          cliente_id: string
          created_at: string | null
          data_inicio: string
          data_vencimento: string
          id: string
          observacoes: string | null
          status_pagamento: string | null
          tipo_servico: string
          updated_at: string | null
          user_id: string
          valor_mensal: number
        }
        Insert: {
          cliente_id: string
          created_at?: string | null
          data_inicio: string
          data_vencimento: string
          id?: string
          observacoes?: string | null
          status_pagamento?: string | null
          tipo_servico: string
          updated_at?: string | null
          user_id: string
          valor_mensal: number
        }
        Update: {
          cliente_id?: string
          created_at?: string | null
          data_inicio?: string
          data_vencimento?: string
          id?: string
          observacoes?: string | null
          status_pagamento?: string | null
          tipo_servico?: string
          updated_at?: string | null
          user_id?: string
          valor_mensal?: number
        }
        Relationships: [
          {
            foreignKeyName: "contratos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      estrategias: {
        Row: {
          cliente_id: string | null
          conteudo_completo: string | null
          created_at: string | null
          descricao: string
          id: string
          prompt_original: string | null
          status: string | null
          tipo: string
          titulo: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cliente_id?: string | null
          conteudo_completo?: string | null
          created_at?: string | null
          descricao: string
          id?: string
          prompt_original?: string | null
          status?: string | null
          tipo: string
          titulo: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cliente_id?: string | null
          conteudo_completo?: string | null
          created_at?: string | null
          descricao?: string
          id?: string
          prompt_original?: string | null
          status?: string | null
          tipo?: string
          titulo?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "estrategias_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      oportunidades: {
        Row: {
          cliente_id: string
          created_at: string | null
          data_fechamento: string | null
          descricao: string
          etapa: string | null
          id: string
          probabilidade: number | null
          updated_at: string | null
          user_id: string
          valor: number
        }
        Insert: {
          cliente_id: string
          created_at?: string | null
          data_fechamento?: string | null
          descricao: string
          etapa?: string | null
          id?: string
          probabilidade?: number | null
          updated_at?: string | null
          user_id: string
          valor: number
        }
        Update: {
          cliente_id?: string
          created_at?: string | null
          data_fechamento?: string | null
          descricao?: string
          etapa?: string | null
          id?: string
          probabilidade?: number | null
          updated_at?: string | null
          user_id?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "oportunidades_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          empresa: string | null
          id: string
          nome: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          empresa?: string | null
          id: string
          nome?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          empresa?: string | null
          id?: string
          nome?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      tarefas: {
        Row: {
          cliente_id: string
          created_at: string | null
          data_prazo: string
          descricao: string | null
          id: string
          prioridade: string | null
          responsavel: string
          status: string | null
          titulo: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cliente_id: string
          created_at?: string | null
          data_prazo: string
          descricao?: string | null
          id?: string
          prioridade?: string | null
          responsavel: string
          status?: string | null
          titulo: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cliente_id?: string
          created_at?: string | null
          data_prazo?: string
          descricao?: string | null
          id?: string
          prioridade?: string | null
          responsavel?: string
          status?: string | null
          titulo?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tarefas_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
