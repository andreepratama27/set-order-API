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
    Restaurant.hasMany(models.Menu, {as: 'menu'});
    Restaurant.hasMany(models.Schedule, {as: 'schedule'});
    Restaurant.hasMany(models.Section, {as: 'section'});
  };
  return Restaurant;
};
