import React, { useState, useRef, useEffect } from "react"
import BasicLayout from "../components/BasicLayout"

import { closestPoint, closestPointTransform, pointDistance, pointDistance2 } from "../modules"

// import Spinner from "../components/Spinner"
// import Dropdown from "../components/Dropdown"
// import validOdbSymbol from "../modules/validOdbSymbol"

import Circle from "../components/paths/Circle"

import Feature from "../components/Feature"
import FeaturePath from "../components/FeaturePath"

const testLayer0 = [
  {type: "pad", symbol:"r50",                    x:25,  y:50},
  {type: "pad", symbol:"sr_ths50x30x0x7x6",      x:25,  y:110},
  {type: "pad", symbol:"s_ths50x30x0x7x6",       x:25,  y:170},
  {type: "pad", symbol:"s50_12",                 x:85,  y:50},
  {type: "pad", symbol:"thr50x30x0x2x6",         x:85,  y:110},
  {type: "pad", symbol:"ths50x33.33333x0x2x6",   x:85,  y:170},
  {type: "pad", symbol:"rect30x50",              x:135, y:50},
  {type: "pad", symbol:"tri30x50",               x:135, y:170},
  {type: "pad", symbol:"rect30x50xr6",           x:175, y:50},
  {type: "pad", symbol:"ths50x25x0x4x12",        x:175, y:110},
  {type: "pad", symbol:"el30x50",                x:175, y:170},
  {type: "pad", symbol:"rect30x50xc6x12",        x:215, y:50},
  {type: "pad", symbol:"di30x50",                x:255, y:50},
  // Octagon is just shorthand ChamferedRectangle
  {type: "pad", symbol:"hex_s30x50x10",          x:295, y:50},
  {type: "pad", symbol:"hex_l30x50x10",          x:335, y:50},
  {type: "pad", symbol:"donut_rc80x50x10x6x123", x:370, y:170},
  {type: "pad", symbol:"bfr50",                  x:385, y:50},
  {type: "pad", symbol:"donut_r50x30",           x:385, y:110},
  {type: "pad", symbol:"bfs50",                  x:445, y:50},
  {type: "pad", symbol:"donut_s50x30",           x:445, y:110},
  {type: "pad", symbol:"donut_sr50x30",          x:445, y:170},
    // // {/* <HalfOval x={} y={} w={} h={} /> */}



  // {type: "line", symbol:"r10",          xs:-25, xe:495, ys:0, ye:0},
  // {type: "line", symbol:"r10",          xs:-25, xe:-25, ys:0, ye:220},
  // {type: "line", symbol:"r10",          xs:-25, xe:200, ys:220, ye:220},
  // {type: "arc", symbol: "r10",          xs:200, ys: 220, xe: 270, ye: 220, xc: 235, yc: 220, ccw:1},
  // {type: "line", symbol:"r10",          xs:270, xe:495, ys:220, ye:220},
  // {type: "line", symbol:"r10",          xs:495, xe:495, ys:0, ye:220},
  // {type: "arc", symbol:"r10",          xs:600, xe:700, ys:100, ye:200, xc:700, yc:100},
  // {type: "arc", symbol:"r10",          xs:700, xe:800, ys:200, ye:100, xc:700, yc:100},
  // {type: "arc", symbol:"r10",          xs:800, xe:700, ys:100, ye:0, xc:700, yc:100},
  // {type: "arc", symbol:"r10",          xs:700, xe:600, ys:0, ye:100, xc:700, yc:100},
  // {type: "arc", symbol:"r10",          xs:700, xe:600, ys:400, ye:300, xc:700, yc:300},
  // {type: "arc", symbol:"r10",          xs:800, xe:700, ys:300, ye:400, xc:700, yc:300},
  // {type: "arc", symbol:"r10",          xs:700, xe:800, ys:200, ye:300, xc:700, yc:300},
  // {type: "arc", symbol:"r10",          xs:600, xe:700, ys:300, ye:200, xc:700, yc:300},
  // {type: "arc", symbol:"r10",          xs:800, xe:700, ys:400, ye:300, xc:800, yc:300, ccw: 1},
  // {type: "arc", symbol:"r10",          xs:900, xe:800, ys:300, ye:400, xc:800, yc:300},
  // {type: "arc", symbol:"r10",          xs:800, xe:900, ys:200, ye:300, xc:800, yc:300},
  // {type: "arc", symbol:"r10",          xs:700, xe:800, ys:300, ye:200, xc:800, yc:300},
  // {type: "arc", symbol:"r10",          xs:800, xe:900, ys:100, ye:0, xc:900, yc:100, ccw:1},
  // {type: "arc", symbol:"r10", xs:100, xe:0,   ys:0,   ye:100, xc:100, yc:100},
  // {type: "arc", symbol:"r10", xs:0,   xe:100, ys:100, ye:200, xc:100, yc:100},
  // {type: "arc", symbol:"r10", xs:100, xe:200, ys:200, ye:100, xc:100, yc:100},
  // {type: "arc", symbol:"r10", xs:200, xe:100, ys:100, ye:0,   xc:100, yc:100},
  // {type: "arc", symbol:"r10", xs:300, xe:400, ys:0,   ye:100, xc:300, yc:100},
  // {type: "arc", symbol:"r10", xs:400, xe:300, ys:100, ye:200, xc:300, yc:100},
  // {type: "arc", symbol:"r10", xs:300, xe:200, ys:200, ye:100, xc:300, yc:100},
  // {type: "arc", symbol:"r10", xs:200, xe:300, ys:100, ye:0,   xc:300, yc:100},
]

