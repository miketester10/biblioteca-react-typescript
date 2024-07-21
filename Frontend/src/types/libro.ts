export interface Libro {
  title: string;
  desc: string;
  price: number;
  cover: string;
  id_autore: number;
}

export interface LibroWithId extends Libro {
  id: number;
}

export interface ImageError {
  [bookId: number]: boolean;
}

export type MyParams = {
  bookId: string;
};

// USANDO SUPABASE COME DB
export interface LibroSupabase {
  autoreId: number;
  cover: string;
  created_at: string;
  desc: string;
  id: number;
  price: number;
  title: string;
}
