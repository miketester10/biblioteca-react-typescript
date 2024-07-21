export interface Autore {
    nome: string;
    cognome: string;
  }

export interface AutoreWithId extends Autore {
    id: number;
  }

export type MyParams = {
  authorId: string;
}

// USANDO SUPABASE COME DB
export interface AutoreSupabase {
  id: number;
  nome: string;
  cognome: string;
  created_at: string;
}