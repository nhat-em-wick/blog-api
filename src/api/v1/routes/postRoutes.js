const router = require('express').Router()
const postController = require('../controllers/postController')
const verifyToken = require('../middlewares/verifyToken')

router.delete('/:slug',verifyToken, postController.delete)
router.get('/:slug', postController.getBySlug)
router.put('/:slug',verifyToken, postController.edit)
router.get('/', postController.getAll)
router.post('/',verifyToken, postController.create)

module.exports = router