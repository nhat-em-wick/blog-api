const router = require('express').Router()
const pageController = require('../controllers/pageController')
const verifyToken = require('../middlewares/verifyToken')

router.delete('/:slug',verifyToken, pageController.delete)
router.put('/:slug',verifyToken, pageController.edit)
router.get('/:slug', pageController.getOne)
router.post('/',verifyToken, pageController.create)
router.get('/', pageController.getAll)

module.exports = router