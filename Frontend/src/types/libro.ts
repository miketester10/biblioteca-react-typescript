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

export type MyParams = {
  bookId: string;
}
