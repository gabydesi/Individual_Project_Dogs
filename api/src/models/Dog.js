const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height_min:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    height_max:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weight_min:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weight_max:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdInDB: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  },{timestamps:false});
};
