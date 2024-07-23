import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AutoreSupabase } from "../types/autore";
import { supabase } from "../db/supabase";
import AuthContext from "../context/AuthContext";

const Autori = () => {
  const [listaAutori, setListaAutori] = useState<AutoreSupabase[]>([]);
  const [dirty, setDirty] = useState<boolean>(false);
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const fetchAllAutori = async (): Promise<void> => {
      const { data: autori, error } = await supabase
        .from("autori")
        .select()
        .order("id", { ascending: true });
      if (error) {
        console.log(error);
        return;
      }
      setListaAutori(autori);
      setDirty(false);
    };

    fetchAllAutori();
  }, [dirty]);

  const handleDelete = async (id: number): Promise<void> => {
    const { error } = await supabase.from("autori").delete().eq("id", id);
    setDirty(true);
    if (error) console.log(error);
  };

  return (
    <div>
      <h1>Autori dei Libri</h1>
      <div className="autori">
        {listaAutori.map((autore) => (
          <div className="autore" key={autore.id}>
            <h2>{autore.cognome}</h2>
            <h2>{autore.nome}</h2>

            {isLoggedIn && (
              <>
                <button
                  className="delete"
                  onClick={() => handleDelete(autore.id)}
                >
                  Delete
                </button>
                <button className="update">
                  <Link to={`/autoreUpdate/${autore.id}`}>Update</Link>
                </button>
              </>
            )}
          </div>
        ))}

        {isLoggedIn && (
          <button>
            <Link to="/autoreAdd">Add new autore</Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Autori;
