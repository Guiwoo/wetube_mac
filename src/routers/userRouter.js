import express from "express";
import {
  finishGithubLogin,
  getEdit,
  logout,
  postEdit,
  startGithubLogin,
  userId,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.route("/edit").get(getEdit).post(postEdit);
userRouter.get("/logout", logout);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/:id", userId);

export default userRouter;
