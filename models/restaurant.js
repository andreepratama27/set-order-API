'use strict';
module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define(
    'Restaurant',
    {
      name: DataTypes.STRING,
      avatar: DataTypes.STRING,
      street: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      approved: DataTypes.BOOLEAN,
    },
    {},
  );
  Restaurant.associate = function(models) {
    // associations can be defined here
  };
  return Restaurant;
};
