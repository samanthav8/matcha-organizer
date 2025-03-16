// src/context/UserContext.js
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext(); 

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userBrands, setUserBrands] = useState([]);
  const [userGrades, setUserGrades] = useState([]);  

  //fetch user session once app loads
  useEffect(() => {
    fetch("/check_session", { credentials: "include" })
      .then((res) => res.ok ? res.json() : Promise.reject())
      .then((data) => {
        setUser(data);
        setUserBrands(data.brands || []);
        setUserGrades(data.grades || []);
      })
      .catch(() => {
        setUser(null);
        setUserBrands([]);
        setUserGrades([]);
      });
  }, []);

  // add new matcha function
  function addNewMatcha(matchaData, onSuccess) {
    fetch("/matchas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(matchaData),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((newMatcha) => {
        //update brands
        setUserBrands((prevBrands) =>
          prevBrands.map((brand) =>
            brand.id === newMatcha.brand_id
              ? { ...brand, matchas: [...brand.matchas, newMatcha] }
              : brand
          )
        );

        // update grades
        setUserGrades((prevGrades) =>
          prevGrades.map((grade) =>
            grade.id === newMatcha.grade_id
              ? { ...grade, matchas: [...grade.matchas, newMatcha] }
              : grade
          )
        );
        //callback to reset form
        onSuccess();
      })
      .catch(() => alert("Error adding matcha."));
  }

  return (
    <UserContext.Provider value={{ 
      user, setUser, 
      userBrands, setUserBrands, 
      userGrades, setUserGrades, 
      addNewMatcha
    }}>
      {children}
    </UserContext.Provider>
  );
}
