import React from "react"
import { Link, useParams } from "react-router-dom"
import WindowLayout from "../components/WindowLayout"
import Spinner from "../components/Spinner"
import Dropdown from "../components/Dropdown"

const TestPage = ({auth, login, logout}) =>{
  const links = [{name:"CAM",ref:"/"},{name:"Test"}]
  return <WindowLayout title={"Test"} links={links} auth={auth} login={login} logout={logout}>
    <div style={{minHeight:272, width:"100%", display:"flex", flexDirection:"column"}}>   
{/* //initialSelectedItem={{name:"asdf"}} */}
      <Dropdown 
        data={[{name:"hi"},{name:"you"}]} 
        allowTypedValues 
        itemToString={item=> item ? item.name : ""} 
        validateInput={input=>input&&input.length} 
        inputField="name"/>
      Some text below
      <Spinner style={{margin:"auto auto 40px auto"}}/>
    </div>
  </WindowLayout>
}

export default TestPage