'use strict';

const Sequelize = require('sequelize').Sequelize
const Todo = require('./model__todo')

module.exports = function (sequelize, DataTypes) {
  const TodoItem = sequelize.define('TodoItem', {
    todoId: {
      type: Sequelize.INTEGER,
      references: {
        model: Todo,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    classMethods: {
      associate: function (models) {
        TodoItem.belongsTo(models.Todo, {
          foreignKey: 'todoId',
          onDelete: 'CASCADE'
        })
      }
    }
  });
  return TodoItem;
};