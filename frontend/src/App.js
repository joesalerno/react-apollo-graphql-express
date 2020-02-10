import React, { useState } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import wretch from "wretch"
import CreateCouponPage from "./pages/CreateCouponPage"
import IndexPage from "./pages/IndexPage"
import RegisterPage from "./pages/RegisterPage"
import SettingsPage from "./pages/SettingsPage"
import JobPage from "./pages/JobPage"
import { apiAddress } from "./config"
import "./App.css"


function App() {
  const [auth, setAuth] = useState(localStorage.getItem("auth") || "")

  const login = (username, password) => {
    wretch(`${apiAddress}/login`)
    .post({username, password})
    .text(token => {
      setAuth(token)
      localStorage.setItem("auth", token)
    })
    .catch(error => alert(error))
  }

  const register = (username, password) => {
    wretch(`${apiAddress}/register`)
    .post({username, password})
    .text(token => {
      setAuth(token)
      localStorage.setItem("auth", token)
    })
    .catch(error => alert(error))
  }
  
  const logout = () => {
    setAuth("")
    localStorage.removeItem("auth")
    return ""
  }

  return <Router>
    <Switch>

      <Route exact path="/">
        <IndexPage auth={auth} login={login} logout={logout}/>
      </Route>

      <Route exact path="/register">
        <RegisterPage auth={auth} login={login} logout={logout} register={register}/>
      </Route>

      <Route exact path="/settings">
        <SettingsPage auth={auth} login={login} logout={logout}/>
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