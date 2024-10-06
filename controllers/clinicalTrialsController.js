import axios from "axios"
import { SESSION_URL } from "../config.js"

const URL = SESSION_URL

export const searchClinicalTrials = async (req, res) => {
    try {
        const { disease, city, state } = req.body

        const response = await axios.get(URL + `/studies?query.cond=${disease}&query.locn=${city}&countTotal=true&filter.overallStatus=ACTIVE_NOT_RECRUITING,RECRUITING,NOT_YET_RECRUITING&pageSize=4000`)

        const studiesSet = response.data.studies

        const priorityList = []

        const searchDone = true

        function checkCity(item) {
            return item.city.toLowerCase() === city.toLowerCase()
        }

        function checkState(item) {
            return item.state.toLowerCase() === state.toLowerCase()
        }

        studiesSet.filter((study) => {
            if (study.protocolSection.designModule.studyType === 'INTERVENTIONAL' && study.protocolSection.contactsLocationsModule.locations.findIndex(checkCity) !== -1 && study.protocolSection.contactsLocationsModule.locations.findIndex(checkState) !== -1) {
                priorityList.push(study)
            }
        })

        res.render("index.ejs", {
            condition: disease,
            location: city,
            studies: priorityList,
            totalNumber: priorityList.length,
            hasSearched: searchDone
        })
    } catch (error) {
        res.redirect("/")
        console.log("Error, no trial exists");
    }


}

