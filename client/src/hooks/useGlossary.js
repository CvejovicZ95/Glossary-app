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

    const createTermHandler = async ({ term, definition, deleted }) => {
        if (!term || !definition) {
            toast.error('Term and definition cannot be empty');
            return;
        }
        try {
            const newTerm = await createTerm(term, definition, deleted, authUser._id);
            setAllTerms((prevTerms) => [...prevTerms, newTerm]);
            toast.success('Term added successfully!');
        } catch (error) {
            toast.error(error.message);
        }
    };
    

    const updateTermHandler = async (id, updatedTerm, updatedDefinition, updatedDeleted) => {
        try {
            const updated = await updateTerm(id, updatedTerm, updatedDefinition, updatedDeleted);
            setAllTerms((prevTerms) =>
                prevTerms.map((term) => (term._id === id ? updated : term))
            );
            toast.success('Term updated successfully!');
        } catch (error) {
            toast.error(error.message);
        }
    };
    

    return { allTerms, deleteTermHandler, createTermHandler, updateTermHandler };
};
