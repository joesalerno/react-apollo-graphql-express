import React from "react"
import WindowLayout from "../components/WindowLayout"

const Index = ({auth, login, logout}) =>
<WindowLayout title={"TTM CAM App"} auth={auth} login={login} logout={logout}>
  <div style={{height:"100%", width:"100%"}}>
    <div className="One">
      <p style={{margin:"auto"}}>All Jobs</p>
    </div>
  </div>
</WindowLayout>

export default Index