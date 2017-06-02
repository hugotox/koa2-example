const router = require('koa-router')()
const usersApi = require('./api__users')
const todosApi = require('./api__todos')
const adminRequired = require('../auth/api__middleware').adminRequired

router.prefix('/api')

router.get   ('/users', adminRequired, usersApi.fetchUsers)
router.post  ('/users', adminRequired, usersApi.createUser)
router.get   ('/users/:userId', adminRequired, usersApi.fetchUser)
router.patch ('/users/:userId', adminRequired, usersApi.updateUser)
router.delete('/users/:userId', adminRequired, usersApi.deleteUser)

router.get   ('/todos', todosApi.fetchTodos)
router.get   ('/todos/:todoId', todosApi.fetchTodo)

module.exports = router