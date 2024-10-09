import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./components/loginAndRegister/Login";
import { Register } from "./components/loginAndRegister/Register";
import { GlossaryPage } from "./components/glossaryPage/GlossaryPage";
import { AddToGlossary } from "./components/addToGlossary/AddToGlossary";
import { EditTerm } from "./components/editTerm/EditTerm";
import { useAuthContext } from "./context/authContext";

function App() {
  const { authUser } = useAuthContext();

  return (
    <Routes>
      <Route
        path="/"
        element={authUser ? <Navigate to="/glossary" /> : <Login />}
      />

      <Route
        path="/register"
        element={authUser ? <Navigate to="/glossary" /> : <Register />}
      />

      <Route
        path="/glossary"
        element={!authUser ? <Navigate to="/" /> : <GlossaryPage />}
      />

      <Route
        path="/newTerm"
        element={!authUser ? <Navigate to="/" /> : <AddToGlossary />}
      />

      <Route
        path="/editTerm/:id"
        element={!authUser ? <Navigate to="/" /> : <EditTerm />}
      />
    </Routes>
  );
}

export default App;
