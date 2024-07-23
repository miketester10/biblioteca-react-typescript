import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ImageError, LibroSupabase } from "../types/libro";
import noImageAvailable from "../assets/no_image_available.png";
import { supabase } from "../db/supabase";
import { PostgrestError } from "@supabase/supabase-js";

const Books = () => {
  const [books, setBooks] = useState<LibroSupabase[]>([]);
  const [dirty, setDirty] = useState<boolean>(false);
  const [imageErrors, setImageErrors] = useState<ImageError>({});

  useEffect(() => {
    const fetchAllBooks = async (): Promise<void> => {
      const { data: books, error } = await supabase
        .from("libri")
        .select()
        .order("id", { ascending: true });
      if (error) {
        console.log(error);
        return;
      }
      setBooks(books);
      setDirty(false);
    };

    fetchAllBooks();
  }, [dirty]);

  const handleDelete = async (id: number): Promise<void> => {
    const { error } = await supabase.from("libri").delete().eq("id", id);
    setDirty(true);
    if (error) console.log(error);
  };

  const handleCerca = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ): Promise<void> => {
    const ricerca = e.currentTarget.value;
    if (ricerca === "") {
      setDirty(true);
      return;
    }
    if (e.key === "Enter") {
      const { data: books, error } = (await supabase
        .from("libri_autori_view")
        .select("id,title,desc,price,cover,id_autore,created_at")
        .or(
          `title.ilike.%${ricerca}%,nome.ilike.%${ricerca}%,cognome.ilike.%${ricerca}%`
        )) as { data: LibroSupabase[]; error: PostgrestError | null };

      if (error) {
        console.log(error);
        return;
      }
      setBooks(books);
    }
  };

  const handleImgError = (id: number): void => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
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
            <img
              src={imageErrors[book.id] ? noImageAvailable : book.cover}
              alt={`Cover ${book.title}`}
              onError={() => {
                handleImgError(book.id);
              }}
            />
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
