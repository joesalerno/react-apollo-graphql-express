import React from "react"
const pi2 = Math.PI * 2

export default ({x, y, od, id, angle, num_spokes, gap, ...rest}) => {
  const ir = id / 2
  const or = od / 2
  const startRad = angle * Math.PI / 180

  const halfGap = gap/2
  // const innerHalfGapRadius = Math.sqrt((ir*ir) - (halfGap*halfGap))
  // const outerHalfGapRadius = Math.sqrt((or*or) - (halfGap*halfGap))
  // const innerHalfGapRad = radFromSides(ir, innerHalfGapRadius, halfGap)
  // const outerHalfGapRad = radFromSides(or, outerHalfGapRadius, halfGap)
  const innerHalfGapRad = Math.asin(halfGap/ir)
  const outerHalfGapRad = Math.asin(halfGap/or)

  const segmentRad = num_spokes ? (pi2) / num_spokes : 0

  const sections = []
  const points = []
  for (let i = 0, rad; i < num_spokes; i++) {
    const section = {}

    rad = startRad
        + segmentRad * i
        + innerHalfGapRad
        % pi2
    section.in1x = x + ir * Math.cos(rad)
    section.in1y = y + ir * Math.sin(rad)
    points.push([section.in1x, section.in1y])

    rad = startRad
        + segmentRad * (i+1)
        - innerHalfGapRad
        % pi2
    section.in2x = x + ir * Math.cos(rad)
    section.in2y = y + ir * Math.sin(rad)
    points.push([section.in2x, section.in2y])

    rad = startRad
        + segmentRad * (i+1)
        - outerHalfGapRad
        % pi2
    section.out3x = x + or * Math.cos(rad)
    section.out3y = y + or * Math.sin(rad)
    points.push([section.out3x, section.out3y])

    rad = startRad
        + segmentRad * i
        + outerHalfGapRad
        % pi2
    section.out4x = x + or * Math.cos(rad)
    section.out4y = y + or * Math.sin(rad)
    points.push([section.out4x, section.out4y])

    rad = startRad
        + segmentRad * (i+0.5)
        % pi2
    points.push([x + or * Math.cos(rad), y + or * Math.sin(rad)],
                [x + ir * Math.cos(rad), y + ir * Math.sin(rad)])

    sections.push(section)
  }

  return <path points={JSON.stringify(points)} {...rest} d={sections.reduce((acc, s) => `${acc}
    M ${s.in1x}  ${s.in1y}
    A ${ir}      ${ir}     0 ${num_spokes === 1 ? 1 : 0} 1 ${s.in2x} , ${s.in2y}
    L ${s.out3x} ${s.out3y}
    A ${or}      ${or}     0 ${num_spokes === 1 ? 1 : 0} 0 ${s.out4x}, ${s.out4y}
    Z`
  ,``)}/>
}