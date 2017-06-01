const User = require('../models').User

module.exports = {
  adminRequired: async (ctx, next) => {
    const { userId } = ctx.state.user
    const user = await User.findById(userId)
    if(user.isAdmin) {
      return next()
    } else {
      ctx.status = 403
      ctx.body = {
        message: "Not authorized"
      }
    }
  }
}
