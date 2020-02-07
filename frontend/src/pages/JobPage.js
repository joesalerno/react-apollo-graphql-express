import React from "react"
import { Link, useParams } from "react-router-dom"
import WindowLayout from "../components/WindowLayout"

const JobPage = ({auth, login, logout}) =>{
  let { job } = useParams()
  const links = [{name:"CAM",ref:"/"},{name:job}]
  return <WindowLayout title={"CAM Jobs"} links={links} auth={auth} login={login} logout={logout}>
    <div style={{height:"100%", width:"100%"}}>
      <div style={{display:"flex", flexDirection:"column"}}>
        <p style={{margin:"auto"}}>{job}</p>
        <p>information</p>
        <Link to={`/jobs/${job}/CreateCoupon`}>Create Coupon</Link>
      </div>
    </div>
  </WindowLayout>
}

export default JobPage