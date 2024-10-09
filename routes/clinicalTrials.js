import express from 'express'
import {searchClinicalTrials} from '../controllers/clinicalTrialsController.js'

const router = express.Router()

router.post('/search',(req,res) =>{

    const { disease, city, state} = req.body
    if (!disease || !city||!state){
        return res.status(404).json({error: 'Required search parameters are missing'})
    }
    searchClinicalTrials(req,res)})

export default router