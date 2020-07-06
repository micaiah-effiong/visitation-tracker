module.exports = function (sequelize, DataType) {
  let model = sequelize.define("worker", {
    type: {
      type: DataType.ENUM,
      allowNull: false,
      defaultValue: "VIS",
      values: ["ST", "SF", "AD", "RS"],
      set: function (value) {
        this.setDataValue("type", value.toUpperCase());
      },
      get: function () {
        let result;
        switch (this.getDataValue("type")) {
          case "ST":
            result = "Student";
            break;
          case "SF":
            result = "Staff";
            break;
          case "AD":
            result = "Admin";
            break;
          case "RS":
            result = "Residence";
            break;
          default:
            result = "Staff";
        }
        return result;
      },
    },
  });

  model.getUserClass = function (key) {
    let userClass = { ST: "Student", SF: "Staff", AD: "Admin" };
    return userClass[key];
  };

  return model;
};
