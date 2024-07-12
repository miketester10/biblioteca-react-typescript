import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import {Libro } from "../types/libro";
import { AutoreWithId } from "../types/autore";

const Add = () => {
  const [book, setBook] = useState<Libro>({
    title: "",
    desc: "",
    price: -1,
    cover: "",
    id_autore: -1,
  });

  const [autori, setAutori] = useState<AutoreWithId[]>([]);

  useEffect(() => {
    const fetchAllAutori = async (): Promise<void> => {
      try {
        const resAutori: AxiosResponse<AutoreWithId[]> = await axios.get(
          "http://localhost:8800/author"
        );
        setAutori(resAutori.data);
        setBook((prev) => ({ ...prev, id_autore: resAutori.data[0].id }));
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.log(err.message);
          return;
        }
        console.log(err);
      }
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
    try {
      await axios.post("http://localhost:8800/book", book);
      navigate("/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log(err.message);
        return;
      }
      console.log(err);
    }
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
