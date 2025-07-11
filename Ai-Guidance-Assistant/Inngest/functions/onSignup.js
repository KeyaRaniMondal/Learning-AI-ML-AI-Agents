import { NonRetriableError } from "inngest";
import { inngest } from "../client";

export const UserSignup = inngest.createFunction(
    { id: "on-user-signup", retries: 2 },
    { event: "user/signup" },
    async ({ event, step }) => {
        try {
            const email = event.data
            //pipeline 1
            const user = await step.run("get-user-email", async () => {
                const userObject = await UserActivation.findOne({ email })
                if (!userObject) {
                    throw new NonRetriableError("User no longer exists in our database")
                }
                return userObject
            })
            //pipeline 2
            await step.run("send welcome mail", async () => {
                const subject = `welcome to the site`
                const message = `Hi,
    \n\n Thanks for signing up.We'r glad to have you onboard!
    `
                await SendmailTransport(user.email, subject, message)
            })
            return { success: true }
        }
        catch (error) {
            console.error("error running this step", error.message)
            return { success: false }
        }
    }
)