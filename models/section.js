'use strict';
module.exports = (sequelize, DataTypes) => {
  const Section = sequelize.define(
    'Section',
    {
      name: DataTypes.STRING,
      from: DataTypes.STRING,
      to: DataTypes.STRING,
      description: DataTypes.STRING,
      restaurantId: DataTypes.INTEGER,
    },
    {},
  );
  Section.associate = function(models) {
    // associations can be defined here
    Section.belongsTo(models.Restaurant, {
      foreignKey: 'restaurantId',
      as: 'restaurant',
    });
  };
  return Section;
};
