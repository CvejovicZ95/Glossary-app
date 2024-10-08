import React, { useState } from "react";
import "./AddToGlossary.css"
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

export const AddToGlossary = () => {
    const [term, setTerm] = useState("");
    const [definition, setDefinition] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setTerm("");
        setDefinition("");
    };

    return (
        <>
            <h1>Add New Term</h1>
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
                <button className="add-term" type="submit">Add Term</button>
            </form>
            <div className="back-div-button">
                <Link to={"/"}><button className="back-to-main-button"><IoArrowBackCircleSharp/></button></Link>
            </div>
        </>
    );
};
