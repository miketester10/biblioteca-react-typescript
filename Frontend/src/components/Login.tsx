import React, { useContext } from "react";
import { supabase } from "../db/supabase";
import { useNavigate } from "react-router-dom";
import { User } from "../types/user";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { setUser, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const email = "marcotfari@gmail.com";
  const password = "000000";
  const nome = "Marco";
  const cognome = "Fari";

  const handleRegistrati = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("registrati");
    const {
      data: { user },
      error: errorQuery1,
    } = await supabase.auth.signUp({
      email,
      password,
    });
    if (errorQuery1) {
      alert(errorQuery1);
      return;
    }
    const userUUID = user?.id as string;
    const { error: errorQuery2 } = await supabase
      .from("utenti")
      .insert({ id: userUUID, nome, cognome, email });
    if (errorQuery2) {
      alert(errorQuery2);
      return;
    }

    alert("Utente creato e già loggato in automatico");
    setUser({ id: userUUID, nome, cognome, email });
    setIsLoggedIn(true);
    navigate("/");
  };

  const handleResetPassword = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/reset-password",
    });
    if (error) {
      alert(error.message);
      return;
    }
    alert("Ti abbiamo inviato un'email per resettare la password");
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const {
      data: { user, session },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error.message);
      return;
    }
    console.log("login");

    const userUUID = user?.id as string;

    if (!userUUID) {
      console.warn("User non autenticato");
      return;
    }

    const { data: userFromDB, error: errorQuery2 } = await supabase
      .from("utenti")
      .select()
      .eq("id", userUUID);
    if (errorQuery2) {
      console.log(errorQuery2.message);
      return;
    }

    setUser(userFromDB[0]);
    setIsLoggedIn(true);

    navigate("/");
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.message);
      return;
    }
    console.log("logout");
    setUser({} as User);
    setIsLoggedIn(false);

    navigate("/");
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleRegistrati}>Registrati</button>
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

export default Login;
