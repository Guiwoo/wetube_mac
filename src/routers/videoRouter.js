import express from "express";
import { deleteVideo, handleEdit, myVideo, uploadVideo } from "../controllers/videoController";

const videoRouter = express.Router();

//http://expressjs.com/en/guide/routing.html check up this site about option group
//https://www.regexpal.com Result of regex

videoRouter.get("/upload",uploadVideo)
videoRouter.get("/:id(\\d+)",myVideo)
videoRouter.get("/:id(\\d+)/edit",handleEdit)
videoRouter.get("/:id(\\d+)/delete",deleteVideo)

export default videoRouter;