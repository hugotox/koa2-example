const User = require('../models').User
const Todo = require('../models').Todo

module.exports = {
  fetchUsers: async (ctx, next) => {
    // const { email, id, isAdmin } = ctx.state.user
    // console.log('User', ctx.state.user)
    try {
      ctx.body = await User.all({
        include: [{
          model: Todo,
          as: 'userTodos',
        }]
      })
    } catch (err) {
      ctx.status = 400
      ctx.body = err
    }
  },

  fetchUser: async (ctx, next) => {
    try {
      const user = await User.findById(ctx.params.userId)
      if(user) {
        ctx.body = user
      } else {
        this.status = 404
        ctx.body = {
          message: 'User not found'
        }
      }
    } catch (err) {
      ctx.status = 400
      ctx.body = err
    }
  },

  createUser: async (ctx, next) => {
    try {
      ctx.body = await User.create(ctx.request.body)
    } catch (err) {
      ctx.status = 400
      ctx.body = err
    }
  },

  updateUser: async (ctx, next) => {
    try {
      const user = await User.findById(ctx.params.userId)
      if(user) {
        const payload = ctx.request.body
        ctx.body = await user.update({
          firstName: payload.firstName || user.firstName,
          lastName: payload.lastName || user.lastName,
          email: payload.email || user.email,
          password: payload.password || user.password,
        })
      } else {
        this.status = 404
        ctx.body = {
          message: 'User not found'
        }
      }
    } catch (err) {
      ctx.status = 400
      ctx.body = err
    }
  },

  deleteUser: async (ctx, next) => {
    try {
      const user = await User.findById(ctx.params.userId)
      if(user) {
        user.destroy()
        this.status = 204
        ctx.body = {}
      } else {
        this.status = 404
        ctx.body = {
          message: 'User not found'
        }
      }
    } catch (err) {
      ctx.status = 400
      ctx.body = err
    }
  }
}