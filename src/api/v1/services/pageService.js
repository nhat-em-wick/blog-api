const _Page = require("../models/pageModel");

const getBySlug = async ({slug}) => {
  const page = await _Page.findOne({ slug });
  if(!page) {
    return {
      page: null,
      errorPage: {
        status: 404,
        message: 'Not found page'
      }
    }
  }
  return {
    page,
    errorPage: null
  }
};

const createPage = async ({title, content, author}) => {
  const page = await _Page.create({ title, content, author });
  return page;
};

const editPage = async (slug, {content, title}) => {
  const page = await _Page.findOneAndUpdate(
    { slug: slug },
    {
      title: title,
      content: content,
    },
    {
      new: true,
    }
  );
  if(!page) {
    return {
      page: null,
      errorPage: {
        status: 404,
        message: 'Not found page'
      }
    }
  }
  return {
    page,
    errorPage: null
  }
};

const getAll = async (page, limit) => {
  const pages = await _Page
    .find()
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  return {
    pages: pages,
    pagination: {
      page: page,
      limit: limit,
      total: pages.length
    }
  }
};

const deletePage = async ({slug}) => {
  const page = await _Page.findOneAndDelete({slug})
  if(!page) {
    return {
      page: null,
      errorPage: {
        status: 404,
        message: 'Not found page'
      }
    }
  }
  return {
    page,
    errorPage: null
  }
} 

module.exports = {
  getBySlug,
  createPage,
  editPage,
  getAll,
  deletePage
};
