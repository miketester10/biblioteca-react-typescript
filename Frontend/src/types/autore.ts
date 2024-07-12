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