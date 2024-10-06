import express from 'express'
import {searchClinicalTrials} from '../controllers/clinicalTrialsController.js'

const router = express.Router()

router.post('/search',searchClinicalTrials)

export default router