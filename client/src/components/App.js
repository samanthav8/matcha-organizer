// src/components/App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
//useSelector gets data from redux store
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./NavBar";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import MatchasByBrands from "./MatchasByBrands";
import NewMatchaForm from "./NewMatchaForm";

function App() {
  //reading user state from redux
  const { user, userDetails } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  // thunk action fetching user details and dispatching
  useEffect(() => {
    if (user) {
      dispatch((dispatch) => {
        fetch("http://127.0.0.1:5555/users")
          .then((res) => res.json())
          .then((data) => {
            // search for specific user
            const currentUser = data.find((u) => u.id === user.id);
            // dispatch set user details
            dispatch({ type: "SET_USER_DETAILS", payload: currentUser });
          })
          .catch((error) => console.error("Error fetching user details:", error));
      });
    }
  }, [user, dispatch]);


  return (
    <Router>
      <div>
        {/*navbar only shows if the user is true*/}
        {user && <NavBar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/home" />} />
          <Route
            path="/brands-view"
            element={
              user ? (
                <MatchasByBrands userMatchas={userDetails?.matchas || []} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route
            path="/matchas/new"
            element={user ? <NewMatchaForm /> : <Navigate to="/login" />}
          />
          <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
