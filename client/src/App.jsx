import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/loginAndRegister/Login";
import { Register } from "./components/loginAndRegister/Register";
import { GlossaryPage } from "./components/glossaryPage/GlossaryPage";
import { AddToGlossary } from "./components/addToGlossary/AddToGlossary";
import { EditTerm } from "./components/editTerm/EditTerm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>

      <Route path="/register" element={<Register/>}/>

      <Route path="/glossary" element={<GlossaryPage/>}/>

      <Route path="/newTerm" element={<AddToGlossary/>}/>

      <Route path="/editTerm/:id" element={<EditTerm/>}/>

    </Routes>
  );
}

export default App;
