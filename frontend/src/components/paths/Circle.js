import React from "react"
export default ({x, y, r}) => <path
  d={`M ${x+r} ${y} A ${r} ${r} 180 1 0 ${x-r} ${y} A ${r} ${r} 180 1 0 ${x+r} ${y}`}
/>