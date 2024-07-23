import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AutoreSupabase, MyParams } from "../types/autore";
import { supabase } from "../db/supabase";

const AutoreUpdate = () => {
  const [editField, setEditField] = useState<AutoreSupabase>({} as AutoreSupabase);

  const navigate = useNavigate();
  const params = useParams<MyParams>();
  const authorId = params.authorId as string;

  useEffect(() => {
    const fetchAuthor = async (): Promise<void> => {
      // Ottengo i dati dell'autore
      const { data: autore, error } = await supabase
        .from("autori")
        .select()
        .eq("id", authorId);
      if (error) {
        console.log(error);
        return;
      }

      // Imposto lo stato
      setEditField(autore[0]);
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
    const { error } = await supabase
      .from("autori")
      .update(editField)
      .eq("id", authorId);
    if (error) {
      console.log(error);
      return;
    }
    navigate("/autori");
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
