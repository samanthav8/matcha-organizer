// src/context/UserContext.js
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext(); // 

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [brands, setBrands] = useState([]);


  // Fetch user session when app loads
  useEffect(() => {
    fetch("/check_session", { credentials: "include" })
      .then((res) => res.ok ? res.json() : Promise.reject())
      .then((data) => {
        setUser(data);
        setBrands(data.brands || []);
      })
      .catch(() => {
        setUser(null);
        setBrands([]);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, brands, setBrands }}>
      {children}
    </UserContext.Provider>
  );
}
