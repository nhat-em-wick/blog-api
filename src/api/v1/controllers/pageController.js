const {createPage, getBySlug, editPage, getAll, deletePage} = require('../services/pageService')

const pageController = {
  create: async (req, res, next) => {
    try{
      const {title, content} = req.body
      res.status(201).json({
        element: await createPage({title, content, author: req.user.name}),
        code: 200,
        message: 'success'
      })
    }catch(error) {
      console.error(`Error ::: ${error}`);
      next({ status: 500, message: "Error create page" });
    }
  },
  getAll: async (req, res, next) => {
    try{
      const {page, limit, q} = req.query
      return res.status(200).json({
        elements: await getAll(page, limit, q),
        code: 200,
        message: 'success'
      })
    }catch(error) {
      console.error(`Error ::: ${error}`);
      next({ status: 500, message: "Error get all page" });
    } 
  },
  getOne: async(req, res, next) => {
    const {slug} = req.params
    try{
      const {page, errorPage} = await getBySlug({slug})
      if (!page && errorPage) {
        return next({status: errorPage.status, message: errorPage.message})
      }
      return res.status(200).json({
        element: page,
        code: 200,
        message: 'success'
      })
    }catch(error) {
      console.error(`Error ::: ${error}`);
      next({ status: 500, message: "Error get page" });
    }
  },
  edit: async (req, res, next) => {
    try{
      const {slug} = req.params
      const {content, title} = req.body
      const {page, errorPage} = await editPage(slug, {content, title})
      if (!page && errorPage) {
        return next({status: errorPage.status, message: errorPage.message})
      }
      return res.status(200).json({
        element: page,
        code: 200,
        message: 'success'
      })
    }catch(error) {
      console.error(`Error ::: ${error}`);
      next({ status: 500, message: "Error edit page" });
    }
  },
  delete: async (req, res, next) => {
    try{
      const {slug} = req.params
      const {page, errorPage} = await deletePage({slug})
      if (!page && errorPage) {
        return next({status: errorPage.status, message: errorPage.message})
      }
      return res.status(200).json({
        element: page,
        code: 200,
        message: 'success'
      })
    }catch(error) {
      console.error(`Error ::: ${error}`);
      next({ status: 500, message: "Error delete page" });
    }
  }
}

module.exports = pageController