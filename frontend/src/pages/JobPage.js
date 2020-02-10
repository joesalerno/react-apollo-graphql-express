import React from "react"
import { Link, useParams } from "react-router-dom"
import WindowLayout from "../components/WindowLayout"
import Spinner from "../components/Spinner"

const JobPage = ({auth, login, logout}) =>{
  let { job } = useParams()
  const links = [{name:"CAM",ref:"/"},{name:job}]
  return <WindowLayout title={job} links={links} auth={auth} login={login} logout={logout}>
    <div style={{minHeight:272, width:"100%", display:"flex", flexDirection:"column"}}>   

      <Spinner style={{margin:"auto auto 40px auto"}}/>
      <Link to={`/jobs/${job}/CreateCoupon`} style={{margin:"6px auto auto auto"}}> Create Coupon </Link>

    </div>
  </WindowLayout>
}

export default JobPage