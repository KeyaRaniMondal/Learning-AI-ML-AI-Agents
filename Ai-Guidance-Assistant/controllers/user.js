import { inngest } from "../Inngest/client"
import User from "../models/user.model"
//for signing up
export const signup = async (req, res) => {
    const { email, password, skills = [] } = req.body
    try {
        const hashed = becrypt.hash(password, 10)
        const user = await User.create({ email, password: hashed, skills })
        //trigger inngest event
        await inngest.send({
            name: "user/signup",
            data: {
                email
            }
        })
        const token = Jwt.sign({ _id: user._id, role: user.role }.process.env.JWT_SECRET)
        res.json({ user, token })
    }
    catch (error) {
        res.status(500).json({ error: "Sign up failed", details: error.message })
    }
}

//For looging in
export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = User.findOne({ email })
        if (!user)
            return res.status(401).json({ error: "User not found" })
        const isMatched = await becrypt.compare(password, user.password)
        if (!isMatched)
            return res.status(401).json({ error: "Invalid credentials" })
        const token = jwt.sign({ _id: user._id, role: user.role }.process.env.JWT_SECRET)
        res.json({ user, token })
    }
    catch (error) {
        res.status(500).json({ error: "Login failed", details: error.message })
    }
}

//For LogOut
//here user will get loged out if and only if jwt token is expired
export const logOut = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token)
            return res.status(401).json({ error: "Unauthorized" })
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.status(401).json({ error: "Unauthorized" })
        })
        res.json({ message: "Logout successfully" })
    }
    catch (error) {
        res.status(500).json({ error: "Logout failed", details: error.message })
    }
}



//For Update
export const updateUser=async(req,res)=>{
    const {skills=[],role,email}=req.body
    try{
if(require.user?.role!="admin"){
    
}
    }
    catch(error){

    }
}