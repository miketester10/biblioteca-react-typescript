import { User } from "./user";

export interface AuthenticationContext {
    user: User
    setUser: React.Dispatch<React.SetStateAction<User>>
    isLoggedIn: boolean
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}