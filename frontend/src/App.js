import React, { useState } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Index from "./pages/Index"
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

      <Route path="/">
        <Index auth={auth} login={login} logout={logout}/>
      </Route>

    </Switch>
  </Router>
}

export default App