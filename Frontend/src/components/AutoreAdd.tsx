import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Autore } from "../types/autore";

const AutoreAdd = () => {
  const [autore, setAutore] = useState<Autore>({
    nome: "",
    cognome: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAutore((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(autore);

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/author", autore);
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
      <input
        type="text"
        placeholder="Nome"
        onChange={handleChange}
        name="nome"
      />
      <input
        type="text"
        placeholder="Cognome"
        onChange={handleChange}
        name="cognome"
      />

      <button onClick={handleClick}>Add</button>
    </div>
  );
};

export default AutoreAdd;
