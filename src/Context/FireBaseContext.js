import { createContext, useState } from "react";

const FireBaseContext = createContext(null)
export default FireBaseContext;


export const AuthContext = createContext(null)


export  function Context ({children}) {
    const [user , setUser] = useState(null);
    return(
        <AuthContext.Provider value={{user , setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

 