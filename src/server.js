import express from "express";
import morgan from"morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";


const app = express();

const PORT = 4000;

app.use(morgan('dev'));
app.set("view engine","pug")
app.set('views',process.cwd()+"/src/views")
app.use(express.urlencoded({extended:true}))

app.use("/",globalRouter)
app.use("/users",userRouter)
app.use('/videos',videoRouter)


const handleListening = ()=>{
    console.log(`✅http://localhost${PORT} connected`)
}

app.listen(PORT,handleListening)