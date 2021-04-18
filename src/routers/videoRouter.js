import express from "express";
import { handleEdit, handleWatch } from "../controllers/videoController";

const videoRouter = express.Router();


videoRouter.get("/watch",handleWatch)
videoRouter.get("/edit",handleEdit)

export default videoRouter;