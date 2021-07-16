'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    body: DataTypes.TEXT
  }, {
    tableName:"posts"
  });
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.User, {as:"author",foreignKey:"UserId"})
  };
  return Post;
};