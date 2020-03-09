import React, { useState, useEffect } from "react"
import WindowLayout from "../components/WindowLayout"
import Spinner from "../components/Spinner"
import Dropdown from "../components/Dropdown"
import CrossSection from "../components/CrossSection"
import validOdbSymbol from "../modules/validOdbSymbol"

const degreeToRadian = degree => degree * Math.PI / 180

const TestPage = ({auth, login, logout}) => {
  const [selectedPad, setSelectedPad] = useState({symbol:""})
  const [inputSelectedPad, setInputSelectedPad] = useState('')
  const getData = () => {let d = [];for (let i = 0; i <= 250; i++) d.push({symbol:`r${i}`}); return d}
  useEffect(() => setInputSelectedPad(selectedPad ? selectedPad.symbol : ""), [selectedPad])

  const features = [{type: "r", }]

  const pathFromSymbol = symbol => {
    let type = validOdbSymbol(symbol)
    let path = new Path2D

    if (!type) return path
    if (type === "round") {
      path.arc(0, 0, )
      let [d, r] = symbol.match(/[0-9]+/g)
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
      let [s, rotation] = symbol.match(/[0-9]+(\.[0-9]*)?/g)
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
      let [d] = symbol.match(/[0-9]+(\.[0-9]*)?/)
      ctx.arc(x, y, d/2, 0, Math.PI*2)
      ctx.fill("evenodd")
    }

    else if (type === "rectangle") {
      let [w, h, rotation] = symbol.match(/[0-9]+(\.[0-9]*)?/g)
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

    else if (type = "rounded rectangle") {
      let [sym, rotation] = symbol.split("_")
      let [w, h, rad, corners] = sym.match(/[0-9]+(\.[0-9]*)?/g)
      if (w < 2 * rad) rad = w / 2
      if (h < 2 * rad) rad = h / 2
      ctx.save()
      let halfW = w / 2
      let halfH = h / 2
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

  }



  const draw = features => {
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
    //degree * Math.PI / 180 degree -> radian
  }


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
        Sorry your browser doesn't support the canvas tag.
      </canvas>

      <button onClick={draw}>draw</button>

      {/* <FeatureView features={features}/> */}

      {setTimeout(draw, 200)}

      {selectedPad && selectedPad.symbol}
      <Spinner style={{margin:"auto auto 40px auto"}}/>
    </div>
  </WindowLayout>
}

export default TestPage