import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getTerms, deleteTerm, createTerm, updateTerm } from "../api/glossaryApi";
import { useAuthContext } from '../context/authContext';

export const useTerms = () => {
    const [allTerms, setAllTerms] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        const fetchTerms = async () => {
            try {
                const data = await getTerms();
                setAllTerms(data);
            } catch (error) {
                toast.error(error.message);
            }
        };
        fetchTerms();
    }, []);

    const deleteTermHandler = async (id) => {
        try {
            await deleteTerm(id);
            setAllTerms((prevTerms) => {
                return prevTerms.filter((term) => term._id !== id);
            });
            toast.success('Term deleted successfully!');
        } catch (error) {
            toast.error(error.message);
        }
    };

    const validateInput = (term, definition) => {
        if (!term || !definition) {
            toast.error('Term and definition cannot be empty');
            return false;
        }
        
        if (term.length < 3) {
            toast.error('Term must be at least 3 characters long');
            return false; 
        }
        
        if (definition.length < 15) {
            toast.error('Definition must be at least 15 characters long');
            return false; 
        }

        return true;
    };

    const createTermHandler = async ({ term, definition, deleted }) => {
        if (!validateInput(term, definition)) {
            return false;
        }

        try {
            const newTerm = await createTerm(term, definition, deleted, authUser._id);
            setAllTerms((prevTerms) => [...prevTerms, newTerm]);
            toast.success('Term added successfully!');
            return true; 
        } catch (error) {
            toast.error(error.message);
            return false; 
        }
    };

    const updateTermHandler = async (id, updatedTerm, updatedDefinition, updatedDeleted) => {
        if (!validateInput(updatedTerm, updatedDefinition)) {
            return false;
        }

        try {
            const updated = await updateTerm(id, updatedTerm, updatedDefinition, updatedDeleted);
            setAllTerms((prevTerms) =>
                prevTerms.map((term) => (term._id === id ? updated : term))
            );
            toast.success('Term updated successfully!');
            return true; 
        } catch (error) {
            toast.error(error.message);
            return false; 
        }
    };
    

    return { allTerms, deleteTermHandler, createTermHandler, updateTermHandler };
};
