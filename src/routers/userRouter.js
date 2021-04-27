import express from "express";
import { handleDelete, handleEdit, logout, userId } from "../controllers/userController";

const userRouter = express.Router();


userRouter.get("/edit",handleEdit)
userRouter.get("/delete",handleDelete)
userRouter.get("/logout",logout)
userRouter.get("/:id",userId)

export default userRouter;