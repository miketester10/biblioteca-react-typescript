import React, { useState } from "react";
import { supabase } from "../db/supabase";
import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleResetta = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let newPassword;
    do {
      newPassword = prompt("Inserisci la nuova password:") as string;
    } while (newPassword === null);

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      alert(
        "Si è verificato un problema durante l'aggiornamento della password. Riprova."
      );
      console.log(error.message);
      navigate("/login");
      return;
    }

    if (data) {
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 4000);
    }
  };

  return (
    <div style={{ paddingTop: "20px" }}>
      {!success ? (
        <button onClick={handleResetta}>Resetta</button>
      ) : (
        <h4>
          Password aggiornata con successo. Verrai reindirizzato alla homepage
          tra pochi secondi..
          <br />
          Oppure <Link to="/">clicca qui</Link>
        </h4>
      )}
    </div>
  );
};
export default ResetPassword;
