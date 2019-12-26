module.exports = (sequelize, Types) => {
  const Step = sequelize.define("Step", {
      name: Types.TEXT, //primary key
      active_area_xmin: Types.INTEGER,
      active_area_ymin: Types.INTEGER,
      active_area_xmax: Types.INTEGER,
      active_area_ymax: Types.INTEGER,
      datum_x: Types.INTEGER,
      datum_y: Types.INTEGER,
      limits_xmin: Types.INTEGER,
      limits_ymin: Types.INTEGER,
      limits_xmax: Types.INTEGER,
      limits_ymax: Types.INTEGER,
      num_repeats: Types.INTEGER,
      num_sr: Types.INTEGER,
      prof: Types.TEXT, //freetext JSON
      prof_limits_xmin: Types.INTEGER,
      prof_limits_ymin: Types.INTEGER,
      prof_limits_xmax: Types.INTEGER,
      prof_limits_ymax: Types.INTEGER,
      sr_limits_xmin: Types.INTEGER,
      sr_limits_ymin: Types.INTEGER,
      sr_limits_xmax: Types.INTEGER,
      sr_limits_ymax: Types.INTEGER,
    },{}//options
  )
  Step.associate = function(models) {
    // associations can be defined here
  }
  return Step
}