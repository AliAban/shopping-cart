const express = require("express");
const cors = require("cors");
const products = require("./products");
const app = express();

app.use(express.json()); //required to deal with res.body

app.use(cors()); // required to access the api from a different domain

app.get("/", (req, res)=>{
    res.send("welcome to the sc api");
})

app.get("/products", (req,res)=>{
    res.send(products); 
})

app.listen(3000, console.log("server running on port 3000"));

