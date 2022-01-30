const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      validate: {
        max: -1
      }
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    summary: {
      type: DataTypes.STRING,
      allowNull: false
    },

    spoonacularScore: {
      type: DataTypes.INTEGER
    },

    healthScore: {
      type: DataTypes.INTEGER 
    },

    instructions: {
      type: DataTypes.STRING
    }

  }, {
    timestamps: false
  });
};
