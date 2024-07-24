import React, { useContext, useState } from "react";
import { supabase } from "../db/supabase";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const email = "marcotfari@gmail.com";
  const password = "000000";
  const nome = "Marco";
  const cognome = "Fari";

  const handleRegistrati = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nome, cognome } },
    });

    if (error) {
      alert(error.message);
      return;
    } else {
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
        setSuccess(false);
      }, 4000);
    }
  };

  const handleResetPassword = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      alert(error.message);
    } else {
      alert("Ti abbiamo inviato un'email per resettare la password.");
    }
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert('Email o password errati.');
    } else {
      navigate("/");
    }
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.message);
    } else {
      navigate("/");
    }
  };

  return (
    <div style={{ paddingTop: "20px" }}>
      {!success ? (
      !isLoggedIn ? (
        <>
          <button onClick={handleLogin}>Login</button>

          <button onClick={handleRegistrati}>Registrati</button>

          <button onClick={handleResetPassword}>Reset Password</button>
        </>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )
    ) : (
      <h4>
        Registrazione avvenuta con successo. Verrai reindirizzato alla homepage tra
        pochi secondi..
        <br />
        Oppure <Link to="/">clicca qui</Link>
      </h4>
    )}
    </div>
  );
};

export default Login;
