//import {engine} from 'express-handlebars'
import express from 'express';
import cors from 'cors';
import coon from './db/coon.js' 

//import Rotas
import clientRoutes from "./routes/clientRoutes.js"
import produtoRoutes from "./routes/produtoRoutes.js"

//coon();
coon(); 
const app = express();

app.use(cors()); 

//config json response
app.use(express.json());


//Routes
app.use('/clients', clientRoutes);

app.use('/produtos', produtoRoutes);


app.listen(3000, function(){
    console.log("Servidor Online!!");
});


