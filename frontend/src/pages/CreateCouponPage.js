import React from "react"
import { Link, useParams } from "react-router-dom"
import WindowLayout from "../components/WindowLayout"



const CreateCouponPage = ({auth, login, logout}) =>{
  let { job } = useParams()
  const links = [{name:"CAM",ref:"/"},{name:job},{name:"Create Coupon"}]
  return <WindowLayout links={links} title={"Create Coupon"} auth={auth} login={login} logout={logout}>
    <div style={{height:"100%", width:"100%"}}>
      <div className="Create Coupon">
        <p style={{margin:"auto"}}> 

          - Create Coupon -

        </p>
      </div>
    </div>
  </WindowLayout>
}

export default CreateCouponPage