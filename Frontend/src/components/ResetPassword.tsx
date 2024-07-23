import React from "react";
import { supabase } from "../db/supabase";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();

  const handleResetta = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let newPassword;
    do {
        newPassword = prompt(
            "Inserisci la nuova password:"
          ) as string;
    } while (newPassword === null);
    
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    
    if (error) {
      alert("There was an error updating your password.");
      navigate("/login");
      return;
    }
    alert("Password updated successfully!");
    navigate("/");
  };

  return <div style={{paddingTop: "20px"}}><button onClick={handleResetta}>Resetta</button></div>;
};
export default ResetPassword;
