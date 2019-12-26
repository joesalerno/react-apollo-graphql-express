module.exports = (sequelize, Types) => {
  const Step_ATTR = sequelize.define("Step_ATTR", {
      ref: Types.TEXT, //foreign key
      name: Types.TEXT,
      val: Types.TEXT,
    },{}//options
  )
  Step_ATTR.associate = function(models) {
    // associations can be defined here
  }
  return Step_ATTR
}