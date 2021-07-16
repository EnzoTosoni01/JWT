'use strict';

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: "El nombre solo puede contener letras"

        },
        len: {
          args: [2, 255],
          msg: "El nombre tiene que ser minimamente de dos caracteres "
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      len: {
        args: [6, 255],
        msg: "La contraseña tiene que tener minimamente 6 caracteres"
      }

    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "El email tiene que ser un correo valido"
        }
      }
    },
  }, {
    tableName: "users"
  });

  User.associate = function (models) {
    // associations can be defined here

    User.hasMany(models.Post, { as: "posts", foreignKey: "userId" })
    User.belongsToMany(models.Role, { as: "roles", through: "user_role", foreignKey: "user_id" });

  };


  //comprueba que el usuario es admin
  User.isAdmin = function (roles) {

    let tmpArray = [];
    roles.forEach(role => tmpArray.push(role.role));

    return tmpArray.includes("admin");

  }

  return User;
};