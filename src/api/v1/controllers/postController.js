const {
  createPost,
  getAll,
  getOne,
  editPost,
  deletePost,
} = require("../services/postService");

const postController = {
  getAll: async (req, res, next) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const q = req.query.q;
    
    try {
      res.status(200).json({
        elements: await getAll({page, limit, q}),
        code: 200,
        message: "success",
      });
    } catch (error) {
      console.log(`Error ::: ${error}`);
      next({ status: 500, message: "Error get all posts" });
    }
  },
  create: async (req, res, next) => {
    try {
      const { title, content, categories, thumbnail } = req.body;
      res.status(201).json({
        element: await createPost({
          title,
          content,
          thumbnail,
          categories,
          author: req.user.name,
        }),
        code: 201,
        message: "success",
      });
    } catch (error) {
      next(error);
      console.log(`Error ::: ${error}`);
    }
  },
  getBySlug: async (req, res, next) => {
    try {
      const { slug } = req.params;
      const {post, errorPost} = await getOne({slug});
      if (!post && errorPost) {
        return next({status: errorPost.status, message: errorPost.message})
      }
      return res.status(200).json({
        element: post,
        code: 200,
        message: "success",
      });
    } catch (error) {
      console.log(`Error ::: ${error}`);
      next({ status: 500, message: "Error get post" });
    }
  },
  edit: async (req, res, next) => {
    try {
      const { slug } = req.params;
      const { title, content, categories, thumbnail } = req.body;
      const {post, errorPost} = await editPost(slug, {
        title,
        content,
        categories,
        thumbnail,
      });
      if (!post && errorPost) {
        return next({status: errorPost.status, message: errorPost.message})
      }
      return res.status(200).json({
        element: post,
        code: 200,
        message: "success",
      });
    } catch (error) {
      console.log(`Error ::: ${error}`);
      next({ status: 500, message: "Error edit post" });
    }
  },
  delete: async (req, res, next) => {
    try {
      const { slug } = req.params;
      const {post, errorPost} = await deletePost({slug});
      if (!post && errorPost) {
        return next({status: errorPost.status, message: errorPost.message})
      }
      return res.status(200).json({
        element: post,
        code: 200,
        message: "success",
      });
    } catch (error) {
      console.log(`Error ::: ${error}`);
      next({ status: 500, message: "Error delete post" });
    }
  },
};

module.exports = postController;
