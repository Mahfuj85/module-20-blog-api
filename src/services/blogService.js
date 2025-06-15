import mongoose from "mongoose";
import BlogModel from "../models/blogModel.js";

//const { ObjectId } = mongoose.Types;

// Service for creating a blog
export const createBlogService = async (body) => {
  try {
    const reqBody = body;

    let blog = await BlogModel.create(reqBody);

    return {
      status: 200,
      blog,
      message: "Blog created successfully",
    };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error" };
  }
};

// Service for reading a blog
export const readBlogService = async (req) => {
  try {
    const blogs = await BlogModel.find({});

    return {
      status: 200,
      blogs,
    };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error" };
  }
};

// Service for editing a blog
export const editBlogService = async (req) => {
  try {
    const blog = await BlogModel.findById(req.params.id);

    if (blog) {
      blog.title = req.body.title || blog.title;
      blog.description = req.body.description || blog.description;
      blog.image = req.body.image || blog.image;
      blog.author = req.body.author || blog.author;

      const updatedBlog = await blog.save();

      return {
        status: 200,
        updatedBlog,
        message: "Blog updated successfully",
      };
    } else {
      return {
        status: 404,
        message: "Blog not found",
      };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error" };
  }
};

// Service for deleting a blog
export const deleteBlogService = async (req) => {
  try {
    const blog = await BlogModel.findById(req.params.id);

    if (blog) {
      await blog.deleteOne();
      return {
        status: 200,
        message: "Blog removed successfully",
      };
    } else {
      return {
        status: 404,
        message: "Blog not found",
      };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error" };
  }
};
