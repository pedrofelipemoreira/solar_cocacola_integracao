import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config(); 

const DB_COON = process.env.DB_COON || 3000


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