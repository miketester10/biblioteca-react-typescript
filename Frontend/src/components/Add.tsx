import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Libro } from "../types/libro";
import { AutoreSupabase } from "../types/autore";
import { supabase } from "../db/supabase";

const Add = () => {
  const [book, setBook] = useState<Libro>({} as Libro);

  const [autori, setAutori] = useState<AutoreSupabase[]>([]);

  useEffect(() => {
    const fetchAllAutori = async (): Promise<void> => {
      const { data: autori, error } = await supabase.from("autori").select();
      if (error) {
        console.log(error);
        return;
      }
      setAutori(autori);
      setBook((prev) => ({ ...prev, id_autore: autori[0].id }));
    };

    fetchAllAutori();
  }, []);

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    setBook((prev) => {
      return {
        ...prev,
        [e.target.name]:
          e.target.name === "price" || e.target.name === "id_autore"
            ? parseFloat(e.target.value)
            : e.target.value,
      };
    });
  };
  console.log(book);

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    const { error } = await supabase.from("libri").insert(book);
    if (error) {
      console.log(error);
      return;
    }
    navigate("/");
  };

  return (
    <div className="form">
      <input
        type="text"
        placeholder="Title"
        onChange={handleChange}
        name="title"
      />
      <input
        type="text"
        placeholder="Discription"
        onChange={handleChange}
        name="desc"
      />
      <input
        type="number"
        placeholder="Price"
        onChange={handleChange}
        name="price"
      />
      <input
        type="text"
        placeholder="Cover Image"
        onChange={handleChange}
        name="cover"
      />
      <select onChange={handleChange} name="id_autore">
        {autori.map((autore) => (
          <option key={autore.id} value={autore.id}>
            {autore.nome} {autore.cognome}
          </option>
        ))}
      </select>

      <button onClick={handleClick}>Add</button>
    </div>
  );
};

export default Add;
