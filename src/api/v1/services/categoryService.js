const _Category = require("../models/categoryModel");
const pagination = require("../utils/pagination");

const findParent = (categories, parentId) => {
  const parent = categories.find((item) => item.id === parentId);
  return parent;
};

const findChildren = (categories, parentId = null) => {
  const arr = [];
  let temp;
  if (parentId === null) {
    temp = categories.filter(
      (item) => item.parentId === "62e17427d5b99a1f2db150e9"
    );
  } else {
    temp = categories.filter((item) => item.parentId === parentId);
  }
  for (let cate of temp) {
    arr.push({
      _id: cate.id,
      name: cate.name,
      slug: cate.slug,
      children: findChildren(categories, cate.id),
    });
  }
  return arr;
};

const createListCate = (categories) => {
  const arr = [];
  for (let cate of categories) {
    arr.push({
      _id: cate.id,
      name: cate.name,
      slug: cate.slug,
      children: findChildren(categories, cate.id),
      parent:
        cate.parentId === "62e17427d5b99a1f2db150e9"
          ? null
          : findParent(categories, cate.id),
    });
  }
  return arr;
};

const createCategory = async (name, parentId) => {
  if (parentId === "" || !parentId) {
    return await (await _Category.create({ name })).populate("parentId");
  } else {
    return await (
      await _Category.create({ name, parentId })
    ).populate("parentId");
  }
};

const getCategories = async (q) => {
  let condition;
  if (q) {
    condition = { $text: { $search: q } };
  } else {
    condition = {};
  }
  const categories = await _Category.find(condition).sort({ createdAt: -1 });
  return {
    categories: createListCate(categories),
  };
};

const getBySlug = async (slug) => {
  const category = await _Category.findOne({ slug }).populate("parentId");
  if (!category) {
    return {
      category: null,
      errorCate: {
        status: 404,
        message: "Not found category",
      },
    };
  }
  return {
    category,
    errorCate: null,
  };
};

const editCate = async (slug, name, parentId) => {
  const category = await _Category.findOneAndUpdate(
    { slug },
    {
      name: name,
      parentId: parentId || '62e17427d5b99a1f2db150e9',
    },
    {
      new: true,
    }
  );
  if (!category) {
    return {
      category: null,
      errorCate: {
        status: 404,
        message: "Not found category",
      },
    };
  }
  return {
    category,
    errorCate: null,
  };
};

const deleteCate = async (slug) => {
  const category = await _Category.findOneAndDelete({ slug: slug });
  if (!category) {
    return {
      category: null,
      errorCate: {
        status: 404,
        message: "Not found category",
      },
    };
  }
  return {
    category,
    errorCate: null,
  };
};

module.exports = {
  createCategory,
  getCategories,
  getBySlug,
  editCate,
  deleteCate,
};
