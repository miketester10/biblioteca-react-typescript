import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Libro, MyParams } from "../types/libro";
import { AutoreWithId } from "../types/autore";

const Update = () => {
  const [editField, setEditField] = useState<Libro>({
    title: "",
    desc: "",
    price: -1,
    cover: "",
    id_autore: -1,
  });
  const [autori, setAutori] = useState<AutoreWithId[]>([]);

  const navigate = useNavigate();
  // const { bookId } = useParams<MyParams>(); forma abbreviata (destrutturazione)
  const params = useParams<MyParams>();
  const bookId = params.bookId

  useEffect(() => {
    const fetchBook = async (): Promise<void> => {
      try {
        const [resLibri, resAutori]: [
          AxiosResponse<Libro[]>,
          AxiosResponse<AutoreWithId[]>
        ] = await Promise.all([
          axios.get(`http://localhost:8800/book/${bookId}`),
          axios.get(`http://localhost:8800/author`),
        ]);
        setEditField(resLibri.data[0]);
        setAutori(resAutori.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.log(err.message);
          return;
        }
        console.log(err);
      }
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
    try {
      await axios.put(`http://localhost:8800/book/${bookId}`, editField);
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
