import express from "express";
import {
  createBlog,
  deleteBlog,
  editBlog,
  readBlog,
} from "../controllers/blogController.js";
import { auth } from "./../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-blog", auth, createBlog);
router.get("/read-blog", auth, readBlog);
router.put("/edit-blog/:id", auth, editBlog);
router.delete("/delete-blog/:id", auth, deleteBlog);

export default router;
