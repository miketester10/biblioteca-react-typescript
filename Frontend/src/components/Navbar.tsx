import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, isLoggedIn } = useContext(AuthContext);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "20px"
      }}
    >
      {isLoggedIn ? (
        <>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            Benvenuto {isLoggedIn ? `${user.nome} ${user.cognome}` : null}
          </p>
          <h3>
            <Link to="/login">Logout</Link>
          </h3>
        </>
      ) : (
        <h3>
          <Link to="/login">Login</Link>
        </h3>
      )}
    </div>
  );
};

export default Navbar;
