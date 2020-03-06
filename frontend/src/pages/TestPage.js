import React, { useState, useEffect } from "react"
import WindowLayout from "../components/WindowLayout"
import Spinner from "../components/Spinner"
import Dropdown from "../components/Dropdown"
import CrossSection from "../components/CrossSection"
import validOdbSymbol from "../modules/validOdbSymbol"

const TestPage = ({auth, login, logout}) => {
  const [selectedPad, setSelectedPad] = useState({symbol:""})
  const [inputSelectedPad, setInputSelectedPad] = useState('')
  const getData = () => {let d = [];for (let i = 0; i <= 250; i++) d.push({symbol:`r${i}`}); return d}
  useEffect(() => setInputSelectedPad(selectedPad ? selectedPad.symbol : ""), [selectedPad])

  const links = [{name:"CAM",ref:"/"}, {name:"Test"}]
  return <WindowLayout title={"Test"} links={links} auth={auth} login={login} logout={logout}>
    <div style={{minHeight:272, width:"100%", display:"flex", flexDirection:"column"}}>

      <Dropdown placeholder="Select or type pad symbol"
        data={getData()}
        itemToString={item => item ? item.symbol : ""}
        width={"250px"}
        //readOnly
        acceptTypedInput
        validateInput={validOdbSymbol} 
        inputField="symbol"
        selectedItem={selectedPad}
        inputValue={inputSelectedPad}
        setInputValue={setInputSelectedPad}
        onChange={setSelectedPad}
      />

      <button onClick={()=> setSelectedPad({symbol: "clicked"})}>clicky</button>

      <CrossSection layers={[["1em","32","yellow"], ["2eg","25","#a6a600"], ["3eg","35","yellow"]]} drillSize={"13"}/>

      {selectedPad && selectedPad.symbol}
      <Spinner style={{margin:"auto auto 40px auto"}}/>
    </div>
  </WindowLayout>
}

export default TestPage