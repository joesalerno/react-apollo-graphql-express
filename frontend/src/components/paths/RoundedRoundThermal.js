import React from "react"

const pi2 = Math.PI * 2
const radFromSides = (a, b, opposite) => {
  if (!a || !b) return 0
  return Math.acos( ((opposite**2) -(a**2) -(b**2))/( -2*a*b ) )
}

export default ({x, y, od, id, angle, num_spokes, gap}) => {
  const halfLw = (od - id) / 4
  const avgR = (od + id) / 4
  const ir = id / 2
  const or = od / 2
  const startRad = angle * Math.PI / 180
  const halfGapRad = radFromSides(avgR, avgR, gap/2)
  const smallArcRad = radFromSides(avgR, avgR, halfLw)
  const segmentRad = num_spokes ? (pi2) / num_spokes : 0

  const sections = []
  for (let i = 0, rad; i < num_spokes; i++) {
    const section = {}

    rad = startRad
        + segmentRad * i
        + halfGapRad
        + smallArcRad
        % pi2
    section.in1x  = x + ir * Math.cos(rad)
    section.in1y  = y + ir * Math.sin(rad)
    section.out4x = x + or * Math.cos(rad)
    section.out4y = y + or * Math.sin(rad)
    
    rad = startRad
        + segmentRad * (i+1)
        - halfGapRad
        - smallArcRad
        % pi2
    section.out3x = x + or * Math.cos(rad)
    section.out3y = y + or * Math.sin(rad)
    section.in2x  = x + ir * Math.cos(rad)
    section.in2y  = y + ir * Math.sin(rad)

    sections.push(section)
  }

  return <path d={sections.reduce((acc, s) => `${acc}
    M ${s.in1x} ${s.in1y}
    A ${ir}     ${ir}     0 0 1 ${s.in2x} , ${s.in2y}
    A ${halfLw} ${halfLw} 0 0 0 ${s.out3x}, ${s.out3y}
    A ${or}     ${or}     0 0 0 ${s.out4x}, ${s.out4y}
    A ${halfLw} ${halfLw} 0 0 0 ${s.in1x} , ${s.in1y}
  `, ``)}/>
}