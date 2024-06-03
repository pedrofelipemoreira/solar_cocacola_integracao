//import {engine} from 'express-handlebars'
import express from 'express';
import cors from 'cors';
import coon from './db/coon.js' 

//import Rotas
import clientRoutes from "./routes/clientRoutes.js"
import produtoRoutes from "./routes/produtoRoutes.js"

const port = process.env.PORT || 3000;

//coon();
coon(); 
const app = express();

//solve cors
app.use(
    cors({
      // origin: process.env.FRONTEND_URL || "http://localhost:3000"
      origin: "*",
    })
  );

//config json response
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

//Routes
app.use('/clients', clientRoutes);

app.use('/produtos', produtoRoutes);


app.listen(port, function(){
    console.log("Servidor Online!!");
});


