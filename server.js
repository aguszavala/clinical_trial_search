import express from "express"
import clinicalTrials from './routes/clinicalTrials.js'
import { getChatCompletion } from "./controllers/openaiController.js";


const app = express()
const port = 3000

app.set('view engine','ejs')
app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use('/',clinicalTrials)



app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.post('/api/getChatCompletion', async (req,res)=>{
    const { description } = req.body
    try {
        const result = await getChatCompletion(description)
        res.json(result)
    } catch (error) {
        console.log(console.error());
    }
})

app.listen(port, () => {
    console.log(`Servers is running on port ${port}`);
})