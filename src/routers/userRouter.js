import express from "express";
import {
  finishGithubLogin,
  handleEdit,
  logout,
  startGithubLogin,
  userId,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/edit", handleEdit);
userRouter.get("/logout", logout);
userRouter.get("/:id", userId);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);

export default userRouter;
