const _Post = require("../models/postModel");

const createPost = async ({
  title,
  content,
  thumbnail,
  categories,
  author,
}) => {
  const newBlog = await _Post.create({
    title,
    content,
    thumbnail,
    categories,
    author,
  });
  return newBlog;
};

const getAll = async ({ page, limit, q, category }) => {
  let conditions = { $or: [] };
  if (q) {
    conditions.$or.push({ $text: { $search: q } });
  }
  if (category) {
    conditions.$or.push({ categories: { $in: [category] } });
  }
  let count;
  let res;
  if (conditions.$or.length > 0) {
    const posts = await _Post
      .find(conditions)
      .populate("categories")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
    count = await _Post.countDocuments(conditions);
    res = posts;
  } else {
    const posts = await _Post
      .find()
      .populate("categories")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
    count = await _Post.countDocuments();
    res = posts;
  }

  return {
    posts: res,
    pagination: {
      page: +page,
      limit: +limit,
      total: count,
    },
  };
};

const getOne = async ({ slug }) => {
  const post = await _Post.findOne({ slug: slug }).populate("categories");
  if (!post) {
    return {
      post: null,
      errorPost: {
        status: 404,
        message: "Not found post",
      },
    };
  }
  return {
    post: post,
    errorPost: null,
  };
};

const editPost = async (slug, { title, content, categories, thumbnail }) => {
  const post = await _Post.findOneAndUpdate(
    { slug: slug },
    {
      title: title,
      content: content,
      categories: categories,
      thumbnail: thumbnail,
    },
    {
      new: true,
    }
  );
  if (!post) {
    return {
      post: null,
      errorPost: {
        status: 404,
        message: "Not found post",
      },
    };
  }
  return {
    post: post,
    errorPost: null,
  };
};

const deletePost = async ({ slug }) => {
  const post = await _Post.findOneAndDelete({ slug: slug });
  if (!post) {
    return {
      post: null,
      errorPost: {
        status: 404,
        message: "Not found post",
      },
    };
  }
  return {
    post: post,
    errorPost: null,
  };
};

module.exports = {
  createPost,
  getAll,
  getOne,
  editPost,
  deletePost,
};
