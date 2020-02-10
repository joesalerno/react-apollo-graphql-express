import React from "react"
import WindowLayout from "../components/WindowLayout"
import { Link } from "react-router-dom"

const IndexPage = ({auth, login, logout}) => {
  const links = [{name:"CAM"}]
  return <WindowLayout links={links} title={"TTM CAM Jobs"} auth={auth} login={login} logout={logout}>
    <div style={{minHeight:272, width:"100%", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
      <p style={{margin:"auto auto 6px auto"}}>All jobs, more stuff will go here</p>
      <Link to="/jobs/test" style={{margin:"6px auto auto auto"}}>
        Test Job
      </Link>
    </div>
  </WindowLayout>
}
export default IndexPage