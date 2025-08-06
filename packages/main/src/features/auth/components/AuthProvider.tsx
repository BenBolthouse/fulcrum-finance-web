import {createContext, useContext} from "react";

const AuthContext = createContext(null);

export { AuthContext };

export const useAuth = () => useContext(AuthContext);