const testLayer1 = [
  {type: "surface", x: 600, y:600, polygons: [{
    points: [
      {x: 0, y:10},
      {x: 50, y: 110},
      {x: 100, y: 10},
      // {x: 0, y:0},
    ],
    polygons: [{
      points: [
        {x: 5, y: 15},
        {x: 95, y: 15},
        {x: 50, y: 105},
      ],
      polygons: [{
        points: [
          {x: 25, y: 35},
          {xe: 50, ye: 10, xc:50, yc: 35},
        ]
      }]
    }]
  }]},

  {type: "surface", x: 600, y:600, polygons: [{
    points: [
      {x: 0, y:110},
      {x: 50, y: 210},
      {x: 100, y: 110},
    ],
    polygons: [{
      points: [
        {x: 50, y: 110},
        {xc: 50, yc: 135, xe: 25, ye: 135, ccw: 1},
      ]
    }]
  }]},

  {type: "surface", x: 600, y:600, polygons: [{
    points: [
      {x: 200, y:110},
      {x: 250, y: 210},
      {x: 300, y: 110},
    ],
    polygons: [{
      points: [
        {x: 225, y: 135},
        {xe: 250, ye: 110, xc: 250, yc: 160, ccw: 1},
      ]
    }]
  }]},

  {type: "surface", x: 600, y:600, polygons: [{
    points: [
      {x: 200, y:10},
      {x: 250, y: 110},
      {x: 300, y: 10},
    ],
    polygons: [{
      points: [
        {x: 205, y:15},
        {x: 295, y: 15},
        {x: 250, y: 105},
      ],
      polygons: [{
        points: [
          {x: 250, y: 10},
          {xc: 250, yc: 35, xe: 225, ye: 35},
        ]
      }]
    }]
  }]},
]

const testLayer2 = [
  {type: "line", symbol:"r10",          xs:-25, xe:495, ys:0, ye:0},
  {type: "line", symbol:"r10",          xs:-25, xe:-25, ys:0, ye:220},
  {type: "line", symbol:"r10",          xs:-25, xe:200, ys:220, ye:220},
  {type: "arc", symbol: "r10",          xs:200, ys: 220, xe: 270, ye: 220, xc: 235, yc: 220, ccw:1},
  {type: "line", symbol:"r10",          xs:270, xe:495, ys:220, ye:220},
  {type: "line", symbol:"r10",          xs:495, xe:495, ys:0, ye:220},
]

// todo fixme js
//
// fix zooming in so x,y of cursor stays same
// 

const preventDefault = e => e.preventDefault()

