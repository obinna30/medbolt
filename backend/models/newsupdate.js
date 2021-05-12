'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NewsUpdate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      NewsUpdate.belongsTo(models.User)
    }
  };
  NewsUpdate.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    title: DataTypes.STRING,
    article: DataTypes.TEXT,
    author: DataTypes.STRING,
    articleReference: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'NewsUpdate',
  });
  return NewsUpdate;
};