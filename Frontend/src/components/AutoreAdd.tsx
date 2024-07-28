import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Autore } from "../types/autore";
import { supabase } from "../db/supabase";

const AutoreAdd = () => {
  const [autore, setAutore] = useState<Autore>({} as Autore);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAutore((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(autore);

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    const { error } = await supabase.from("autori").insert(autore);
    if (error) {
      console.log(error);
      return;
    }
    navigate("/autori");
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
