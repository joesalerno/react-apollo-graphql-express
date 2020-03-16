module.exports = text => {
  if (!text) return false
  if (typeof text !== "string") return false

  // Round: r<d>
  // d - circle diameter
  if (text.match(/^r([0]|[1-9]+[0-9]*(\.[0-9]+)?)(_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9]))?$/mg)) return "round"
  
  // Square: s<s>
  // s - square side
  if (text.match(/^s[1-9]+[0-9]*(\.[0-9]+)?(_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9]))?$/mg)) return "square"
  
  // Rectangle: rect<w>x<h>
  // w - rectangle width
  // h - rectangle height
  if (text.match(/^rect[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?(_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9]))?$/mg)) return "rectangle"

  // Rounded Rectangle: rect<w>x<h>xr<rad>x<corners>
  // w - rectangle width
  // h - rectangle height
  // rad - corner radius
  // corners - a combination of which corners are rounded
  // x<corners> is omitted if all corners are rounded
  if (text.match(/^rect[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?xr[1-9]+[0-9]*(\.[0-9]+)?(x[0-8])?(_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9]))?$/mg)) return "rounded rectangle"

  // Chamfered Rectangle: rect<w>x<h>xc<rad>x<corners>
  // w - rectangle width
  // h - rectangle height
  // rad - corner radius
  // corners - a combination of which corners are rounded
  // x<corners> is omitted if all corners are rounded
  if (text.match(/^rect[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?xc[1-9]+[0-9]*(\.[0-9]+)?(x[0-8])?(_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9]))?$/mg)) return "chamfered rectangle"

  // Oval: oval<w>x<h>
  // w - oval width
  // h - oval height
  if (text.match(/^oval[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?(_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9]))?$/mg)) return "oval"

  // Diamond: di<w>x<h>
  // w - diamond width
  // h - diamond height
  if (text.match(/^di[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?(_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9]))?$/mg)) return "diamond"

  // Octagon: oct<w>x<h>x<r>
  // w - octagon width
  // h - octagon height
  // r - corner size
  if (text.match(/^oct[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?(_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9]))?$/mg)) return "octagon"

  // Round Donut: donut_r<od>x<id>
  // od - outer diameter
  // id - inner diameter
  if (text.match(/^donut_r[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?(_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9]))?$/mg)) return "round donut"

  // Square Donut: donut_s<od>x<id>
  // od - outer diameter
  // id - inner diameter
  if (text.match(/^donut_s[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?(_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9]))?$/mg)) return "square donut"

  // Square/Round: Donut donut_sr<od>x<id>
  // od - outer diameter
  // id - inner diameter
  if (text.match(/^donut_sr[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?(_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9]))?$/mg)) return "square/round donut"

  // Rounded Square Donut: donut_s<od>x<id>x<rad>x<corners>
  // od - outer diameter
  // id - inner diameter
  // rad - corner radius
  // corners - a combination of which corners are rounded
  // x<corners> is omitted if all corners are rounded
  if (text.match(/^donut_s[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?(x[0-8])?(_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9]))?$/mg)) return "rounded square donut"

  // Rectangle Donut: donut_rc<ow>x<oh>x<lw>
  // ow - outer width
  // oh - outer height
  // lw - line width
  if (text.match(/^donut_rc[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?(_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9]))?$/mg)) return "rectangle donut"

  // Rounded Rectangle Donut: donut_rc<ow>x<oh>x<lw>x<rad>x<corners>
  // ow - outer width
  // oh - outer height
  // lw - line width
  // rad - corner radius
  // corners - a combination ofwhich corners are rounded
  if (text.match(/^donut_rc[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?(x[0-8])?(_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9]))?$/mg)) return "rounded rectangle donut"

  // Oval Donut: donut_o<ow>x<oh>x<lw>
  // ow - outer width
  // oh - outer height
  // lw - line width
  if (text.match(/^donut_o[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?(_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9]))?$/mg)) return "oval donut"

  // Horizontal Hexagon: hex_l<w>x<h>x<r>
  // w - hexagon width
  // h - hexagon height
  // r - corner size
  if (text.match(/^hex_l[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?(_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9]))?$/mg)) return "horizontal hexagon"

  // Vertical Hexagon: hex_s<w>x<h>x<r>
  // w - hexagon width
  // h - hexagon height
  // r - corner size
  if (text.match(/^hex_s[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?(_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9]))?$/mg)) return "vertical hexagon"

  // Butterfly: bfr<d>
  // d - diameter
  if (text.match(/^bfr[1-9]+[0-9]*(\.[0-9]+)?(_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9]))?$/mg)) return "butterfly"

  // Square Butterfly: bfs<s>
  // s - size
  if (text.match(/^bfs[1-9]+[0-9]*(\.[0-9]+)?(_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9]))?$/mg)) return "square butterfly"

  // Triangle: tri<base>x<h>
  // base - triangle base
  // h - triangle height
  if (text.match(/^tri[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?(_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9]))?$/mg)) return "triangle"

  // Half Oval: oval_h<w>x<h>
  // w - width
  // h - height
  if (text.match(/^oval_h[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?(_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9]))?$/mg)) return "half oval"

  // Round Thermal (Rounded): thr<od>x<id>x<angle>x<num_spokes>x<gap>
  // od - outer diameter
  // id - inner diameter
  // angle - gap angle from 0°
  // num_spokes - number of spokes
  // gap - size of spoke gap
  // Specification of od and id determine the air gap (size of laminate separation)
  if (text.match(/^thr[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?x(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])x[1-9]+[0-9]*x[1-9]+[0-9]*(\.[0-9]+)?(_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9]))?$/mg)) return "round thermal (rounded)"

  // Round Thermal (Squared): ths<od>x<id>x<angle>x<num_spokes>x<gap>
  // od - outer diameter
  // id - inner diameter
  // angle - gap angle from 0°
  // num_spokes - number of spokes
  // gap - size of spoke gap
  // Specification of od and id determine the air gap (size of laminate separation)
  if (text.match(/^ths[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?x(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])x[1-9]+[0-9]*x[1-9]+[0-9]*(\.[0-9]+)?(_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9]))?$/mg)) return "round thermal (squared)"

  // Square Thermal: s_ths<os>x<is>x<angle>x<num_spokes>x<gap>
  // os - outer size
  // is - inner size
  // angle - gap angle from 0°
  // num_spokes - number of spokes
  // gap - size of spoke gap
  if (text.match(/^s_ths[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?x(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])x[1-9]+[0-9]*x[1-9]+[0-9]*(\.[0-9]+)?(_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9]))?$/mg)) return "square thermal"

  // Square Thermal (Open Corners): s_tho<od>x<id>x<angle>x<num_spokes>x<gap>
  // od - outer diameter
  // id - inner diameter
  // angle - gap angle from 0°
  // num_spokes - number of spokes
  // gap - size of spoke gap
  // Specification of od and id determine the air gap (size of laminate separation)
  if (text.match(/^s_tho[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?x(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])x[1-9]+[0-9]*x[1-9]+[0-9]*(\.[0-9]+)?(_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9]))?$/mg)) return "square thermal (open corners)"

  // Square-Round Thermal: sr_ths<os>x<id>x<angle>x<num_spokes>x<gap>
  // os - outer size
  // id - inner diameter
  // angle - gap angle from 0°
  // num_spokes - number of spokes
  // gap - size of spoke gap
  if (text.match(/^sr_ths[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?x(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])x[1-9]+[0-9]*x[1-9]+[0-9]*(\.[0-9]+)?(_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9]))?$/mg)) return "square-round thermal"

  // Rectangular Thermal: rc_ths<w>x<h>x<angle>x<num_spokes>x<gap>x<air_gap>
  // w - outer width
  // h - outer height
  // angle - gap angle from 0°*
  // num_spokes - number of spokes
  // gap - size of spoke gap
  // air_gap - size of laminate separation
  // * angle is limited to multiples of 45 degrees
  if (text.match(/^rc_ths[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?x(0|45|90|135|180|225|270|315)x[1-9]+[0-9]*x[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?(_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9]))?$/mg)) return "rectangular thermal"

  // Rectangular Thermal: (Open Corners) rc_tho<w>x<h>x<angle>x<num_spokes>x<gap>x<air_gap>
  // w - outer width
  // h - outer height
  // angle - gap angle from 0°
  // num_spokes - number of spokes
  // gap - size of spoke gap
  // air_gap - size of laminate separation
  if (text.match(/^rc_tho[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?x(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])x[1-9]+[0-9]*x[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?(_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9]))?$/mg)) return "rectangular thermal (open corners)"

  // Rounded Square Thermal: s_ths<os>x<is>x<angle>x<num_spokes>x<gap>xr<rad>x<corners>
  // os - outer size
  // is - inner size
  // angle - gap angle angle from 0°
  // num_spokes - number of spokes
  // gap - size of spoke gap
  // rad -corner radius
  // corners - a combination of which corners are rounded
  // x<corners> is omitted if all corners are rounded
  if (text.match(/^s_ths[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?x(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])x[1-9]+[0-9]*x[1-9]+[0-9]*(\.[0-9]+)?xr[1-9]+[0-9]*(\.[0-9]+)?(x[0-8])?(_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9]))?$/mg)) return "rounded square thermal"

  // Rounded Rectangle Thermal: rc_ths<ow>x<oh>x<angle>x<num_spokes>x<gap>x<lw>xr<rad>x<corners>
  // ow - outer width
  // oh - outer height
  // lw - line width
  // angle - gap angle from 0°
  // num_spokes - number of spokes
  // gap - size of spoke gap
  // rad -corner radius
  // corners - a combination ofwhich corners are rounded
  // x<corners> is omitted if all corners are rounded
  if (text.match(/^rc_ths[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?x(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])x[1-9]+[0-9]*x[1-9]+[0-9]*(\.[0-9]+)?xr[1-9]+[0-9]*(\.[0-9]+)?(x[0-8])?(_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9]))?$/mg)) return "rounded rectangle thermal"

  // Oval Thermal: o_ths<ow>x<oh>x<angle>x<num_spokes>x<gap>x<lw>
  // ow - outer width
  // oh - outer height
  // angle - gap angle from 0°
  // num_spokes - number of spokes
  // gap - size of spoke gap
  // lw - line width
  if (text.match(/^o_ths[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?x(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])x[1-9]+[0-9]*x[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?(_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9]))?$/mg)) return "oval thermal"

  // Ellipse: el<w>x<h>
  // el5x0
  // w - width
  // h - height
  if (text.match(/^el[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?(_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9]))?$/mg)) return "ellipse"

  // Moire: moire<rw>x<rg>x<nr>x<lw>x<ll>x<la>
  // rw - ring width
  // rg - ring gap
  // nr - number of rings
  // lw - line width
  // ll - line length
  // la - line angle
  if (text.match(/^moire[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*x[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?x(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])(_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9]))?$/mg)) return "moire"

  // Hole: hole<d>x<p>x<tp>x<tm>
  // d  - hole diameter
  // p  - plating status (p(lated), n(on-plated) or v(ia))
  // tp - + tolerance
  // tm -  - tolerance
  // This symbol is specifically intended for wheels created by the Wheel Template Editor for drill files.
  if (text.match(/^hole[1-9]+[0-9]*(\.[0-9]+)?x[pnv]x[1-9]+[0-9]*(\.[0-9]+)?x[1-9]+[0-9]*(\.[0-9]+)?(_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9]))?$/mg)) return "hole"

  // Null null<ext>
  // ext - extension number
  // This symbol is empty and used as a place holder for non-graphic features.
  if (text.match(/^null[0-9]+?$/mg)) return "null"

  // Nope
  return false
}