import React, { useState } from "react";
import "./AddToGlossary.css";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useTerms } from "../../hooks/useGlossary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddToGlossary = () => {
  const { createTermHandler } = useTerms();
  const navigate = useNavigate();
  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await createTermHandler({
      term,
      definition,
      deleted: false,
    });
    if (success) {
      setTerm("");
      setDefinition("");
      navigate("/");
    }
  };

  return (
    <>
      <h1 className="add-term-title">Add New Term</h1>
      <form className="add-term-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="term">
            Term:
          </label>
          <input
            className="form-input"
            type="text"
            id="term"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="definition">
            Definition:
          </label>
          <textarea
            className="form-textarea"
            id="definition"
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
          ></textarea>
        </div>
        <button className="add-term" type="submit">
          Add Term
        </button>
      </form>
      <div className="back-div-button">
        <Link to={"/glossary"}>
          <button className="back-to-main-button">
            <IoArrowBackCircleSharp />
          </button>
        </Link>
      </div>
      <ToastContainer />
    </>
  );
};
