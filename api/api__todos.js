const Todo = require('../models').Todo
const TodoItem = require('../models').TodoItem

module.exports = {
  fetchTodos: async (ctx, next) => {
    const { userId } = ctx.state.user
    try {
      ctx.body = await Todo.findAll({
        where: { userId },
        include: [{
          model: TodoItem,
          as: 'todoItems'
        }]
      })
    } catch (err) {
      ctx.status = 400
      ctx.body = err
    }
  },

  fetchTodo: async (ctx) => {
    const { userId } = ctx.state.user
    try {
      const todo = await Todo.findOne({
        where: { userId, id: ctx.params.todoId },
        include: [{
          model: TodoItem,
          as: 'todoItems'
        }]
      })
      if(todo) {
        ctx.body = todo
      } else {
        ctx.status = 404
        ctx.body = {
          message: 'Todo not found'
        }
      }
    } catch (err) {
      ctx.status = 400
      ctx.body = err
    }
  }
}