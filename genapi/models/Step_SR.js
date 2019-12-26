module.exports = (sequelize, Types) => {
  const Step_SR = sequelize.define("Step_SR", {
      ref: Types.TEXT, //foreign key
      step: Types.TEXT,
      xa: Types.INTEGER,
      ya: Types.INTEGER,
      dx: Types.INTEGER,
      dy: Types.INTEGER,
      nx: Types.INTEGER,
      ny: Types.INTEGER,
      angle: Types.INTEGER,
      mirror: Types.INTEGER,
      xmin: Types.INTEGER,
      ymin: Types.INTEGER,
      xmax: Types.INTEGER,
      ymax: Types.INTEGER,
    },{}//options
  )
  Step_SR.associate = function(models) {
    // associations can be defined here
  }
  return Step_SR
}