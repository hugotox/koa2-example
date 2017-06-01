const router = require('koa-router')()
const authApi = require('./api__auth')

router.prefix('/auth')

router.post  ('/login', authApi.login)
router.post  ('/signup', authApi.signUp)

module.exports = router