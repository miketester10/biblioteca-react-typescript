import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { supabase } from "./db/supabase";
import { User } from "./types/user";
import AuthContext from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Books from "./components/Books";
import Add from "./components/Add";
import Update from "./components/Update";
import Autori from "./components/Autori";
import AutoreAdd from "./components/AutoreAdd";
import AutoreUpdate from "./components/AutoreUpdate";
import Contatti from "./components/Contatti";
import Login from "./components/Login";
import ResetPassword from "./components/ResetPassword";
import PaginaNonTrovata from "./components/PaginaNonTrovata";
import "./style.css";

function App() {
  const [user, setUser] = useState<User>({} as User);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const location = useLocation();
  const hideNavbarPaths = ["/login", "/reset-password"];

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(event);

      if (event === "PASSWORD_RECOVERY") {
        setIsLoggedIn(false);
        return;
      }

      const userUUID = session?.user.id as string;

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
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      <div className="App">
        {hideNavbarPaths.includes(location.pathname) ? null : <Navbar />}
          <Routes>
            <Route path="/" element={<Books />} />
            <Route path="/add" element={<Add />} />
            <Route path="/update/:bookId" element={<Update />} />
            <Route path="/autori" element={<Autori />} />
            <Route path="/autoreAdd" element={<AutoreAdd />} />
            <Route path="/autoreUpdate/:authorId" element={<AutoreUpdate />} />
            <Route path="/contatti" element={<Contatti />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<PaginaNonTrovata />} />
          </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
