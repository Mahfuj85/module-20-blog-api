import {
  createBlogService,
  deleteBlogService,
  editBlogService,
  readBlogService,
} from "../services/blogService.js";

// Controller function for creating a blog
export const createBlog = async (req, res) => {
  const result = await createBlogService(req.body);
  return res.status(result.status).json(result);
};

// Controller function for reading a blog
export const readBlog = async (req, res) => {
  const result = await readBlogService(req);
  return res.status(result.status).json(result);
};

// Controller function for reading a blog
export const editBlog = async (req, res) => {
  const result = await editBlogService(req);
  return res.status(result.status).json(result);
};

// Controller function for reading a blog
export const deleteBlog = async (req, res) => {
  const result = await deleteBlogService(req);
  return res.status(result.status).json(result);
};
