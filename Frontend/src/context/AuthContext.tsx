import { createContext } from "react";
import { AuthenticationContext } from "../types/authContext";

const AuthContext = createContext<AuthenticationContext>({} as AuthenticationContext);

export default AuthContext