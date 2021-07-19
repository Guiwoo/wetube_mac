import express from "express";
import {
  deleteVideo,
  getHandleEdit,
  getUpload,
  postHandleEdit,
  postUpload,
  watch,
} from "../controllers/videoController";
import { protectMiddleware } from "../middlewares";

const videoRouter = express.Router();

//http://expressjs.com/en/guide/routing.html check up this site about option group
//https://www.regexpal.com Result of regex

videoRouter.get("/:id([0-9a-f]{24})", watch);

videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectMiddleware)
  .get(getHandleEdit)
  .post(postHandleEdit);

videoRouter.get("/:id([0-9a-f]{24})/delete", protectMiddleware, deleteVideo);

videoRouter
  .route("/upload")
  .all(protectMiddleware)
  .get(getUpload)
  .post(postUpload);
// videoRouter.get("/upload",uploadVideo)

export default videoRouter;
