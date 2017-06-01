const jwt = require('jsonwebtoken')
const User = require('../models').User

module.exports = {
  login: async (ctx) => {
    const { email, password } = ctx.request.body
    // dummy login credentials
    if(email === 'hpineda83@gmail.com' && password === '123456') {
      const user = await User.findOne({ where: { email } })
      if(user) {
        const token = jwt.sign({ userId: user.id }, 'shared-secret')
        ctx.body = {
          success: true,
          token
        }
      } else {
        ctx.status = 404
        ctx.body = {
          message: 'User not found'
        }
      }
    } else {
      ctx.body = {
        success: false
      }
    }
  },

  signUp: async (ctx) => {
    ctx.body = 'Under construction'
  },
}