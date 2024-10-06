import env from "dotenv"
env.config()

export const SESSION_URL=process.env.SESSION_URL
export const OPENAI_API_KEY=process.env.OPENAI_API_KEY