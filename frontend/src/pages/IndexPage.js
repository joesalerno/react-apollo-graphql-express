import React from "react"
import WindowLayout from "../components/WindowLayout"

const IndexPage = ({auth, login, logout}) => {
  const links = [{name:"CAM"}]
  return <WindowLayout links={links} title={"TTM CAM Jobs"} auth={auth} login={login} logout={logout}>
    <div style={{height:"100%", width:"100%"}}>
      <div style={{display:"flex"}}>
        <p style={{margin:"auto"}}>All jobs, more stuff will go here</p>
      </div>
    </div>
  </WindowLayout>
}
export default IndexPage