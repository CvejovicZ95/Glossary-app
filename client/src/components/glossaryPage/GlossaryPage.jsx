import React from 'react';
import "./GlossaryPage.css";

export const GlossaryPage = () => {
    const glossaryTerms = [
        { term: "Abyssal Plain", definition: "The ocean floor offshore from the continental margin, usually very flat with a slight slope." },
        { term: "Accrete", definition: "To add terranes (small land masses or pieces of crust) to another, usually larger, land mass." },
        { term: "Evaporation", definition: "The process of turning liquid into vapor, often as part of the water cycle." },
        { term: "Photosynthesis", definition: "A process used by plants and other organisms to convert light energy into chemical energy." },
        { term: "Alkaline", definition: "Pertaining to a highly basic, as opposed to acidic, substance. For example, hydroxide or carbonate of sodium or potassium." },
    ];

    const sortedTerms = glossaryTerms.sort((a, b) => a.term.localeCompare(b.term));

    return (
        <div className="glossary-container">
            <h1 className="glossary-title">Glossary Application</h1>
            <input 
                type="text" 
                placeholder="Search for a term..." 
                className="glossary-search-input"
            />

            <div className="glossary-header">
                <h2 className="glossary-term-title">Term</h2>
                <h2 className="glossary-definition-title">Definition</h2>
            </div>

            <div className="glossary-list">
                {sortedTerms.map((item, index) => (
                    <article key={index} className="glossary-list-item">
                        <h3 className="glossary-term">{item.term}</h3>
                        <p className="glossary-definition">{item.definition}</p>
                        <div className="glossary-actions">
                            <button className="glossary-button-update">Update</button>
                            <button className="glossary-button-delete">Delete</button>
                        </div>
                    </article>
                ))}
            </div>
            
        </div>
    );
};