const EditorPage = ({auth, login, logout}) => {
  const svgRef = useRef(null)    
  
  const [layers, setLayers] = useState([testLayer0, testLayer1, testLayer2])
  const [activeLayer, setActiveLayer] = useState(0)

  const [cursorStyle, setCursorStyle] = useState("crosshair")
  const [isPointerInWindow, setIsPointerInWindow] = useState(false)
  const [isPointerDown, setIsPointerDown] = useState(false)
  const [pointerPosition, setPointerPosition] = useState(false)
  const [pointerOrigin, setPointerOrigin] = useState(false)
  
  const [activeTool, setActiveTool] = useState(false)
  // const [closestPathPoint, setClosestPathPoint] = useState(false)
  const [selectedPoints, setSelectedPoints] = useState([])
  const [snapToEdges, setSnapToEdges] = useState(true)
  const [snapToCenter, setSnapToCenter] = useState(false)

  const [hoveredFeature, setHoveredFeature] = useState("none")
  const [selectedFeatures, setSelectedFeatures] = useState([])

  const [viewbox, setViewbox] = useState({x:0, y:0, width:0, height:0})
  const [flipX, setFlipX] = useState(false)
  const [flipY, setFlipY] = useState(false)
  const [showNavBar, setShowNavBar] = useState(true)
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF")
  const [layerColors, setLayerColors] = useState({default: "#005291", 1:"#a30000", 2:"#529100"})


  const resetZoom = () => {
    const bbox = svgRef.current.getBBox()
    svgRef.current.setAttribute("viewBox", `${bbox.x-20} ${bbox.y-20} ${bbox.width+40} ${bbox.height+40}`)
    setViewbox(bbox)
  }

  const changeLightness = (colorhash, multiplier) => {
    const [ , numbers ] = colorhash.split(/#/g)
    console.log(colorhash, multiplier)
    let n1 = parseInt(`0x${numbers.substr(0, 2)}`)
    let n2 = parseInt(`0x${numbers.substr(2, 2)}`)
    let n3 = parseInt(`0x${numbers.substr(4, 2)}`)
    n1 = parseInt(n1 * multiplier > 255 ? 255 : n1 * multiplier).toString(16)
    n2 = parseInt(n2 * multiplier > 255 ? 255 : n2 * multiplier).toString(16)
    n3 = parseInt(n3 * multiplier > 255 ? 255 : n3 * multiplier).toString(16)
    if (n1.length < 2) n1 = `0${n1}`
    if (n2.length < 2) n2 = `0${n2}`
    if (n3.length < 2) n3 = `0${n3}`
    console.log(n1, n2, n3)
    return `#${n1}${n2}${n3}`.toUpperCase()
  }

  const getFeatureColor = (layerIndex, featureIndex) => {
    const baseColor = layerColors[layerIndex] || layerColors.default || "#005291"
    if (selectedFeatures.some(f => f[0] === layerIndex && f[1] === featureIndex)) return "#FF00FF"
    if (hoveredFeature[0] === layerIndex && hoveredFeature[1] === featureIndex) return changeLightness(baseColor, 1.5)
    return baseColor
  }

  const getPointFromEvent = event => {
    let point = svgRef.current.createSVGPoint()
    point.x = event.clientX
    point.y = event.clientY
    return point.matrixTransform(svgRef.current.getScreenCTM().inverse())
  }

  const onPointerDown = event => {
    setIsPointerDown(true)
    const point = getPointFromEvent(event)
    setPointerOrigin(point)

    if (event.button === 1) {
      event.preventDefault()
      return // so you can move without selecting stuff
    }

    if (event.button === 2) {
      setSelectedPoints([])
      return setActiveTool(activeTool === "measure-distance" ? false : "measure-distance")
    }

    if (activeTool === "measure-distance") {
      if (selectedPoints.length >= 1) {
        setSelectedPoints([])
        setActiveTool(false)
      }
      else {
        setSelectedPoints([closestPathPoint(pointerPosition.x, pointerPosition.y)])
      }
    }
  }

  const onPointerUp = () => setIsPointerDown(false)

  const onPointerLeave = event => {
    onPointerUp(event)
    setIsPointerInWindow(false)
    window.removeEventListener("wheel", preventDefault)
    window.removeEventListener("contextmenu", preventDefault)
  }

  const onPointerEnter = () => {
    setIsPointerInWindow(true)
    window.addEventListener("wheel", preventDefault, false)
    window.addEventListener("contextmenu", preventDefault, false)
  }
  
  // const svgPoint = (element, x, y) => {
  //   let pt = element.createSVGPoint()
  //   pt.x = x
  //   pt.y = y
  //   return pt.matrixTransform(element.getScreenCTM().inverse());
  // }

  const onPointerMove = event => {
    const pointerPosition = getPointFromEvent(event)
    setPointerPosition(pointerPosition)
    // setClosestPathPoint(closestPathPoint(pointerPosition.x, pointerPosition.y))
    if (!isPointerDown) return
    event.preventDefault()
    const current = svgRef.current.viewBox.baseVal
    const newViewBox = {}
    newViewBox.x = current.x - (pointerPosition.x - pointerOrigin.x)
    newViewBox.y = current.y - (pointerPosition.y - pointerOrigin.y)
    newViewBox.width = current.width
    newViewBox.height = current.height
    svgRef.current.setAttribute("viewBox",
     `${newViewBox.x}
      ${newViewBox.y} 
      ${newViewBox.width} 
      ${newViewBox.height}`
    )
    setViewbox(newViewBox)
  }

  const onScroll = event => {
    const current = svgRef.current.viewBox.baseVal
    const pointerPercentageX = event.clientX / svgRef.current.clientWidth
    const pointerPercentageY = 1 - (event.clientY / svgRef.current.clientHeight)
    const zoomPointX = current.x + (current.width * pointerPercentageX)
    const zoomPointY = current.y + (current.height * pointerPercentageY)
    // if (pointerInWindow) {
      const vb = {}
      vb.width = current.width * (1 + event.deltaY * 0.04)
      vb.height = current.height * (1 + event.deltaY * 0.04)
      vb.x = zoomPointX - pointerPercentageX * vb.width
      vb.y = zoomPointY - pointerPercentageY * vb.height
      svgRef.current.setAttribute("viewBox",
       `${vb.x}
        ${vb.y}
        ${vb.width}
        ${vb.height}`
      )
      setViewbox(vb)
    // }
  }

  const closestPathPoint = (x, y) => {
    if (!svgRef.current) return
    let closest = Infinity
    let point = undefined

    if (!snapToCenter && !snapToEdges) return [x, y]

    if (snapToEdges) {
      for (const group of svgRef.current.children) {
        
        let layerFeatRegEx = RegExp(`__layer__.+__feature__.+__`)
        // let layerFeatRegEx = RegExp(`__layer__${activeLayer}__feature__.*__`)

        if (!group.id.match(layerFeatRegEx)) continue

        let transform = false
        if (group.children[0].transform.baseVal.numberOfItems) {
          transform = group.children[0].transform.baseVal.consolidate().matrix
        }
      
        // const thisClosest = transform
        //   ? closestPointTransform(group.children[0], [x, y], transform) 
        //   : closestPoint(group.children[0], [x, y])
        // const d = pointDistance2([x, y], thisClosest)
        // if (d < closest) {
        //   closest = d
        //   point = thisClosest
        // }

        const snapPoints = group.children[0].getAttribute("points")
        if (snapPoints) {
          const points = JSON.parse(snapPoints)
          for (const p of points) {
            let snapPoint = p
            if (transform) {
              let transformP = svgRef.current.createSVGPoint()
              transformP.x = p[0]
              transformP.y = p[1]
              snapPoint = transformP.matrixTransform(transform)
              snapPoint = [snapPoint.x, snapPoint.y]
            }
            const d = pointDistance2([x, y], snapPoint)
            if (d < closest) {
              closest = d
              point = snapPoint
            }
          }
        }
      }
    }
    if (snapToCenter) {
      for (const feature of layers[activeLayer]) {
        let featurePoint
        if (feature.type === "line") {
          featurePoint = [(feature.xs + feature.xe) / 2, (feature.ys + feature.ye) / 2]
        }
        else if (feature.type === "pad" || feature.type === "surface") {
          featurePoint = [feature.x, feature.y]
        }
        else if (feature.type === "arc") {
          featurePoint = [feature.xc, feature.yc]
        }
        const d = pointDistance2([x, y], featurePoint)
        if (d < closest) {
          closest = d
          point = featurePoint
        }
      }
    }
    return point
  }
  

  const measureDistancePointer = () => {
    if (!pointerPosition) return
    const closest = closestPathPoint(pointerPosition.x, pointerPosition.y)
    if (!closest) return
    const startPoint = selectedPoints.length > 0 ? selectedPoints[0] : [pointerPosition.x, pointerPosition.y]
    return <g stroke="#F0F" strokeLinecap="round" opacity="0.7" pointerEvents="none">
      <path d={`M ${startPoint[0]} ${startPoint[1]} L ${closest[0]} ${closest[1]}`} strokeWidth="1" stroke="#FF00FF"/>
    </g>
  }

  const getTextColor = backgroundColor => {
    if (!backgroundColor) return "#000000"
    const [ , numbers ] = backgroundColor.split(/#/g)
    const n1 = parseInt(`0x${numbers.substr(0, 2)}`)
    const n2 = parseInt(`0x${numbers.substr(2, 2)}`)
    const n3 = parseInt(`0x${numbers.substr(4, 2)}`)
    if (n1 >= 128 || n2 >= 128 || n3 >= 128 ) return "#000000"
    return "#FFFFFF"
  }

  const measureDistanceText = () => {
    if (!pointerPosition) return
    const closest = closestPathPoint(pointerPosition.x, pointerPosition.y)
    if (!closest) return
    if (selectedPoints.length <= 0) return `${parseFloat(closest[0].toFixed(3))} ${parseFloat(closest[1].toFixed(3))}`
    const startPoint = selectedPoints[0]
    const distance = pointDistance(startPoint, closest)
    return `${parseFloat(distance.x.toFixed(3))} ${parseFloat(distance.y.toFixed(3))} ${parseFloat(distance.d.toFixed(3))}`
  }

  // const getAndSetNearestPoint = () => {
  //   if (!pointerPosition) return
  //   let worker = new Worker("nearestPointWorker.js")
  //   worker.postMessage([1, [pointerPosition.x, pointerPosition.y], 1])
  // }

  const measureDistanceSvgText = () => {
    if (!pointerPosition) return
    const closest = closestPathPoint(pointerPosition.x, pointerPosition.y)
    if (!closest) return
    

    const startPoint = selectedPoints.length > 0 ? selectedPoints[0] : [pointerPosition.x, pointerPosition.y]
    const distance = pointDistance(startPoint, closest)

    const text = selectedPoints.length 
      ? `${parseFloat(distance.x.toFixed(3))}, ${parseFloat(distance.y.toFixed(3))} [${parseFloat(distance.d.toFixed(3))}]`
      : `${parseFloat(closest[0].toFixed(3))}, ${parseFloat(closest[1].toFixed(3))}`

    const textPosition = {x: closest[0], y: closest[1] - viewbox.height / 9}
    
    const charWidth = viewbox.width/160
    const textWidth = charWidth * text.length

    let textAnchor = "middle"
    if (textPosition.x - textWidth < viewbox.x) {
      textPosition.x = viewbox.x
      textAnchor = "start"
    }
    if (textPosition.x + textWidth > viewbox.x + viewbox.width) {
      textPosition.x = viewbox.x + viewbox.width
      textAnchor = "end"
    }
    if (flipX) textPosition.x = -textPosition.x
    if (!flipY) textPosition.y = -textPosition.y

    return <g opacity="0.7" pointerEvents="none">
      <text style={{font: `${Math.max(viewbox.height / 18, .01)}px sans-serif`, textAnchor}}
        fill={getTextColor(backgroundColor)}
        transform={`scale(${flipX ? -1 : 1} ${flipY ? 1 : -1})`}
        x={`${textPosition.x}`} 
        y={`${textPosition.y}`}
      >{text}</text>
    </g>
  }

  // const selectedFeatureSVGText = () => {}

  useEffect(()=>{
    resetZoom()
    window.addEventListener("wheel", onScroll)
  }, [])

  const links = [{name:"CAM",ref:"/"}, {name:"Test"}]
  return <BasicLayout hideNavBar={!showNavBar} title={"Test"} links={links} auth={auth} login={login} logout={logout}>
    <div style={{
      position: "relative",
      zIndex: 2,
      background: "#FFF0",
      height: 0
    }}>
      <div style={{display:"flex", flexDirection:"column", pointerEvents: "none"}}>
        <div style={{display:"flex", flexDirection:"row"}}>
          <button style={{opacity:"0.6", borderColor: "black", borderStyle: "solid", pointerEvents: "auto"}} height={"21px"} onClick={resetZoom}>Home Z</button>
          <button style={{opacity:"0.6", borderColor: flipX ? "red" : "black", borderStyle: "solid", pointerEvents: "auto"}} onClick={()=>setFlipX(!flipX)}>Flip X</button>
          <button style={{opacity:"0.6", borderColor: flipY ? "red" : "black", borderStyle: "solid", pointerEvents: "auto"}} onClick={()=>setFlipY(!flipY)}>Flip Y</button>
          <button style={{opacity:"0.6", borderColor: "black", borderStyle: "solid", pointerEvents: "auto"}} height={"21px"} onClick={()=>setBackgroundColor(backgroundColor === "#FFFFFF" ? "#000000" : "#FFFFFF")}>Set Colors</button>
          <button style={{opacity:"0.6", borderColor: !showNavBar ? "red" : "black", borderStyle: "solid", pointerEvents: "auto"}} onClick={()=>setShowNavBar(!showNavBar)}>{showNavBar ? "Hide" : "Show"} Navbar</button>
          <button style={{opacity:"0.6", borderColor: activeTool === "measure-distance" ? "red" : "black", borderStyle: "solid", pointerEvents: "auto"}}
            onClick={()=>{setActiveTool(activeTool === "measure-distance" ? false : "measure-distance"); setSelectedPoints([])}}
            >{activeTool === "measure-distance" ? measureDistanceText() : "Measure Distance"}</button>
        </div>
        <div style={{display:activeTool === "measure-distance" ? "flex" : "none", flexDirection:"row"}}>
          <button style={{opacity:"0.6", borderColor: snapToEdges ? "red" : "black", borderStyle: "solid", pointerEvents: "auto"}} heigt={"21px"} onClick={()=>setSnapToEdges(!snapToEdges)}>Snap Edges</button>
          <button style={{opacity:"0.6", borderColor: snapToCenter ? "red" : "black", borderStyle: "solid", pointerEvents: "auto"}} heigt={"21px"} onClick={()=>setSnapToCenter(!snapToCenter)}>Snap Center</button>
        </div>
      </div>
    </div>
    <svg
      height="100vh"
      width="100%"
      onMouseMove={onPointerMove}
      onMouseDown={onPointerDown}
      onMouseUp={onPointerUp}
      onMouseLeave={onPointerLeave}
      onMouseEnter={onPointerEnter}
      ref={svgRef}
      transform={`scale(${flipX ? -1 : 1} ${flipY ? 1 : -1})`}
      style={{cursor: cursorStyle, backgroundColor}}
    >
      {layers.map((l, iL) => l.map((f, iF) => <Feature
        key={`__layer__${iL}__feature__${iF}__`}
        id={`__layer__${iL}__feature__${iF}__`}
        type={f.type} symbol={f.symbol} x={f.x} y={f.y} xs={f.xs} ys={f.ys} xe={f.xe} ye={f.ye} xc={f.xc} yc={f.yc} ccw={f.ccw} polygons={f.polygons}
        fill={getFeatureColor(iL, iF)}
        onMouseEnter={()=> setHoveredFeature([iL, iF])}
        onMouseLeave={()=> {if (hoveredFeature[0]===iL && hoveredFeature[1]===iF) setHoveredFeature("none")}}
        onClick={()=>{
          if (!activeTool) {
            setSelectedFeatures(selectedFeatures.length && selectedFeatures[0][0]=== iL && selectedFeatures[0][1] === iF  ? [] : [[iL, iF]])
          }
        }}
      />))}

      {/* {testLayer.map((f, i) => <Feature
        key={`__layer__0__feature__${i}__`}
        id={`__layer__0__feature__${i}__`}
        type={f.type} symbol={f.symbol} x={f.x} y={f.y} xs={f.xs} ys={f.ys} xe={f.xe} ye={f.ye} xc={f.xc} yc={f.yc} ccw={f.ccw}
        fill={getFeatureColor(i)}
        onMouseEnter={()=> setHoveredFeature(i)}
        onMouseLeave={()=> {if (hoveredFeature===i) setHoveredFeature("none")}}
        onClick={()=>{
          if (!activeTool) {
            setSelectedFeatures(selectedFeatures.length && selectedFeatures[0]=== i ? [] : [i])
          }
        }}
      />)} */}

      {selectedFeatures.length && <Feature
        key={`__selected__feature__`}
        id={`__selected__feature__`}
        type={layers[selectedFeatures[0][0]][selectedFeatures[0][1]].type}
        symbol={layers[selectedFeatures[0][0]][selectedFeatures[0][1]].symbol}
        x={layers[selectedFeatures[0][0]][selectedFeatures[0][1]].x}
        y={layers[selectedFeatures[0][0]][selectedFeatures[0][1]].y}
        xs={layers[selectedFeatures[0][0]][selectedFeatures[0][1]].xs}
        ys={layers[selectedFeatures[0][0]][selectedFeatures[0][1]].ys}
        xe={layers[selectedFeatures[0][0]][selectedFeatures[0][1]].xe}
        ye={layers[selectedFeatures[0][0]][selectedFeatures[0][1]].ye}
        xc={layers[selectedFeatures[0][0]][selectedFeatures[0][1]].xc}
        yc={layers[selectedFeatures[0][0]][selectedFeatures[0][1]].yc}
        r={layers[selectedFeatures[0][0]][selectedFeatures[0][1]].r}
        ccw={layers[selectedFeatures[0][0]][selectedFeatures[0][1]].ccw}
        polygons={layers[selectedFeatures[0][0]][selectedFeatures[0][1]].polygons}
        fill={getFeatureColor(selectedFeatures[0][0], selectedFeatures[0][1])}
        pointerEvents="none"
      />}

      {hoveredFeature !== "none" && <Feature
        key={`__hovered__feature__`}
        id={`__hovered__feature__`}
        type={layers[hoveredFeature[0]][hoveredFeature[1]].type}
        symbol={layers[hoveredFeature[0]][hoveredFeature[1]].symbol}
        x={layers[hoveredFeature[0]][hoveredFeature[1]].x}
        y={layers[hoveredFeature[0]][hoveredFeature[1]].y}
        xs={layers[hoveredFeature[0]][hoveredFeature[1]].xs}
        ys={layers[hoveredFeature[0]][hoveredFeature[1]].ys}
        xe={layers[hoveredFeature[0]][hoveredFeature[1]].xe}
        ye={layers[hoveredFeature[0]][hoveredFeature[1]].ye}
        xc={layers[hoveredFeature[0]][hoveredFeature[1]].xc}
        yc={layers[hoveredFeature[0]][hoveredFeature[1]].yc}
        r={layers[hoveredFeature[0]][hoveredFeature[1]].r}
        ccw={layers[hoveredFeature[0]][hoveredFeature[1]].ccw}
        polygons={layers[hoveredFeature[0]][hoveredFeature[1]].polygons}
        fill={getFeatureColor(hoveredFeature[0], hoveredFeature[1])}
        opacity={.5}
        pointerEvents="none"
      />}

      {activeTool === "measure-distance" && measureDistancePointer()}
      {activeTool === "measure-distance" && measureDistanceSvgText()}

      {/* custom pointer */}
      {/* <Circle x={pointerPosition.x} y={pointerPosition.y} r={3} fill="none" stroke="#F00"/> */}
    </svg>
  </BasicLayout>
}

export default EditorPage