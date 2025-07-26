import { createAgent,gemini } from "@inngest/agent-kit";

const analyzeTicket=async(guidance)=>{
    const supportAgent=createAgent({
        model:gemini({
            model:"gemini-1.5-flash-8b",
            apiKey: process.env.GEMINI_API_KEY
        }),
        name:"AI Guidance Assistant",
        system:``
    })
const response=await supportAgent.run(``)//to run this
}