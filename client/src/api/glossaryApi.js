const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const getTerms = async () => {
    try {
        const res = await fetch(`${apiUrl}/api/terms`);
        const data = await res.json();
        if (data.error) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const createTerm = async (term, definition, deleted) => {
    try {
        const savedUser = localStorage.getItem('currentUser');
        if (!savedUser) throw new Error('User is not logged in');
        const userData = JSON.parse(savedUser);
        const userId = userData.id;

        const response = await fetch(`${apiUrl}/api/terms`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userData.token}`, 
            },
            body: JSON.stringify({
                term,
                definition,
                deleted,
                author: userId 
            }),
            credentials: "include",
        });
        
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "Failed to create term");
        }
        return data;
    } catch (error) {
        console.error("Error creating term:", error);
        throw error;
    }
};

export const deleteTerm = async (id) => {
    try {
        const savedUser = localStorage.getItem('currentUser');
        if (!savedUser) throw new Error('User is not logged in');
        const userData = JSON.parse(savedUser);
        const token = userData.token; 

        const res = await fetch(`${apiUrl}/api/deleteTerm/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ deleted: true }),
            credentials: "include",
        });
        
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error || "Failed to delete term");
        }
        return data;
    } catch (error) {
        console.error("Error deleting term:", error);
        throw new Error(error.message);
    }
};

export const updateTerm = async (id, updatedTerm, updatedDefinition, updatedDeleted) => {
    try {
        const savedUser = localStorage.getItem('currentUser');
        if (!savedUser) throw new Error('User is not logged in');
        const userData = JSON.parse(savedUser);
        const token = userData.token; 

        const res = await fetch(`${apiUrl}/api/term/${id}`, {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                term: updatedTerm,
                definition: updatedDefinition,
                deleted: updatedDeleted,
            }),
            credentials: "include",
        });

        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error || "Failed to update term");
        }
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

