import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config(); 

const DB_COON = process.env.DB_COON || "mongodb+srv://Pedro:alyRZaY16v575rDy@cluster0.stnpqrc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


async function main(){  

    try {

        mongoose.set("strictQuery", true);
        
        await mongoose.connect(DB_COON);

        console.log("Conectado ao banco!!")

    } catch (error) {
        console.log(error);
    }

}

export default main;