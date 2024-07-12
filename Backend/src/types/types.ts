import { RowDataPacket } from "mysql2";

export interface Book extends RowDataPacket {
  id: number;
  title: string;
  desc: string;
  price: number;
  cover: string;
  id_autore: number;
}

export interface Author extends RowDataPacket {
  id: number;
  nome: string;
  cognome: string;
}

export interface BookWithAuthor extends RowDataPacket {
  id: number;
  title: string;
  desc: string;
  price: number;
  cover: string;
  id_autore: number;
  nome: string;
  cognome: string;
}

export interface CreateBook {
  title: string;
  desc: string;
  price: number;
  cover: string;
  id_autore: number;
}

export interface UpdateBook {
  title: string;
  desc: string;
  price: number;
  cover: string;
  id_autore: number;
}

export interface CreateAuthor {
  nome: string;
  cognome: string;
}

export interface UpdateAuthor {
  nome: string;
  cognome: string;
}
