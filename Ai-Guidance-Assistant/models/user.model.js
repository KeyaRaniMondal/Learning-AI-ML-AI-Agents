import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user", enum: ["user", "moderator", "admin"] },//enum is just an array which have multiple things
    skills: [String],
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.model("User", userSchema)