import mongoose from "mongoose";

const ConnectDb =  async() =>{
        try {
            await mongoose.connect(process.env.MONOGO_URL as string);
            console.log("Database Connected")
        } catch (error) {
            console.log(`Error: Database Not Connected`)
        }
}

export default ConnectDb;