
import { OPENAI_API_KEY } from "../config.js";
import { OpenAI } from 'openai'

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
})

export const getChatCompletion = async (description) => {
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: "user", content: `Succintly summarize and simplify the trial description ${description} for a patient who is not familiar with scientific jargon` }],
            model: "gpt-4o-mini"
        })
        const summarizedResult = chatCompletion.choices[0].message.content
        return summarizedResult
    } catch (error) {
        console.error("Error with OpenAI call:", error);
    }
}


