import { getAllTermsFromGlossary, addTermToGlossary, updateTermInGlossary, deleteTermFromGlossary } from "../service/glossaryService.js";

export const getAllTermsController = async (req, res) => {
    try {
        const allTerms = await getAllTermsFromGlossary()
        res.status(200).json(allTerms)
    } catch (error) {
        res.status(500).json({ error: 'Server error'})
    }
}

export const addTermController = async (req, res) => {
    try {
        const { term, definition } = req.body
        const newTerm = await addTermToGlossary(term, definition)
        res.status(201).json(newTerm)
    } catch (error) {
        res.status(500).json({ error: 'Server error'})
    }
}

export const updateTermController = async (req, res) => {
    try {
        const termId = req.params.id
        const newData = req.body
        const updatedTerm = await updateTermInGlossary(termId, newData)
        res.status(200).json(updatedTerm)
    } catch (error) {
        res.status(500).json({ error: 'Server error'})
    }
}

export const deleteTermController = async (req, res) => {
    try {
        const termId = req.params.id
        await deleteTermFromGlossary(termId)
        res.status(200).json({ message: 'Term deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Server error'})
    }
}