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

videoRouter.get("/:id([0-9a-f]{24})", watch);

videoRouter.route("/:id/edit").get(getHandleEdit).post(postHandleEdit);

videoRouter.get("/:id(\\d+)/delete", deleteVideo);

videoRouter.route("/upload").get(getUpload).post(postUpload);
// videoRouter.get("/upload",uploadVideo)

export default videoRouter;
