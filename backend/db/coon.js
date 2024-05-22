import mongoose from "mongoose";

async function main(){

    try {

        mongoose.set("strictQuery", true);
        
        await mongoose.connect("mongodb+srv://Pedro:alyRZaY16v575rDy@cluster0.stnpqrc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

        console.log("Conectado ao banco!!")

    } catch (error) {
        console.log(error);
    }

}

export default main;