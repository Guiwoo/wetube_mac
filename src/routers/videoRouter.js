import express from "express";
import {
  deleteVideo,
  getHandleEdit,
  getUpload,
  postHandleEdit,
  postUpload,
  watch,
} from "../controllers/videoController";

const videoRouter = express.Router();

//http://expressjs.com/en/guide/routing.html check up this site about option group
//https://www.regexpal.com Result of regex

videoRouter.get("/:id(\\d+)", watch);

videoRouter.route("/:id(\\d+)/edit").get(getHandleEdit).post(postHandleEdit);

videoRouter.get("/:id(\\d+)/delete", deleteVideo);

// videoRouter.get("/upload",uploadVideo)
videoRouter.route("/upload").get(getUpload).post(postUpload);

export default videoRouter;
