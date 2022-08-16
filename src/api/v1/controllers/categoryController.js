const {
  createCategory,
  getCategories,
  getBySlug,
  editCate,
  deleteCate,
} = require("../services/categoryService");

const categoryController = {
  create: async (req, res, next) => {
    try {
      const { name, slug, parentId } = req.body;
      res.status(201).json({
        element: await createCategory(name, parentId),
        code: 201,
        message: "success",
      });
    } catch (error) {
      console.error(`Error ::: ${error}`);
      next({ status: 500, message: "Error create category" });
    }
  },
  getAll: async (req, res, next) => {
    const {q} = req.query
    
    try {
      res.status(200).json({
        elements: await getCategories(q),
        code: 200,
        message: "success",
      });
    } catch (error) {
      console.error(`Error ::: ${error}`);
      next({ status: 500, message: "Error get categories" });
    }
  },
  getOne: async (req, res, next) => {
    try {
      const { slug } = req.params;
     
      const {errorCate, category} = await getBySlug(slug);
      if (errorCate && !category) {
        return next({status: errorCate.status, message: errorCate.message})
      }
      return res.status(200).json({
        element: category,
        code: 200,
        message: "success",
      });
    } catch (error) {
      console.error(`Error ::: ${error}`);
      next({ status: 500, message: "Error get category" });
    }
  },
  edit: async (req, res, next) => {
    try {
      const { slug } = req.params;
      const { name, parentId } = req.body;
      const {errorCate, category} = await editCate(slug, name, parentId);
      if(errorCate && !category) {
        return next({status: errorCate.status, message: errorCate.message})
      }
      return res.status(200).json({
        element: category,
        code: 200,
        message: "success",
      });
    } catch (error) {
      console.error(`Error ::: ${error}`);
      next({ status: 500, message: "Error edit category" });
    }
  },
  delete: async (req, res, next) => {
    try{
      const {slug} = req.params
      const {errorCate, category} = await deleteCate(slug)
      if(errorCate && !category) {
        return next({status: errorCate.status, message: errorCate.message})
      }

      return res.status(200).json({
        element: category,
        code: 200,
        message: "success",
      });
    }catch(error) {
      console.error(`Error ::: ${error}`);
      next({ status: 500, message: "Error delete category" });
    }
  }
};

module.exports = categoryController;
