import express from "express";
import { handleDelete, handleEdit } from "../controllers/userController";

const userRouter = express.Router();


userRouter.get("/edit",handleEdit)
userRouter.get("/delete",handleDelete)

export default userRouter;