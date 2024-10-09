const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const getTerms = async () => {
    try {
        const res = await fetch(`${apiUrl}/api/terms`);
        const data = await res.json();
        if (data.error) {
            throw new Error(data.message)
        }
        return data;
    } catch (error) {
        throw new Error(error.message)
    }
}

export const createTerm = async (term, definition, deleted, userId) => {
    try {
        const response = await fetch(`${apiUrl}/api/terms`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                term,
                definition,
                deleted,
                author:userId
            }),
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
        const res = await fetch(`${apiUrl}/api/deleteTerm/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ deleted: true }),
        });
        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }
        return data;
    } catch (error) {
        throw new Error(error.message)
    }
}

export const updateTerm = async (
    id,
    updatedTerm,
    updatedDefinition,
    updatedDeleted,
) => {
    try {
        const res = await fetch(`${apiUrl}/api/term/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                term: updatedTerm,
                definition: updatedDefinition,
                deleted: updatedDeleted,
            }),
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

