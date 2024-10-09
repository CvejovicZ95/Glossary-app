import React, { useEffect, useState } from "react";
import "./EditTerm.css";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useTerms } from "../../hooks/useGlossary";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const EditTerm = () => {
  const { updateTermHandler, allTerms } = useTerms();
  const { id } = useParams();
  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const currentTerm = allTerms.find((t) => t._id === id);
    if (currentTerm) {
      setTerm(currentTerm.term);
      setDefinition(currentTerm.definition);
    }
  }, [allTerms, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = await updateTermHandler(id, term, definition, false);
    if (isValid) {
      navigate("/");
    }
  };

  return (
    <>
      <h1>Edit Term</h1>
      <div className="edit-term-container">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="term">Term:</label>
            <input
              type="text"
              id="term"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="definition">Definition:</label>
            <textarea
              id="definition"
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              required
            ></textarea>
          </div>
          <button className="update-button" type="submit">
            Save Term
          </button>
        </form>
      </div>
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
