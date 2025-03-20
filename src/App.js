import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import FitnessChallengeTracker from "./FitnessChallengeTracker";
import Login from "./Login";
import Signup from "./Signup";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import "./App.css";
import "./index.css";

function App() {
  const [user, setUser] = useState(null); // Track user auth state

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Update user state
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  return (
    <Router>
      <div className="App flex justify-center items-center min-h-screen bg-gray-100">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Route */}
          <Route
            path="/"
            element={
              user ? ( // If user is logged in
                <FitnessChallengeTracker />
              ) : ( // If user is not logged in
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;