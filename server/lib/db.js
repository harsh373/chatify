import mongoose from "mongoose";

//function to connect to the database
export const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log('Database Connected'));
        await mongoose.connect(`${process.env.MONGODB_URI}/chatify`)
    } catch (error) {
        console.log(error)
        
    }
}