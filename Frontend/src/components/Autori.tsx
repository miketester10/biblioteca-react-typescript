import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { AutoreWithId } from "../types/autore";

const Autori = () => {
  const [listaAutori, setListaAutori] = useState<AutoreWithId[]>([]);
  const [dirty, setDirty] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllAutori = async (): Promise<void> => {
      try {
        const resAutori: AxiosResponse<AutoreWithId[]> = await axios.get(
          "http://localhost:8800/author"
        );
        setListaAutori(resAutori.data);
        setDirty(false);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.log(err.message);
          return;
        }
        console.log(err);
      }
    };

    fetchAllAutori();
  }, [dirty]);

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await axios.delete(`http://localhost:8800/author/${id}`);
      setDirty(true);
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
    <div>
      <h1>Autori dei Libri</h1>
      <div className="autori">
        {listaAutori.map((autore) => (
          <div className="autore" key={autore.id}>
            <h2>{autore.cognome}</h2>
            <h2>{autore.nome}</h2>

            <button className="delete" onClick={() => handleDelete(autore.id)}>
              Delete
            </button>
            <button className="update">
              <Link to={`/autoreUpdate/${autore.id}`}>Update</Link>
            </button>
          </div>
        ))}

        <button>
          <Link to="/autoreAdd">Add new autore</Link>
        </button>
      </div>
    </div>
  );
};

export default Autori;
