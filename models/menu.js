'use strict';
module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define(
    'Menu',
    {
      name: DataTypes.STRING,
      avatar: DataTypes.STRING,
      price: DataTypes.INTEGER,
      description: DataTypes.STRING,
      restaurantId: DataTypes.INTEGER,
    },
    {},
  );
  Menu.associate = function(models) {
    // associations can be defined here
    Menu.belongsTo(models.Restaurant, {
      foreignKey: 'restaurantId',
      as: 'restaurant',
    });
  };
  return Menu;
};
