import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LibroSupabase, MyParams } from "../types/libro";
import { AutoreSupabase } from "../types/autore";
import { supabase } from "../db/supabase";

const Update = () => {
  const [editField, setEditField] = useState<LibroSupabase>({} as LibroSupabase);
  const [autori, setAutori] = useState<AutoreSupabase[]>([]);

  const navigate = useNavigate();
  // const { bookId } = useParams<MyParams>(); forma abbreviata (destrutturazione)
  const params = useParams<MyParams>();
  const bookId = params.bookId as string;

  useEffect(() => {
    const fetchBook = async (): Promise<void> => {
      // Ottengo i dati del libro
      const { data: book, error: errorQuery1 } = await supabase
        .from("libri")
        .select()
        .eq("id", bookId);
      if (errorQuery1) {
        console.log(errorQuery1);
        return;
      }

      // Ottengo i dati degli autori
      const { data: autori, error: errorQuery2 } = await supabase
        .from("autori")
        .select();
      if (errorQuery2) {
        console.log(errorQuery2);
        return;
      }

      // Imposto gli stati
      setEditField(book[0]);
      setAutori(autori);
    };
    fetchBook();
  }, [bookId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    setEditField((prev) => {
      return {
        ...prev,
        [e.target.name]:
          e.target.name === "price" || e.target.name === "id_autore"
            ? parseFloat(e.target.value)
            : e.target.value,
      };
    });
  };
  console.log(editField);

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();

    const { error } = await supabase
      .from("libri")
      .update(editField)
      .eq("id", bookId);
    if (error) {
      console.log(error);
      return;
    }
    navigate("/");
  };

  return (
    <div className="form">
      <h1>Aggiorna le informazioni sul libro</h1>
      <input
        type="text"
        placeholder="Titolo"
        value={editField.title}
        onChange={handleChange}
        name="title"
      />
      <input
        type="text"
        placeholder="Descrizione"
        value={editField.desc}
        onChange={handleChange}
        name="desc"
      />
      <input
        type="number"
        placeholder="Prezzo"
        value={editField.price}
        onChange={handleChange}
        name="price"
      />
      <input
        type="text"
        placeholder="Cover Image"
        value={editField.cover}
        onChange={handleChange}
        name="cover"
      />
      <select onChange={handleChange} name="id_autore">
        {autori.map((autore) => (
          <option
            key={autore.id}
            value={autore.id}
            selected={editField.id_autore === autore.id}
          >
            {autore.nome} {autore.cognome}
          </option>
        ))}
      </select>

      <button className="formButton" onClick={handleClick}>
        Update
      </button>
    </div>
  );
};

export default Update;
