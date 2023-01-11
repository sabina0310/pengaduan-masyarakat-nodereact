'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tanggapan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tanggapan.init({
    id_tanggapan: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_pengaduan: DataTypes.INTEGER,
    tanggapan: DataTypes.STRING,
    id_petugas: DataTypes.INTEGER
  
  }, {
    sequelize,
    modelName: 'tanggapan',
    tableName: 'tanggapan'
  });


 tanggapan.associate = (models) => {
     
    tanggapan.belongsTo(models.pengaduan,{foreignKey: "id_pengaduan", as: "pengaduan"})}
  
  return tanggapan;

};