import React, { useState } from 'react';
import "./GlossaryPage.css";
import { Link } from 'react-router-dom';
import { useTerms } from '../../hooks/useGlossary';
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from '../../context/authContext';
import { useLogoutUser } from '../../hooks/useUsers';
import { CiLogout } from "react-icons/ci";

export const GlossaryPage = () => {
    const { allTerms, deleteTermHandler } = useTerms();
    const { authUser } = useAuthContext(); 
    const { logoutHandler } = useLogoutUser();
    const [searchTerm, setSearchTerm] = useState("");

    const sortedTerms = allTerms.sort((a, b) => a.term.localeCompare(b.term));
    const filteredTerms = sortedTerms.filter(item => 
        item.term.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const handleDeleteTerm = async (termId) => {
        const confirmed = window.confirm("Are you sure?");
        if (confirmed) {
            try {
                await deleteTermHandler(termId);
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    return (
        <div className="glossary-container">
            <h1 className="glossary-title">Welcome {authUser.username} to Glossary Application</h1>
            <div className='search-and-logout'>
                {authUser && (
                    <button className='logout-button' onClick={logoutHandler}>
                        <CiLogout/>
                    </button>
                )}
                <input 
                    type="text" 
                    placeholder="Search for a term..." 
                    className="glossary-search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="button-container">
                <Link to={'/newTerm'}>
                    <button className='add-term'>Add new Term</button>
                </Link>
            </div>
            <div className="glossary-header">
                <h2 className="glossary-term-title">Term</h2>
                <h2 className="glossary-definition-title">Definition</h2>
            </div>

            <div className="glossary-list">
                {filteredTerms.map((item, index) => (
                    <article key={index} className="glossary-list-item">
                        <h3 className="glossary-term">{item.term}</h3>
                        <p className="glossary-definition">{item.definition}</p>
                        <p className="glossary-author">Created by: {item.author.username}</p>

                        <div className="glossary-actions">
                            {authUser && (authUser.username === 'Admin' || authUser.id === item.author._id) && (
                                <>
                                <Link to={`/editTerm/${item._id}`}>
                                    <button className="glossary-button-update">Update</button>
                                </Link>
                                    <button onClick={() => handleDeleteTerm(item._id)} className="glossary-button-delete">Delete</button>
                                    </>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            <ToastContainer/>
        </div>
    );
};
