import React, { useState } from "react";

export const roles =[
  {
    value: "guest",
    name: "Guest"
  },
  {
    value: "user",
    name: "User"
  },
  {
    value: "admin",
    name: "Administrator"
  }
]

const users = [
  {
    email: "user@mail.com",
    firstName: "User",
    lastName: "",
    role: {
      value: "user",
      name: "User"
    }
  },
  {
    email: "admin@mail.com",
    firstName: "Admin",
    lastName: "",
    role: {
      value: "admin",
      name: "Administrator"
    }
  }
]

export const defaultAuthInfo = {user: null, isAuthenticated: false};

export const Children = ({children}) => {
  const [authInfo, setAuthInfo] = useState(defaultAuthInfo);

  const handleLogin = (data) => {
      const user = users.slice().find(u => data.email === u.email);
      if (user) {
        user.isAdmin = user.role.value === "admin";
        setAuthInfo({
            user,
            isAuthenticated: true
        });
      } else {
        throw Error('Invalid email or password.');
      }
  };
  
  const handleLogoff = () => {
      setAuthInfo(defaultAuthInfo)
  };
  return (
      <AuthContext.Provider value={{authInfo, handleLogin, handleLogoff}}>{children}</AuthContext.Provider>
  );
}

export const AuthContext = React.createContext({authInfo: null});

AuthContext.Context = Children;

export default AuthContext;