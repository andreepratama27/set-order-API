'use strict';
module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define(
    'Schedule',
    {
      day: DataTypes.STRING,
      from: DataTypes.STRING,
      to: DataTypes.STRING,
      restaurantId: DataTypes.INTEGER,
    },
    {},
  );
  Schedule.associate = function(models) {
    // associations can be defined here
    Schedule.belongsTo(models.Restaurant, {
      foreignKey: 'restaurantId',
      as: 'restaurant',
    });
  };
  return Schedule;
};
