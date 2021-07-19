import express from "express";
import {
  finishGithubLogin,
  getEdit,
  logout,
  postEdit,
  startGithubLogin,
  userId,
} from "../controllers/userController";
import { protectMiddleware, publicOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.route("/edit").all(protectMiddleware).get(getEdit).post(postEdit);
userRouter.get("/logout", protectMiddleware, logout);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.get("/:id", userId);

export default userRouter;
