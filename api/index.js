const router = require('koa-router')()
const usersApi = require('./api__users')
const adminRequired = require('../auth/api__middleware').adminRequired

router.prefix('/api')

router.get   ('/users', adminRequired, usersApi.fetchUsers)
router.post  ('/users', usersApi.createUser)
router.get   ('/users/:userId', usersApi.fetchUser)
router.patch ('/users/:userId', usersApi.updateUser)
router.delete('/users/:userId', usersApi.deleteUser)

module.exports = router