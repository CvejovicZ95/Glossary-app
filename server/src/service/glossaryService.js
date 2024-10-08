import { Glossary } from "../models/glossarySchema.js";
import { logger } from "../../logger.js";

export const getAllTermsFromGlossary = async () => {
    try {
        const allTerms = await Glossary.find({ deleted: false });
        return allTerms;
    } catch (error) {
        logger.error('Error adding term to glossary', { message: error.message, stack: error.stack });
        throw new Error('Error fetching data');
    }
}


export const addTermToGlossary = async (term, definition) => {
    try {
        const newTerm = new Glossary({ term, definition })
        await newTerm.save()

        logger.info('New term added successfully')
        return newTerm
    } catch (error) {
        logger.error('Error adding term to glossary', { message: error.message, stack: error.stack });

        throw new Error('Error adding term to glossary')
    }
}

export const updateTermInGlossary = async (termId, newData) => {
    try {
        const updatedTerm = await Glossary.findByIdAndUpdate(termId, newData, {
            new: true })
            if (!updatedTerm) {
                logger.error('Term not found', termId)
                throw new Error('Term not found')
            }
            logger.info('Term updated successfully', updatedTerm._id)
            return updatedTerm
    } catch (error) {
        logger.error('Error adding term to glossary', { message: error.message, stack: error.stack });
        throw new Error('Error updating term')
    }
}

export const deleteTermFromGlossary = async (id) => {
    try {
        const deletedTerm = await Glossary.findByIdAndUpdate(
            id,
            { deleted: true }, 
            { new: true } 
        );
        if (!deletedTerm) {
            logger.error('Term not found')
            throw new Error('Term not found')
        }
        logger.info('Term marked as deleted', deletedTerm._id);
    } catch (error) {
        logger.error('Error adding term to glossary', { message: error.message, stack: error.stack });
        throw new Error('Error deleting term from glossary');
    }
}
