const router = require('express').Router()
const categoryController = require('../controllers/categoryController')
const verifyToken = require('../middlewares/verifyToken')

router.delete('/:slug',verifyToken, categoryController.delete)
router.put('/:slug',verifyToken, categoryController.edit)
router.get('/:slug', categoryController.getOne)
router.post('/', verifyToken, categoryController.create)
router.get('/', categoryController.getAll)

module.exports = router