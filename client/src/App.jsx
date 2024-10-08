import React from "react";
import { Route, Routes } from "react-router-dom";
import { GlossaryPage } from "./components/glossaryPage/GlossaryPage";
import { AddToGlossary } from "./components/addToGlossary/AddToGlossary";
import { EditTerm } from "./components/editTerm/EditTerm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<GlossaryPage/>}/>

      <Route path="/newTerm" element={<AddToGlossary/>}/>

      <Route path="/editTerm/:id" element={<EditTerm/>}/>

    </Routes>
  );
}

export default App;
