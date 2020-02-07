import React, { useState } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import CreateCouponPage from "./pages/CreateCouponPage"
import IndexPage from "./pages/IndexPage"
import JobPage from "./pages/JobPage"
import "./App.css"

function App() {
  const [auth, setAuth] = useState(localStorage.getItem("auth") || "")

  const login = (username, password) => {
    //authenticate...
    setAuth(username)
    localStorage.setItem("auth", username)
  }
  
  const logout = () => {
    setAuth("")
    localStorage.removeItem("auth")
  }

  return <Router>
    <Switch>

      <Route exact path="/">
        <IndexPage auth={auth} login={login} logout={logout}/>
      </Route>

      <Route exact path="/jobs/:job">
        <JobPage auth={auth} login={login} logout={logout}/>
      </Route>

      <Route exact path="/jobs/:job/CreateCoupon">
        <CreateCouponPage auth={auth} login={login} logout={logout}/>
      </Route>

    </Switch>
  </Router>
}

export default App