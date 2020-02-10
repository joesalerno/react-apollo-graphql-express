import React, { useState } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import CreateCouponPage from "./pages/CreateCouponPage"
import IndexPage from "./pages/IndexPage"
import RegisterPage from "./pages/RegisterPage"
import JobPage from "./pages/JobPage"
import bcrypt from "bcrypt"
import "./App.css"

//const saltRounds = 12
const users = [
  {username: "joe", password: "plain123"}
]

function App() {
  const [auth, setAuth] = useState(localStorage.getItem("auth") || "")

  //const verifyPassword = async (username, password) => {
    //const user = users.find(username === "joe")
    //const match = await bcrypt.compare(password, user.password)
  //}

  //const hashPassword = (password) =>  bcrypt.hash(password, saltRounds)

  const login = (username, password) => {
    //authenticate...
    setAuth(username)
    localStorage.setItem("auth", username)
  }

  const register = (username, password) => {
    if (users.find((user) => user.username === username)) {
      alert("Username already taken")
      return false
    } 
    //const hash = hashPassword(password)
    setAuth(username)
    localStorage.setItem("auth", username)
    //alert(`Registered [${username},${hash}]`)
    return true
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

      <Route exact path="/register">
        <RegisterPage auth={auth} login={login} logout={logout} register={register}/>
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