import React from "react"
import { useParams } from "react-router-dom"
import WindowLayout from "../components/WindowLayout"

const CreateCouponPage = ({auth, login, logout}) =>{
  let { job } = useParams()

  const sameUser = () => job !== "same"
  const openJob = () => job !== "closed"

  const links = [{name: "CAM",ref: "/"}, {name: job,ref: `/jobs/${job}`}, {name: "Create Coupon"}]

  return <WindowLayout title="Create Coupon" links={links} auth={auth} login={login} logout={logout}>
   
      <div style={{minHeight:272, width:476, margin:12, display:"flex", flexDirection:"column"}}>

        {/* User not logged in: */}
        {!auth && "Log in to continue"}

        {/* User logged in, but no (open) job*/}
        {auth && !openJob() && <p style={{margin:"auto"}}> Open Job: .button. </p>}

        {/* User logged in, but different user than job: */}
        {auth && openJob() && !sameUser() && <p style={{margin:"auto"}}> Job is already opened by someone else </p>}

        {/* User logged in, and same user as job: */}
        {auth && openJob() && sameUser() && <>        
          <b>Step 1: Confirm coupon spec</b><br/>
          Step 2: Confirm sections<br/>
          Step 3: Confirm misc like rout? serialize?<br/>
          Step 4: Confirm all drill layers for all sections<br/>
          Step 5: Confirm hole size to use for all sections<br/>
          Step 6: Confirm pad sizes for all layers for all sections<br/>
          Step 7: Confirm line width for A and B sections<br/>
          Step 8: Click Build Coupon<br/>
          Step 9?: Dialog shows asking for auth<br/>
          Step 10: Set waiting state/view<br/>
          Step 11: Poll for file<br/>
          Step 12: Show completed view<br/>
        </>}

      </div>    
    
      
  </WindowLayout>
}

export default CreateCouponPage