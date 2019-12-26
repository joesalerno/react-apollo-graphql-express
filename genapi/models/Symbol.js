module.exports = (sequelize, Types) => {
  const Symbol = sequelize.define("Symbol", {
      name: Types.TEXT, //primary key
      feat_hist_line: Types.INTEGER,
      feat_hist_pad: Types.INTEGER,
      feat_hist_surf: Types.INTEGER,
      feat_hist_arc: Types.INTEGER,
      feat_hist_text: Types.INTEGER,
      feat_hist_total: Types.INTEGER,
      feat_hist_line_breaksr: Types.INTEGER,
      feat_hist_pad_breaksr: Types.INTEGER,
      feat_hist_surf_breaksr: Types.INTEGER,
      feat_hist_arc_breaksr: Types.INTEGER,
      feat_hist_text_breaksr: Types.INTEGER,
      feat_hist_total_breaksr: Types.INTEGER,
      
    },{}//options
  )
  Symbol.associate = function(models) {
    // associations can be defined here
  }
  return Symbol
}