import React, { useState, useEffect } from "react"
import WindowLayout from "../components/WindowLayout"
import Spinner from "../components/Spinner"
import Dropdown from "../components/Dropdown"
import CrossSection from "../components/CrossSection"
import FeatureView from "../components/FeatureView"
import validOdbSymbol from "../modules/validOdbSymbol"
import Circle from "../components/paths/Circle"
import Square from "../components/paths/Square"
import Rectangle from "../components/paths/Rectangle"
import RoundedRectangle from "../components/paths/RoundedRectangle"
import ChamferedRectangle from "../components/paths/ChamferedRectangle"
import Diamond from "../components/paths/Diamond"
import HorizontalHexagon from "../components/paths/HorizontalHexagon"
import VerticalHexagon from "../components/paths/VerticalHexagon"
import Butterfly from "../components/paths/Butterfly"
import SquareButterfly from "../components/paths/SquareButterfly"
import Triangle from "../components/paths/Triangle"
import RoundedRoundThermal from "../components/paths/RoundedRoundThermal"
import SquaredRoundThermal from "../components/paths/SquaredRoundThermal"
import SquareThermal from "../components/paths/SquareThermal"
import SquareRoundThermal from "../components/paths/SquareRoundThermal"
import RoundDonut from "../components/paths/RoundDonut"
import SquareDonut from "../components/paths/SquareDonut"
import SquareRoundDonut from "../components/paths/SquareRoundDonut"
import Ellipse from "../components/paths/Ellipse"

const degreeToRadian = degree => degree * Math.PI / 180

const TestPage = ({auth, login, logout}) => {
  const [selectedPad, setSelectedPad] = useState({symbol:""})
  const [inputSelectedPad, setInputSelectedPad] = useState('')

  const getData = () => {let d = [];for (let i = 0; i <= 250; i++) d.push({symbol:`r${i}`}); return d}
  
  useEffect(() => setInputSelectedPad(selectedPad ? selectedPad.symbol : ""), [selectedPad])

  const features = [
    {symbol: "s10_5", x:5, y:5},
    {symbol: "s20_45", x:35, y:35},
    {symbol: "s30_5", x:65, y:65},
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
    {symbol: "r15", x: 250, y:100},
    {symbol: "thr60x45x0x3x7.5", x: 150, y: 100},
    {symbol: "thr60x45x0x4x7.5", x: 250, y: 100},
    {symbol: "ths60x45x0x4x7.5", x: 250, y: 150},
    {symbol: "s_ths40x25x45x4x7.5", x: 250, y: 205},
    {symbol: "s_ths40x25x45x4x7.5", x: 250, y: 205},
    {symbol: "s_ths40x25x0x4x7.5", x: 250, y: 250},
    {symbol: "s_ths40x25x0x3x7.5", x:295, y: 250},
    {symbol: "s_ths120x80x63x7x16", x: 150, y: 425},
    {symbol: "s_ths120x80x7x15x17", x: 275, y: 425},
    {symbol: "donut_s121x120", x:150, y:425},
    {symbol: "donut_s81x80", x:150, y:425},
    {symbol: "s35", x:150, y:425},
    {symbol: "sr_ths120x80x6x3x20", x: 400, y: 425},
    {symbol: "el20x45", x: 50, y: 425},
  ]

  const links = [{name:"CAM",ref:"/"}, {name:"Test"}]
  return <WindowLayout title={"Test"} links={links} auth={auth} login={login} logout={logout}>
    <div style={{minHeight:272, width:"100%", display:"flex", flexDirection:"column"}}>

      <button onClick={()=> setSelectedPad({symbol: "clicked"})}>clicky</button>

      <CrossSection layers={[["1em","32","yellow"], ["2eg","25","#a6a600"], ["3eg","35","yellow"]]} drillSize={"13"}/>

      <canvas id="canvas" height="400px" width="500px" style={{border: "1px solid"}}>
        Sorry, your browser doesn't support the canvas tag.
      </canvas>

      {/* <FeatureView features={features}/> */}

      <svg height="200px">
        <g stroke="none" fill="#005291" style={{hover:"stroke: black"}}>
          <Circle x={35} y={50} r={25} />
          <Square x={95} y={50} s={50}/>
          <Rectangle x={145} y={50} w={30} h={50}/>
          <RoundedRectangle x={185} y={50} w={30} h={50} rad={4}/>
          <ChamferedRectangle x={225} y={50} w={30} h={50} rad={4}/>
          <Diamond x={265} y={50} w={30} h={50} rad={4}/>
          {/* Octagon is just shorthand ChamferedRectangle */}
          <RoundDonut x={395} y={110} od={50} id={30}/>
          <SquareDonut x={455} y={110} os={50} is={30}/>
          <SquareRoundDonut x={455} y={170} od={50} id={30}/>
          <HorizontalHexagon x={305} y={50} w={30} h={50} r={10}/>
          <VerticalHexagon x={345} y={50} w={30} h={50} r={10}/>
          <Butterfly x={395} y={50} d={50}/>
          <SquareButterfly x={455} y={50} s={50}/>
          <Triangle x={145} y={170} base={30} h={50}/>
          {/* <HalfOval x={} y={} w={} h={} /> */}
          <RoundedRoundThermal x={95} y={110} od={50} id={30} angle={0} num_spokes={2} gap={6}/>
          <SquaredRoundThermal x={95} y={170} od={50} id={30} angle={0} num_spokes={2} gap={6}/>
          <SquareThermal x={35} y={170} os={50} is={30} angle={0} num_spokes={7} gap={6}/>
          <SquareRoundThermal x={35} y={110} os={50} id={30} angle={0} num_spokes={3} gap={6}/>
          <Ellipse x={185} y={170} w={30} h={50} />
        </g>
      </svg>
      

      

      
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
      
      <FeatureView heightPx={500} widthPx={500} features={[...features, {symbol: selectedPad && selectedPad.symbol, x: 250, y:250}]}/>

      <Spinner style={{margin:"auto auto 40px auto"}}/>
    </div>
  </WindowLayout>
}

export default TestPage