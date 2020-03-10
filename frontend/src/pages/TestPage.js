import React, { useState, useEffect } from "react"
import WindowLayout from "../components/WindowLayout"
import Spinner from "../components/Spinner"
import Dropdown from "../components/Dropdown"
import CrossSection from "../components/CrossSection"
import FeatureView from "../components/FeatureView"
import validOdbSymbol from "../modules/validOdbSymbol"

const degreeToRadian = degree => degree * Math.PI / 180

const TestPage = ({auth, login, logout}) => {
  const [selectedPad, setSelectedPad] = useState({symbol:""})
  const [inputSelectedPad, setInputSelectedPad] = useState('')
  const getData = () => {let d = [];for (let i = 0; i <= 250; i++) d.push({symbol:`r${i}`}); return d}
  useEffect(() => setInputSelectedPad(selectedPad ? selectedPad.symbol : ""), [selectedPad])

  // const features = [{type: "r", }]

  const pathFromSymbol = symbol => {
    let type = validOdbSymbol(symbol)
    let path = new Path2D

    if (!type) return path
    if (type === "round") {
      path.arc(0, 0, )
      let [d, r] = symbol.match(/[0-9]+/g).map(text => parseFloat(text))
      console.log({symbol, d, r})

      //ctx.arc(100, 75, 50, 0, 2 * Math.PI)

      // return [{type: "arc", x:0, y:0, }]

      // return {d, r}
    }
  }

  const drawPad = ({ symbol, x, y, polarity, rotation, resize }) => {
    console.log("drawing pad")
    let canvas = document.getElementById("canvas")
    let ctx = canvas.getContext("2d")
    let type = validOdbSymbol(symbol)

    if (!type) return console.log({ParsingError: {symbol, x, y, polarity, rotation, resize}})

    ctx.beginPath()
    ctx.fillStyle = "yellow"

    if (type === "square") {
      let [s, rotation] = symbol.match(/[0-9]+(\.[0-9]*)?/g).map(text => parseFloat(text))
      ctx.save()
      if (rotation) {
        ctx.translate(x+s/2,y+s/2)
        ctx.rotate(degreeToRadian(rotation))
        ctx.translate(-(x+s/2),-(y+s/2))
      }
      ctx.rect(x, y, s, s)
      ctx.fill("evenodd")
      ctx.restore()
    }

    else if (type === "round") {
      let [d] = symbol.match(/[0-9]+(\.[0-9]*)?/).map(text => parseFloat(text))
      ctx.arc(x, y, d/2, 0, 2*Math.PI)
      ctx.fill("evenodd")
    }

    else if (type === "rectangle") {
      let [w, h, rotation] = symbol.match(/[0-9]+(\.[0-9]*)?/g).map(text => parseFloat(text))
      ctx.save()
      if (rotation) {
        ctx.translate(x+w/2,y+h/2)
        ctx.rotate(degreeToRadian(rotation))
        ctx.translate(-(x+w/2),-(y+h/2))
      }
      ctx.rect(x, y, w, h)
      ctx.fill("evenodd")
      ctx.restore()
    }

    else if (type === "rounded rectangle" || type ==="oval") {
      let [ , rotation] = symbol.split("_").map(text => parseFloat(text))
      let [w, h, rad, corners] = symbol.match(/[0-9]+(\.[0-9]*)?/g).map(text => parseFloat(text))
      if (type === "oval") rad = Math.min(w/2, h/2)
      if (w < 2 * rad) rad = w / 2 //fix rad > h*2 or w*2
      if (h < 2 * rad) rad = h / 2
      ctx.save()
      let halfW = w / 2; let halfH = h / 2
      if (rotation) {
        ctx.translate(x, y)
        ctx.rotate(degreeToRadian(rotation))
        ctx.translate(-x, -y)
      }
      ctx.moveTo(x+halfW, y+halfH)
      ctx.arcTo(x-halfW, y+halfH, x-halfW, y-halfH, rad)
      ctx.arcTo(x-halfW, y-halfH, x+halfW, y-halfH, rad)
      ctx.arcTo(x+halfW, y-halfH, x+halfW, y+halfH, rad)
      ctx.arcTo(x+halfW, y+halfH, x-halfW, y+halfH, rad)
      ctx.fill("evenodd")
      ctx.restore()
    }

    else if (type === "chamfered rectangle" || type ==="octagon") {
      let [ , rotation] = symbol.split("_").map(text => parseFloat(text))
      let [w, h, rad, corners] = symbol.match(/[0-9]+(\.[0-9]*)?/g).map(text => parseFloat(text))
      if (w < 2 * rad) rad = w / 2 //fix rad > h*2 or w*2
      if (h < 2 * rad) rad = h / 2
      ctx.save()
      let halfW = w / 2; let halfH = h / 2
      if (rotation) {
        ctx.translate(x, y)
        ctx.rotate(degreeToRadian(rotation))
        ctx.translate(-x, -y)
      }
      ctx.moveTo(x+halfW-rad, +y+halfH)
      ctx.lineTo(x+halfW,     y+halfH-rad)
      ctx.lineTo(x+halfW,     y-halfH+rad)
      ctx.lineTo(x+halfW-rad, y-halfH)
      ctx.lineTo(x-halfW+rad, y-halfH)
      ctx.lineTo(x-halfW,     y-halfH+rad)
      ctx.lineTo(x-halfW,     y+halfH-rad)
      ctx.lineTo(x-halfW+rad, y+halfH)
      ctx.lineTo(x+halfW+rad, y+halfH)
      ctx.fill()
      ctx.restore()
    }

    else if (type === "oval") { /* Draw a rounded rectangle */
      /* Below is wrong, draws oval, they mean a slot */
      // let [ w, h, rotation ] = symbol.match(/[0-9]+(\.[0-9]*)?/g).map(text => parseFloat(text))
      // ctx.ellipse(x, y, w, h, degreeToRadian(rotation) || 0, 0, 2*Math.PI)
      // ctx.fill()
    }

    else if (type === "diamond") {
      let [ w, h, rotation ] = symbol.match(/[0-9]+(\.[0-9]*)?/g).map(text => parseFloat(text))
      let halfW = w / 2; let halfH = h / 2
      ctx.save()
      if (rotation) {
        ctx.translate(x, y)
        ctx.rotate(degreeToRadian(rotation))
        ctx.translate(-x, -y)
      }
      ctx.moveTo(x-halfW, y)
      ctx.lineTo(x, y+halfH)
      ctx.lineTo(x+halfW, y)
      ctx.lineTo(x, y-halfH)
      ctx.lineTo(x-halfW, y)
      ctx.fill()
      ctx.restore()
    }

    else if (type === "octagon") {/* draw a chamfered rectangle */}

    else if (type === "round donut") {
      let [ od, id, rotation ] = symbol.match(/[0-9]+(\.[0-9]*)?/g).map(text => parseFloat(text))
      ctx.arc(x, y, od/2, 0, 2*Math.PI)
      ctx.arc(x, y, id/2, 0, 2*Math.PI)
      ctx.fill("evenodd")
    }

    else if (type === "square donut") {
      let [ od, id, rotation ] = symbol.match(/[0-9]+(\.[0-9]*)?/g).map(text => parseFloat(text))
      let halfOd = od / 2
      let halfId = id / 2
      ctx.save()
      if (rotation) {
        ctx.translate(x, y)
        ctx.rotate(degreeToRadian(rotation))
        ctx.translate(-x, -y)
      }
      ctx.rect(x-halfOd, y-halfOd, od, od)
      ctx.rect(x-halfId, y-halfId, id, id)
      ctx.fill("evenodd")
      ctx.restore()
    }

    else if (type === "square/round donut") {
      let [ od, id, rotation ] = symbol.match(/[0-9]+(\.[0-9]*)?/g).map(text => parseFloat(text))
      let halfOd = od / 2
      ctx.save()
      if (rotation) {
        ctx.translate(x, y)
        ctx.rotate(degreeToRadian(rotation))
        ctx.translate(-x, -y)
      }
      ctx.rect(x-halfOd, y-halfOd, od, od)
      ctx.arc(x, y, id/2, 0, 2*Math.PI)
      ctx.fill("evenodd")
      ctx.restore()
    }

    else if (type === "rounded square donut") {
      let [ , rotation] = symbol.split("_").map(text => parseFloat(text))
      let [od, id, rad, corners] = symbol.match(/[0-9]+(\.[0-9]*)?/g).map(text => parseFloat(text))

    }

  }

  const draw = () => {}

  const _draw = features => {
    let canvas = document.getElementById("canvas")
    let ctx = canvas.getContext("2d")
    
    ctx.fillStyle = "black"
    ctx.fillRect(0,0,500,400)

    ctx.fillStyle = "blue"
    ctx.beginPath()
    ctx.rect(10, 10, 480, 380)

    ctx.save()
    ctx.translate(250,200)
    ctx.rotate(0.2)
    ctx.translate(-250,-200)

    ctx.rect(10, 10, 480, 380)
    
    // ctx.rect(150, 0, 500, 300)
    ctx.fill("evenodd")

    ctx.restore()

    drawPad({symbol: "s10_5", x:5, y:5})
    drawPad({symbol: "s20_45", x:35, y:35})
    drawPad({symbol: "s30_5", x:65, y:65})
    drawPad({symbol: "s30", x:365, y:365})
    drawPad({symbol: "rect100x20xr21_45", x:150, y:200})
    drawPad({symbol: "rect100x20xr21", x:150, y:200})
    drawPad({symbol: "rect100x20xc5", x:350, y:200})
    drawPad({symbol: "oval25x45_45", x:350, y:100})
    drawPad({symbol: "di45x45", x:350, y:250})
    drawPad({symbol: "oct25x25x5", x:350, y:300})
    drawPad({symbol: "donut_r25x15", x:300, y:300})
    drawPad({symbol: "donut_s25x15", x:260, y:300})
    drawPad({symbol: "donut_sr25x15", x:220, y:300})
  }

  const features = [
    {symbol: "s10_5", x:5, y:5},
    {symbol: "s20_45", x:35, y:35},
    {symbol: "s30_5", x:65, y:65},
    {symbol: "s30", x:365, y:365},
    {symbol: "rect100x20xr21_45", x:150, y:200},
    {symbol: "rect100x20xr21", x:150, y:200},
    {symbol: "rect100x20xc5", x:350, y:200},
    {symbol: "oval25x45_45", x:350, y:100},
    {symbol: "di45x45", x:350, y:250},
    {symbol: "oct25x25x5", x:350, y:300},
    {symbol: "donut_r25x15", x:300, y:300},
    {symbol: "donut_s25x15", x:260, y:300},
    {symbol: "donut_sr25x15", x:220, y:300},
    {symbol: "donut_s100x80x25", x:160, y:300},
    {symbol: "donut_rc45x25x7.5", x:160, y:300},
    {symbol: "donut_rc45x25x7.5x20", x: 80, y:300},
    {symbol: "donut_o45x25x7.5_15", x: 50, y:300},
    {symbol: "hex_l45x25x7.5", x: 50, y:350},
    {symbol: "hex_s25x45x7.5", x: 50, y:250},
    {symbol: "bfr25", x: 50, y:200},
    {symbol: "bfs25", x: 50, y:150},
    {symbol: "tri25x25", x: 50, y:100},

  ]
  
  const links = [{name:"CAM",ref:"/"}, {name:"Test"}]
  return <WindowLayout title={"Test"} links={links} auth={auth} login={login} logout={logout}>
    <div style={{minHeight:272, width:"100%", display:"flex", flexDirection:"column"}}>

      <Dropdown placeholder="Select or type pad symbol"
        data={getData()}
        itemToString={item => item ? item.symbol : ""}
        width={"250px"}
        //readOnly
        acceptTypedInput
        inputField="symbol"
        validateInput={validOdbSymbol} 
        selectedItem={selectedPad}
        onChange={setSelectedPad}
        inputValue={inputSelectedPad}
        setInputValue={setInputSelectedPad}
      />

      <button onClick={()=> setSelectedPad({symbol: "clicked"})}>clicky</button>

      <CrossSection layers={[["1em","32","yellow"], ["2eg","25","#a6a600"], ["3eg","35","yellow"]]} drillSize={"13"}/>

      <canvas id="canvas" height="400px" width="500px" style={{border: "1px solid"}}>
        Sorry, your browser doesn't support the canvas tag.
      </canvas>

      <button onClick={draw}>draw</button>

      {/* <FeatureView features={features}/> */}

      {setTimeout(draw, 200)}

      {selectedPad && selectedPad.symbol}

      <FeatureView heightPx={500} widthPx={500} features={features}/>

      <Spinner style={{margin:"auto auto 40px auto"}}/>
    </div>
  </WindowLayout>
}

export default TestPage