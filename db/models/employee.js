'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    name: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    sector: DataTypes.STRING,
    rg: DataTypes.STRING,
    cpf: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    number: DataTypes.STRING,
    complement: DataTypes.STRING,
    district: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    cep: DataTypes.STRING,
  }, {});
  Employee.associate = function(models) {
    Employee.belongsTo(models.Function);
    Employee.belongsTo(models.Company);
    Employee.belongsTo(models.EmployeeStatus);
  };
  return Employee;
};