import React from "react"
import { Link, useParams } from "react-router-dom"
import WindowLayout from "../components/WindowLayout"

const JobPage = ({auth, login, logout}) =>{
  let { job } = useParams()
  const links = [{name:"CAM",ref:"/"},{name:job}]
  return <WindowLayout title={"CAM Jobs"} links={links} auth={auth} login={login} logout={logout}>
    <div style={{minHeight:272, width:"100%", display:"flex", flexDirection:"column"}}>   
      <p style={{margin:"auto auto 6px auto"}}> Job: { job } </p>
      <p style={{margin:"6px auto"}}> &lt;Information&gt; </p>
      <Link to={`/jobs/${job}/CreateCoupon`} style={{margin:"6px auto auto auto"}}> Create Coupon </Link>
    </div>
  </WindowLayout>
}

export default JobPage