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
      .then((res) => (res.ok ? res.json() : Promise.reject()))
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

    // handle login and update state immediately
    function handleLogin(credentials, onSuccess, onError) {
      fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) throw new Error(data.error);
    
          //fetch updated session data
          return fetch("/check_session", { credentials: "include" })
            .then((res) => res.json())
            .then((sessionData) => {
              setUser(sessionData);
              setUserBrands(sessionData.brands || []);
              setUserGrades(sessionData.grades || []);
              if (onSuccess) onSuccess();
            });
        })
        .catch((err) => {
          if (onError) onError(err.message);
        });
    }
    

    // handle logout and clear out state
    function handleLogout() {
      fetch("/logout", { method: "DELETE", credentials: "include" })
        .then(() => {
          setUser(null);
          setUserBrands([]);
          setUserGrades([]);
        })
        .catch(() => alert("Logout failed!"));
    }


    function handleSignup(credentials, onSuccess, onError) {
      const formattedCredentials = {
        // convert username to lowercase before sending
        username: credentials.username.toLowerCase(),
        password: credentials.password,
      };
    
      fetch("/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedCredentials),
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) throw new Error(data.error);
          if (onSuccess) onSuccess();
        })
        .catch((err) => {
          if (onError) onError(err.message);
        });
    }
    
    

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
        setUserBrands((prevBrands) => {
          // check if brand exists in users brand
          const brandExists = prevBrands.some(brand => brand.id === newMatcha.brand_id);
  
          if (brandExists) {
            // if brand exists add the matcha to that brand
            return prevBrands.map((brand) =>
              brand.id === newMatcha.brand_id
                ? { ...brand, matchas: [...brand.matchas, newMatcha] }
                : brand
            );
          } else {
            // if brand is new add a new brand with the matcha
            return [
              ...prevBrands,
              {
                id: newMatcha.brand_id,
                name: newMatcha.brand_name,
                website: newMatcha.brand_website,
                matchas: [newMatcha],
              },
            ];
          }
        });
  
        setUserGrades((prevGrades) => {
          //check if grade exists in user grades
          const gradeExists = prevGrades.some(grade => grade.id === newMatcha.grade_id);
  
          if (gradeExists) {
            // if grade exists add the matcha to that grade
            return prevGrades.map((grade) =>
              grade.id === newMatcha.grade_id
                ? { ...grade, matchas: [...grade.matchas, newMatcha] }
                : grade
            );
          } else {
            // if grade is new add a new grade with the matcha
            return [
              ...prevGrades,
              {
                id: newMatcha.grade_id,
                grade: newMatcha.grade_name, 
                matchas: [newMatcha],
              },
            ];
          }
        });
  
        if (onSuccess) onSuccess();
      })
      .catch(() => alert("Error adding matcha."));
  }

  function deleteMatcha(matchaId, onSuccess, onError) {
    fetch(`/matchas/${matchaId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete matcha");
  
        setUserBrands((prevBrands) =>
          prevBrands
            .map((brand) => ({
              ...brand,
              matchas: brand.matchas.filter((matcha) => matcha.id !== matchaId),
            }))
            .filter((brand) => brand.matchas.length > 0) 
        );
  
        setUserGrades((prevGrades) =>
          prevGrades
            .map((grade) => ({
              ...grade,
              matchas: grade.matchas.filter((matcha) => matcha.id !== matchaId),
            }))
            .filter((grade) => grade.matchas.length > 0) 
        );
  
        if (onSuccess) onSuccess();
      })
      .catch((err) => {
        if (onError) onError(err.message);
      });
  }
  
  // update matcha
  function updateMatcha(matchaId, updatedData, onSuccess, onError) {
    fetch(`/matchas/${matchaId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((updatedMatcha) => {
        if (updatedMatcha.error) throw new Error(updatedMatcha.error);

        //update matcha in brands
        setUserBrands((prevBrands) => 
          prevBrands.map((brand) => ({
            ...brand,
            matchas: brand.matchas.map((matcha) =>
              matcha.id === matchaId ? updatedMatcha : matcha
            ),
          }))
        );

        //update matcha in grades
        setUserGrades((prevGrades) => 
          prevGrades.map((grade) => ({
            ...grade,
            matchas: grade.matchas.map((matcha) =>
              matcha.id === matchaId ? updatedMatcha : matcha
            ),
          }))
        );


        if (onSuccess) onSuccess();
      })
      .catch((err) => {
        if (onError) onError(err.message);
      });
  }

  return (
    <UserContext.Provider value={{ 
      user, setUser,
      userBrands, setUserBrands, 
      userGrades, setUserGrades, 
      handleLogin,handleSignup, 
      handleLogout, addNewMatcha,
      updateMatcha, deleteMatcha
    
    }}>
      {children}
    </UserContext.Provider>
  );
}
