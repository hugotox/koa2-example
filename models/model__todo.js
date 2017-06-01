'use strict';

const Sequelize = require('sequelize').Sequelize
const User = require('./model__user')


module.exports = function(sequelize, DataTypes) {
  const Todo = sequelize.define('Todo', {
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: User,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Todo.hasMany(models.TodoItem, {
          foreignKey: 'todoId',
          as: 'todoItems'
        })
        Todo.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        })
      }
    }
  });
  return Todo;
};