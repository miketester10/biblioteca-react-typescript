import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Autore, MyParams } from "../types/autore";

const AutoreUpdate = () => {
  const [editField, setEditField] = useState<Autore>({
    nome: "",
    cognome: "",
  });

  const navigate = useNavigate();
  // const { authorId } = useParams<MyParams>(); forma abbreviata (destrutturazione)
  const params = useParams<MyParams>();
  const authorId = params.authorId;

  useEffect(() => {
    const fetchAuthor = async (): Promise<void> => {
      try {
        const resAutori: AxiosResponse<Autore[]> = await axios.get(
          `http://localhost:8800/author/${authorId}`
        );
        setEditField(resAutori.data[0]);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.log(err.message);
          return;
        }
        console.log(err);
      }
    };
    fetchAuthor();
  }, [authorId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEditField((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(editField);

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/author/${authorId}`, editField);
      navigate("/autori");
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
      <h1>Aggiorna le informazioni sull'autore</h1>
      <input
        type="text"
        placeholder="Nome"
        value={editField.nome}
        onChange={handleChange}
        name="nome"
      />
      <input
        type="text"
        placeholder="Cognome"
        value={editField.cognome}
        onChange={handleChange}
        name="cognome"
      />
      <button className="formButton" onClick={handleClick}>
        Update
      </button>
    </div>
  );
};

export default AutoreUpdate;
