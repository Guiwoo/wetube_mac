import express from "express";

const app = express();

const PORT = 4000;

const handleListening = ()=>{
    console.log(`✅http://localhost${PORT} connected`)
}

app.get("/",(req,res)=>res.send("hello"))

app.listen(PORT,handleListening)