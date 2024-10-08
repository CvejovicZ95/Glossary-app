import React, { useState } from "react";
import "./AddToGlossary.css";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useTerms } from "../../hooks/useGlossary";

export const AddToGlossary = () => {
    const { createTermHandler } = useTerms();
    const navigate = useNavigate();
    const [term, setTerm] = useState("");
    const [definition, setDefinition] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createTermHandler({ term, definition, deleted: false });
            setTerm("");
            setDefinition("");
            navigate("/");
        } catch (error) {
            console.error("Error during form submission:", error);
        }
    };

    return (
        <>
            <h1 className="add-term-title">Add New Term</h1>
            <form className="add-term-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="term">Term:</label>
                    <input
                        className="form-input"
                        type="text"
                        id="term"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="definition">Definition:</label>
                    <textarea
                        className="form-textarea"
                        id="definition"
                        value={definition}
                        onChange={(e) => setDefinition(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button className="add-term" type="submit">Add Term</button>
            </form>
            <div className="back-div-button">
                <Link to={"/glossary"}>
                    <button className="back-to-main-button">
                        <IoArrowBackCircleSharp />
                    </button>
                </Link>
            </div>
        </>
    );
};
