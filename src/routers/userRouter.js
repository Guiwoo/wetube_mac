import express from "express";
import {
  finishGithubLogin,
  getChangePassword,
  getEdit,
  logout,
  postChangePassword,
  postEdit,
  startGithubLogin,
  userId,
} from "../controllers/userController";
import {
  protectMiddleware,
  publicOnlyMiddleware,
  avatarUploads,
} from "../middlewares";

const userRouter = express.Router();

userRouter
  .route("/edit")
  .all(protectMiddleware)
  .get(getEdit)
  .post(avatarUploads.single("avatar"), postEdit);

userRouter.get("/logout", protectMiddleware, logout);

userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);

userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);

userRouter
  .route("/changePassword")
  .all(protectMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);

userRouter.get("/:id([0-9a-f]{24})", userId);

export default userRouter;
