import express from "express";
import { getAllTermsController, addTermController, updateTermController, deleteTermController } from "../controllers/glossaryController.js";

export const glosarryRouter = express.Router()

glosarryRouter.get('/terms', getAllTermsController)
glosarryRouter.post('/terms', addTermController)
glosarryRouter.put('/term/:id', updateTermController)
glosarryRouter.put('/deleteTerm/:id', deleteTermController)