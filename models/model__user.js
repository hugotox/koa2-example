module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.TEXT,
    isAdmin: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function (models) {
        User.hasMany(models.Todo, {
          foreignKey: 'userId',
          as: 'userTodos'
        })
      }
    }
  });
  return User
};
