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
  Employee.associate = function (models) {
    Employee.belongsTo(models.Function);
    Employee.belongsTo(models.Company);
    Employee.belongsTo(models.EmployeeStatus);
    Employee.hasMany(models.EmployeeAttachment);
    Employee.hasMany(models.IntegrationSchedule);
    Employee.hasMany(models.Notification);
  };

  Employee.prototype.getStatusFlow = function () {
    return [{
      status: 1, next: 2
    }, {
      status: 2, next: 3
    }, {
      status: 3, next: 2
    }, {
      status: 2, next: 4
    }]
  }

  Employee.prototype.isStatusFlowValid = function (newStatus) {
    const flowList = this.getStatusFlow();
    const flow = flowList.find(item => item.status == this.EmployeeStatusId && item.next == newStatus);
    return flow ? true : false;
  }

  return Employee;
};