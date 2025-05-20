import {  useState, type FC, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";
import { BASE_URL } from "../../constants/baseUrl";

const USERNAME_KEY ='username';
const TOKEN_KEY ='token';

const AuthProvider: FC<PropsWithChildren> = ({children}) =>{

    const [username, setUserName]= useState <string | null >(localStorage.getItem(USERNAME_KEY))
    const [token, setToken]= useState <string | null >(localStorage.getItem('token'))
   const isAuthenticated = !!token;
    const [myOrders, setMyOrders] = useState([]);
    const login = (username: string, token : string )=> {
        setUserName(username);
        setToken(token);
        localStorage.setItem(USERNAME_KEY, username);
        localStorage.setItem(TOKEN_KEY, token);
    }

    const logout =()=>{
        localStorage.removeItem(USERNAME_KEY);
        localStorage.removeItem(TOKEN_KEY);
        setUserName(null);
        setToken(null);
    }

    const getMyOrders =async()=>{
          const response = await fetch(`${BASE_URL}/user/my-orders`, {
                  method: "GET",
                  headers: {
                    Authorization:`Bearer ${token}`,
                  },
                });

                if(!response.ok) return;
                const data = await response.json();

                setMyOrders(data);
    }
 
    return (
        <AuthContext.Provider value={{username, token, isAuthenticated,myOrders, login, logout, getMyOrders}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;