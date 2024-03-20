import { useState } from "react";
import AuthContext from "../contexts/authContext";

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
