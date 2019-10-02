import { homepage, serverUrl } from "./config"
import React, { useState } from "react"
import "./App.css"

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom"
import axios from "axios"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "@apollo/react-hooks"
import { useCookies } from "react-cookie"
import jwt from "jsonwebtoken"
import LoginPage from "./components/LoginPage"
import RegisterPage from "./components/RegisterPage"
import NotFoundPage from "./components/NotFoundPage"
import JobPage from "./components/JobPage"
import JobsPage from "./components/JobsPage"
import CustomersPage from "./components/CustomersPage"
import PartsPage from "./components/PartsPage"
import StepsPage from "./components/StepsPage"
import UsersPage from "./components/UsersPage"
import RolesPage from "./components/RolesPage"
import FormsPage from "./components/FormsPage"
import ValidatorsPage from "./components/ValidatorsPage"
import CommentsPage from "./components/CommentsPage"
import CreateJobPage from "./components/CreateJobPage"
import CreatePartPage from "./components/CreatePartPage"
import CreateCustomerPage from "./components/CreateCustomerPage"

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["auth", "currentPage"])
  const [auth, setAuth] = useState(cookies.auth ? cookies.auth : 0)
  const [currentPage, setCurrentPage] = useState(
    cookies.currentPage ? cookies.currentPage : 0
  )

  const client = new ApolloClient({
    uri: `${serverUrl}/api`,
    headers: { Authorization: `Bearer ${auth}` }
  })

  const validAuth = () => {
    try {
      return jwt.decode(auth).exp >= new Date().getTime() / 1000
    } catch (e) {
      return false
    }
  }

  const changePage = path => {
    setCurrentPage(path)
    setCookie("currentPage", path, "/")
    window.location.assign(path)
  }

  const register = async (user, email, pass, employeeId) => {
    try {
      await axios.post(`${serverUrl}/register`, {
        username: user,
        email: email,
        employeeId: employeeId,
        password: pass
      })
      await login(user, pass)
    } catch (e) {
      if (e.message === "Request failed with status code 400")
        alert("Username or email already in use.")
      else alert(e.message)
    }
  }

  const login = async (user, pass) => {
    try {
      const res = await axios.get(`${serverUrl}/login`, {
        auth: { username: user, password: pass }
      })
      setCookie("auth", res.data, "/")
      setAuth(res.data)
      changePage(homepage)
    } catch (e) {
      if (e.message === "Request failed with status code 401")
        alert("Invalid username or password.")
      else alert(e.message)
    }
  }

  const logout = () => {
    removeCookie("auth")
    removeCookie("currentPage")
    setAuth(0)
    setCurrentPage(0)
  }

  return (
    <ApolloProvider client={client}>
        <Router>
          <Switch>

            <Route path="/" exact render={props =>
                validAuth()
                 ? <Redirect to = {currentPage} {...props} logout={logout} />
                 : <LoginPage {...props} login={login} logout={logout} />
              }
            />

            <Route path="/register" exact render={props => 
              <RegisterPage {...props} register={register} changePage={changePage} logout={logout} auth={auth}/>
            }/>

            <Route path="/jobs" exact render={props => validAuth() 
              ? <JobsPage {...props} changePage={changePage} logout={logout} auth={auth}/>
              : <Redirect to="/" />
            }/>

            <Route path="/createjob" exact render={props => validAuth()
              ? <CreateJobPage {...props} changePage={changePage} logout={logout} auth={auth}/>
              : <Redirect to="/" />
            }/>

            <Route path="/jobs/:jobid" render={props => validAuth()
              ? <JobPage {...props} changePage={changePage} logout={logout} auth={auth}/>
              : <Redirect to="/" />
            }/>

            <Route path="/customers" exact render={props => validAuth()
              ? <CustomersPage {...props} changePage={changePage} logout={logout} auth={auth}/>
              : <Redirect to="/" />
            }/>

            <Route path="/createcustomer" exact render={props => validAuth()
              ? <CreateCustomerPage {...props} changePage={changePage} logout={logout} auth={auth}/>
              : <Redirect to="/" />
            }/>

            <Route path="/parts" exact render={props => validAuth()
              ? <PartsPage {...props} changePage={changePage} logout={logout} auth={auth}/>
              : <Redirect to="/" />
            }/>

            <Route path="/steps" exact render={props => validAuth()
              ? <StepsPage {...props} changePage={changePage} logout={logout} auth={auth}/>
              : <Redirect to="/" />
            }/>

            <Route path="/users" exact render={props => validAuth()
              ? <UsersPage {...props} changePage={changePage} logout={logout} auth={auth}/>
              : <Redirect to="/" />
            }/>

            <Route path="/roles" exact render={props => validAuth()
              ? <RolesPage {...props} changePage={changePage} logout={logout} auth={auth}/>
              : <Redirect to="/" />
            }/>

            <Route path="/forms" exact render={props => validAuth()
              ? <FormsPage {...props} changePage={changePage} logout={logout} auth={auth}/>
              : <Redirect to="/" />
            }/>

            <Route path="/validators" exact render={props => validAuth()
              ? <ValidatorsPage {...props} changePage={changePage} logout={logout} auth={auth}/>
              : <Redirect to="/" />
            }/>

            <Route path="/comments" exact render={props => validAuth()
              ? <CommentsPage {...props} changePage={changePage} logout={logout} auth={auth}/>
              : <Redirect to="/" />
            }/>

            <Route path="/createpart" exact render={props => validAuth()
              ? <CreatePartPage {...props} changePage={changePage} logout={logout} auth={auth}/>
              : <Redirect to="/" />
            }/>

            <Route render={props => validAuth() 
              ? <NotFoundPage {...props} changePage={changePage} logout={logout} auth={auth}/>
              : <Redirect to="/" />
            }/>
            
          </Switch>
        </Router>
    </ApolloProvider>
  )
}

export default App