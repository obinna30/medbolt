'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobListing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  JobListing.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    title: DataTypes.STRING,
    jobType: DataTypes.STRING,
    department: DataTypes.STRING,
    jobDescription: DataTypes.TEXT,
    nameOfInstitution: DataTypes.TEXT,
    location: DataTypes.STRING,
    remote: DataTypes.BOOLEAN,
    yearsOfExperience: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'JobListing',
  });
  return JobListing;
};