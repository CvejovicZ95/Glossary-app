import express from 'express'
import { getAllTermsController, addTermController, updateTermController, deleteTermController } from '../controllers/glossaryController.js'
import { authenticateToken } from '../middleware/authToken.js'

export const glosarryRouter = express.Router()

glosarryRouter.get('/terms', getAllTermsController)
glosarryRouter.post('/terms', authenticateToken, addTermController)
glosarryRouter.put('/term/:id', authenticateToken, updateTermController)
glosarryRouter.put('/deleteTerm/:id', authenticateToken, deleteTermController)
