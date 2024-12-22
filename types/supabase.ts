export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined; }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    };
    Views: {
      [_ in never]: never
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never
    };
    CompositeTypes: {
      [_ in never]: never
    };
  };
  public: {
    Tables: {
      board_history: {
        Row: {
          board_id: string;
          created_at: string;
          created_by: string;
          id: string;
          tldraw_document: Json;
          tldraw_session: Json;
          version: number;
        };
        Insert: {
          board_id: string;
          created_at?: string;
          created_by: string;
          id?: string;
          tldraw_document: Json;
          tldraw_session: Json;
          version: number;
        };
        Update: {
          board_id?: string;
          created_at?: string;
          created_by?: string;
          id?: string;
          tldraw_document?: Json;
          tldraw_session?: Json;
          version?: number;
        };
        Relationships: [
          {
            foreignKeyName: "board_history_board_id_fkey";
            columns: ["board_id"];
            isOneToOne: false;
            referencedRelation: "boards";
            referencedColumns: ["id"];
          },
        ];
      };
      board_permissions: {
        Row: {
          board_id: string;
          created_at: string;
          created_by: string;
          id: string;
          permission_level: string;
          user_id: string;
        };
        Insert: {
          board_id: string;
          created_at?: string;
          created_by: string;
          id?: string;
          permission_level: string;
          user_id: string;
        };
        Update: {
          board_id?: string;
          created_at?: string;
          created_by?: string;
          id?: string;
          permission_level?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "board_permissions_board_id_fkey";
            columns: ["board_id"];
            isOneToOne: false;
            referencedRelation: "boards";
            referencedColumns: ["id"];
          },
        ];
      };
      board_tags: {
        Row: {
          board_id: string;
          created_at: string;
          id: string;
          tag_name: string;
        };
        Insert: {
          board_id: string;
          created_at?: string;
          id?: string;
          tag_name: string;
        };
        Update: {
          board_id?: string;
          created_at?: string;
          id?: string;
          tag_name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "board_tags_board_id_fkey";
            columns: ["board_id"];
            isOneToOne: false;
            referencedRelation: "boards";
            referencedColumns: ["id"];
          },
        ];
      };
      boards: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          description: string | null;
          folder_id: string | null;
          id: string;
          is_favorite: boolean;
          is_public: boolean;
          last_edited_by: string | null;
          name: string;
          thumbnail_url: string | null;
          tldraw_document: Json | null;
          tldraw_session: Json | null;
          updated_at: string;
          user_id: string;
          version: number;
          view_count: number;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          folder_id?: string | null;
          id?: string;
          is_favorite?: boolean;
          is_public?: boolean;
          last_edited_by?: string | null;
          name: string;
          thumbnail_url?: string | null;
          tldraw_document?: Json | null;
          tldraw_session?: Json | null;
          updated_at?: string;
          user_id: string;
          version?: number;
          view_count?: number;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          folder_id?: string | null;
          id?: string;
          is_favorite?: boolean;
          is_public?: boolean;
          last_edited_by?: string | null;
          name?: string;
          thumbnail_url?: string | null;
          tldraw_document?: Json | null;
          tldraw_session?: Json | null;
          updated_at?: string;
          user_id?: string;
          version?: number;
          view_count?: number;
        };
        Relationships: [
          {
            foreignKeyName: "boards_folder_id_fkey";
            columns: ["folder_id"];
            isOneToOne: false;
            referencedRelation: "folders";
            referencedColumns: ["id"];
          },
        ];
      };
      folders: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          description: string | null;
          id: string;
          name: string;
          parent_folder_id: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          id?: string;
          name: string;
          parent_folder_id?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          id?: string;
          name?: string;
          parent_folder_id?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "folders_parent_folder_id_fkey";
            columns: ["parent_folder_id"];
            isOneToOne: false;
            referencedRelation: "folders";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never
    };
    Functions: {
      [_ in never]: never
    };
    Enums: {
      [_ in never]: never
    };
    CompositeTypes: {
      [_ in never]: never
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
  | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
  | { schema: keyof Database; },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database; }
  ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
    Database[PublicTableNameOrOptions["schema"]]["Views"])
  : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database; }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
    Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
  ? R
  : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
    PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
    PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
  ? R
  : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
  | keyof PublicSchema["Tables"]
  | { schema: keyof Database; },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database; }
  ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database; }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I;
  }
  ? I
  : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
    Insert: infer I;
  }
  ? I
  : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
  | keyof PublicSchema["Tables"]
  | { schema: keyof Database; },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database; }
  ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database; }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U;
  }
  ? U
  : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
    Update: infer U;
  }
  ? U
  : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
  | keyof PublicSchema["Enums"]
  | { schema: keyof Database; },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database; }
  ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
  : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database; }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
  | keyof PublicSchema["CompositeTypes"]
  | { schema: keyof Database; },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
  ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
  : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database; }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
  ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export type Boards = Tables<"boards">;
