import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Link } from "react-router-dom";
import { LibroWithId } from "../types/libro";

const Books = () => {
  const [books, setBooks] = useState<LibroWithId[]>([]);
  const [dirty, setDirty] = useState<boolean>(false);

  useEffect(() => {
    const fetchAllBooks = async (): Promise<void> => {
      try {
        const resLibri: AxiosResponse<LibroWithId[]> = await axios.get(
          "http://localhost:8800/book"
        );
        setBooks(resLibri.data);
        setDirty(false);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.log(err.message);
          return;
        }
        console.log(err);
      }
    };

    fetchAllBooks();
  }, [dirty]);

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await axios.delete(`http://localhost:8800/book/${id}`);
      setDirty(true);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log(err.message);
        return;
      }
      console.log(err);
    }
  };

  const handleCerca = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ): Promise<void> => {
    if (e.currentTarget.value === "") {
      setDirty(true);
      return;
    }
    if (e.key === "Enter") {
      try {
        const resLibri: AxiosResponse<LibroWithId[]> = await axios.get(
          `http://localhost:8800/books/search/${e.currentTarget.value}`
        );
        setBooks(resLibri.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.log(err.message);
          return;
        }
        console.log(err);
      }
    }
  };

  return (
    <div>
      <h1>I miei libri</h1>
      <h2>
        <Link to="/autori">Elenco autori</Link>
      </h2>
      <hr />
      <h3>
        {" "}
        Cerca per titolo o per autore:{" "}
        <input type="text" name="cerca" id="cerca" onKeyUp={handleCerca} />
      </h3>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.id}>
            <img src={book.cover} alt={`Cover ${book.title}`} />
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>{book.price}$</span>
            <button className="delete" onClick={() => handleDelete(book.id)}>
              Delete
            </button>
            <button className="update">
              <Link to={`/update/${book.id}`}>Update</Link>
            </button>
          </div>
        ))}

        <button>
          <Link to="/add">Add new book</Link>
        </button>
      </div>
    </div>
  );
};

export default Books;
