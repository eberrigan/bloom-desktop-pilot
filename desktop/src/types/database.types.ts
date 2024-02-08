export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      accessions: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      assemblies: {
        Row: {
          accession_name: string | null
          archive_link: string
          external_link: string | null
          external_version: string | null
          id: number
          origin: string | null
          species_id: number | null
          version: number | null
        }
        Insert: {
          accession_name?: string | null
          archive_link: string
          external_link?: string | null
          external_version?: string | null
          id?: number
          origin?: string | null
          species_id?: number | null
          version?: number | null
        }
        Update: {
          accession_name?: string | null
          archive_link?: string
          external_link?: string | null
          external_version?: string | null
          id?: number
          origin?: string | null
          species_id?: number | null
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "assemblies_species_id_fkey"
            columns: ["species_id"]
            referencedRelation: "species"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assemblies_species_id_fkey"
            columns: ["species_id"]
            referencedRelation: "cyl_plants_extended"
            referencedColumns: ["species_id"]
          }
        ]
      }
      cyl_experiments: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
          species_id: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
          species_id?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          species_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cyl_experiments_species_id_fkey"
            columns: ["species_id"]
            referencedRelation: "species"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cyl_experiments_species_id_fkey"
            columns: ["species_id"]
            referencedRelation: "cyl_plants_extended"
            referencedColumns: ["species_id"]
          }
        ]
      }
      cyl_image_traits: {
        Row: {
          id: number
          image_id: number
          name: string
          value: number | null
        }
        Insert: {
          id?: number
          image_id: number
          name: string
          value?: number | null
        }
        Update: {
          id?: number
          image_id?: number
          name?: string
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cyl_image_traits_image_id_fkey"
            columns: ["image_id"]
            referencedRelation: "cyl_images"
            referencedColumns: ["id"]
          }
        ]
      }
      cyl_images: {
        Row: {
          date_scanned: string | null
          frame_number: number | null
          id: number
          object_path: string | null
          scan_id: number | null
          status: string | null
          uploaded_at: string | null
        }
        Insert: {
          date_scanned?: string | null
          frame_number?: number | null
          id?: number
          object_path?: string | null
          scan_id?: number | null
          status?: string | null
          uploaded_at?: string | null
        }
        Update: {
          date_scanned?: string | null
          frame_number?: number | null
          id?: number
          object_path?: string | null
          scan_id?: number | null
          status?: string | null
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cyl_images_scan_id_fkey"
            columns: ["scan_id"]
            referencedRelation: "cyl_scans"
            referencedColumns: ["id"]
          }
        ]
      }
      cyl_plants: {
        Row: {
          accession_id: number | null
          created_at: string
          germ_day: number | null
          germ_day_color: string | null
          id: number
          qr_code: string | null
          wave_id: number | null
        }
        Insert: {
          accession_id?: number | null
          created_at?: string
          germ_day?: number | null
          germ_day_color?: string | null
          id?: number
          qr_code?: string | null
          wave_id?: number | null
        }
        Update: {
          accession_id?: number | null
          created_at?: string
          germ_day?: number | null
          germ_day_color?: string | null
          id?: number
          qr_code?: string | null
          wave_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cyl_plants_accession_id_fkey"
            columns: ["accession_id"]
            referencedRelation: "accessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cyl_plants_wave_id_fkey"
            columns: ["wave_id"]
            referencedRelation: "cyl_waves"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cyl_plants_wave_id_fkey"
            columns: ["wave_id"]
            referencedRelation: "cyl_plants_extended"
            referencedColumns: ["wave_id"]
          }
        ]
      }
      cyl_scan_traits: {
        Row: {
          id: number
          name: string
          scan_id: number
          value: number | null
        }
        Insert: {
          id?: number
          name: string
          scan_id: number
          value?: number | null
        }
        Update: {
          id?: number
          name?: string
          scan_id?: number
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cyl_scan_traits_scan_id_fkey"
            columns: ["scan_id"]
            referencedRelation: "cyl_scans"
            referencedColumns: ["id"]
          }
        ]
      }
      cyl_scanners: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      cyl_scans: {
        Row: {
          date_scanned: string | null
          id: number
          phenotyper_id: number | null
          plant_age_days: number | null
          plant_id: number | null
          scanner_id: number | null
          uploaded_at: string | null
        }
        Insert: {
          date_scanned?: string | null
          id?: number
          phenotyper_id?: number | null
          plant_age_days?: number | null
          plant_id?: number | null
          scanner_id?: number | null
          uploaded_at?: string | null
        }
        Update: {
          date_scanned?: string | null
          id?: number
          phenotyper_id?: number | null
          plant_age_days?: number | null
          plant_id?: number | null
          scanner_id?: number | null
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cyl_scans_phenotyper_id_fkey"
            columns: ["phenotyper_id"]
            referencedRelation: "phenotypers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cyl_scans_plant_id_fkey"
            columns: ["plant_id"]
            referencedRelation: "cyl_plants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cyl_scans_plant_id_fkey"
            columns: ["plant_id"]
            referencedRelation: "cyl_plants_extended"
            referencedColumns: ["plant_id"]
          },
          {
            foreignKeyName: "cyl_scans_scanner_id_fkey"
            columns: ["scanner_id"]
            referencedRelation: "cyl_scanners"
            referencedColumns: ["id"]
          }
        ]
      }
      cyl_waves: {
        Row: {
          experiment_id: number | null
          id: number
          name: string | null
          number: number | null
        }
        Insert: {
          experiment_id?: number | null
          id?: number
          name?: string | null
          number?: number | null
        }
        Update: {
          experiment_id?: number | null
          id?: number
          name?: string | null
          number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cyl_waves_experiment_id_fkey"
            columns: ["experiment_id"]
            referencedRelation: "cyl_experiments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cyl_waves_experiment_id_fkey"
            columns: ["experiment_id"]
            referencedRelation: "cyl_plants_extended"
            referencedColumns: ["experiment_id"]
          }
        ]
      }
      gene_candidate_scientists: {
        Row: {
          gene_candidate_id: string
          id: number
          scientist_id: number
        }
        Insert: {
          gene_candidate_id: string
          id?: number
          scientist_id: number
        }
        Update: {
          gene_candidate_id?: string
          id?: number
          scientist_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "gene_candidate_scientists_gene_candidate_id_fkey"
            columns: ["gene_candidate_id"]
            referencedRelation: "gene_candidates"
            referencedColumns: ["gene"]
          },
          {
            foreignKeyName: "gene_candidate_scientists_scientist_id_fkey"
            columns: ["scientist_id"]
            referencedRelation: "people"
            referencedColumns: ["id"]
          }
        ]
      }
      gene_candidate_support: {
        Row: {
          candidate_id: string | null
          description: string | null
          primary_key: number
          source: string | null
        }
        Insert: {
          candidate_id?: string | null
          description?: string | null
          primary_key?: number
          source?: string | null
        }
        Update: {
          candidate_id?: string | null
          description?: string | null
          primary_key?: number
          source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gene_candidate_support_gene_fkey"
            columns: ["candidate_id"]
            referencedRelation: "gene_candidates"
            referencedColumns: ["gene"]
          }
        ]
      }
      gene_candidates: {
        Row: {
          category: string | null
          disclosed_to_otd: boolean | null
          evidence_description: string | null
          experiment_plans_and_progress: string | null
          gene: string
          publication_status: boolean | null
          status: string
          translation_approval_date: string | null
        }
        Insert: {
          category?: string | null
          disclosed_to_otd?: boolean | null
          evidence_description?: string | null
          experiment_plans_and_progress?: string | null
          gene: string
          publication_status?: boolean | null
          status?: string
          translation_approval_date?: string | null
        }
        Update: {
          category?: string | null
          disclosed_to_otd?: boolean | null
          evidence_description?: string | null
          experiment_plans_and_progress?: string | null
          gene?: string
          publication_status?: boolean | null
          status?: string
          translation_approval_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gene_candidates_gene_fkey"
            columns: ["gene"]
            referencedRelation: "genes"
            referencedColumns: ["gene_id"]
          }
        ]
      }
      gene_orthologs: {
        Row: {
          gene_x: string
          gene_y: string
        }
        Insert: {
          gene_x: string
          gene_y: string
        }
        Update: {
          gene_x?: string
          gene_y?: string
        }
        Relationships: [
          {
            foreignKeyName: "gene_orthologs_gene_x_fkey"
            columns: ["gene_x"]
            referencedRelation: "genes"
            referencedColumns: ["gene_id"]
          },
          {
            foreignKeyName: "gene_orthologs_gene_y_fkey"
            columns: ["gene_y"]
            referencedRelation: "genes"
            referencedColumns: ["gene_id"]
          }
        ]
      }
      gene_patents: {
        Row: {
          description: string | null
          gene: string | null
          govt_id: string | null
          primary_key: number
          region: string | null
          response_date: string | null
          status: string | null
          submission_date: string | null
          type: string | null
        }
        Insert: {
          description?: string | null
          gene?: string | null
          govt_id?: string | null
          primary_key?: number
          region?: string | null
          response_date?: string | null
          status?: string | null
          submission_date?: string | null
          type?: string | null
        }
        Update: {
          description?: string | null
          gene?: string | null
          govt_id?: string | null
          primary_key?: number
          region?: string | null
          response_date?: string | null
          status?: string | null
          submission_date?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gene_patents_gene_fkey"
            columns: ["gene"]
            referencedRelation: "genes"
            referencedColumns: ["gene_id"]
          }
        ]
      }
      gene_progress_notes: {
        Row: {
          date: string | null
          description: string | null
          gene: string | null
          primary_key: number
        }
        Insert: {
          date?: string | null
          description?: string | null
          gene?: string | null
          primary_key?: number
        }
        Update: {
          date?: string | null
          description?: string | null
          gene?: string | null
          primary_key?: number
        }
        Relationships: [
          {
            foreignKeyName: "gene_progress_notes_gene_fkey"
            columns: ["gene"]
            referencedRelation: "genes"
            referencedColumns: ["gene_id"]
          }
        ]
      }
      genes: {
        Row: {
          gene_id: string
          reference_id: number | null
          short_id: string | null
          symbol: string | null
        }
        Insert: {
          gene_id: string
          reference_id?: number | null
          short_id?: string | null
          symbol?: string | null
        }
        Update: {
          gene_id?: string
          reference_id?: number | null
          short_id?: string | null
          symbol?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "genes_reference_id_fkey"
            columns: ["reference_id"]
            referencedRelation: "assemblies"
            referencedColumns: ["id"]
          }
        ]
      }
      people: {
        Row: {
          email: string | null
          id: number
          name: string | null
        }
        Insert: {
          email?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          email?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      phenotypers: {
        Row: {
          email: string | null
          first_name: string | null
          id: number
          last_name: string | null
          user_id: string | null
        }
        Insert: {
          email?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          user_id?: string | null
        }
        Update: {
          email?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "phenotypers_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      species: {
        Row: {
          common_name: string | null
          genus: string | null
          id: number
          illustration_path: string | null
          species: string | null
        }
        Insert: {
          common_name?: string | null
          genus?: string | null
          id?: number
          illustration_path?: string | null
          species?: string | null
        }
        Update: {
          common_name?: string | null
          genus?: string | null
          id?: number
          illustration_path?: string | null
          species?: string | null
        }
        Relationships: []
      }
      translation_candidates: {
        Row: {
          gene_candidate: string | null
          id: number
          translation_candidate: string | null
        }
        Insert: {
          gene_candidate?: string | null
          id?: number
          translation_candidate?: string | null
        }
        Update: {
          gene_candidate?: string | null
          id?: number
          translation_candidate?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "translation_candidates_gene_candidate_fkey"
            columns: ["gene_candidate"]
            referencedRelation: "gene_candidates"
            referencedColumns: ["gene"]
          },
          {
            foreignKeyName: "translation_candidates_translation_candidate_fkey"
            columns: ["translation_candidate"]
            referencedRelation: "genes"
            referencedColumns: ["gene_id"]
          }
        ]
      }
      translation_lines: {
        Row: {
          accession_id: number | null
          gene_id: string | null
          id: number
          modification_description: string | null
          name: string | null
        }
        Insert: {
          accession_id?: number | null
          gene_id?: string | null
          id?: number
          modification_description?: string | null
          name?: string | null
        }
        Update: {
          accession_id?: number | null
          gene_id?: string | null
          id?: number
          modification_description?: string | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "translation_lines_accession_id_fkey"
            columns: ["accession_id"]
            referencedRelation: "accessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "translation_lines_gene_id_fkey"
            columns: ["gene_id"]
            referencedRelation: "genes"
            referencedColumns: ["gene_id"]
          }
        ]
      }
      translation_project_users: {
        Row: {
          id: number
          translation_project_id: number | null
          user_id: string | null
        }
        Insert: {
          id?: number
          translation_project_id?: number | null
          user_id?: string | null
        }
        Update: {
          id?: number
          translation_project_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "translation_project_users_translation_project_id_fkey"
            columns: ["translation_project_id"]
            referencedRelation: "translation_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "translation_project_users_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      translation_projects: {
        Row: {
          created_at: string
          id: number
          name: string
          spreadsheet_url: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          spreadsheet_url?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          spreadsheet_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      cyl_plants_extended: {
        Row: {
          accession_id: number | null
          experiment_description: string | null
          experiment_id: number | null
          experiment_name: string | null
          germ_day: number | null
          germ_day_color: string | null
          plant_id: number | null
          qr_code: string | null
          species_genus: string | null
          species_id: number | null
          species_name: string | null
          species_species: string | null
          wave_id: number | null
          wave_name: string | null
          wave_number: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cyl_plants_accession_id_fkey"
            columns: ["accession_id"]
            referencedRelation: "accessions"
            referencedColumns: ["id"]
          }
        ]
      }
      cyl_scan_timeline: {
        Row: {
          count: number | null
          date_scanned: string | null
        }
        Relationships: []
      }
      cyl_scan_trait_names: {
        Row: {
          name: string | null
        }
        Relationships: []
      }
      cyl_wave_timeline: {
        Row: {
          count: number | null
          date_scanned: string | null
          experiment_name: string | null
          species_name: string | null
          wave_number: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_scan_traits: {
        Args: {
          experiment_id_: number
          trait_name_: string
        }
        Returns: {
          scan_id: number
          date_scanned: string
          plant_age_days: number
          wave_number: number
          plant_id: number
          germ_day: number
          plant_qr_code: string
          accession_name: string
          trait_name: string
          trait_value: number
        }[]
      }
      insert_image: {
        Args: {
          species_common_name: string
          experiment: string
          wave_number: number
          germ_day: number
          germ_day_color: string
          plant_age_days: number
          date_scanned_: string
          device_name: string
          plant_qr_code: string
          accession_name: string
          frame_number_: number
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "objects_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

