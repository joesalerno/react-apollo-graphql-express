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
import CreateUserPage from "./components/CreateUserPage"
import CreateRolePage from "./components/CreateRolePage"
import CreateValidatorPage from "./components/CreateValidatorPage"
import CreateFormPage from "./components/CreateFormPage"
import CreateJobPage from "./components/CreateJobPage"
import CreatePartPage from "./components/CreatePartPage"
import CreateCustomerPage from "./components/CreateCustomerPage"
import CreateStepTypePage from "./components/CreateStepTypePage"
import Test from "./components/Test"

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["auth", "currentPage"])
  const [auth, setAuth] = useState(cookies.auth ? cookies.auth : 0)
  const [currentPage, setCurrentPage] = useState(
    cookies.currentPage ? cookies.currentPage : homepage
  )

  const client = new ApolloClient({
    uri: `${serverUrl}/api`,
    headers: { Authorization: `Bearer ${auth}` }
  })

  const changePage = path => {
    setCurrentPage(path)
    setCookie("currentPage", path, "/")
    window.location.assign(path)
  }

  const login = async (user, pass) => {
    try {
      const res = await axios.get(`${serverUrl}/login`, {
        auth: { username: user, password: pass }
      })
      setCookie("auth", res.data, "/")
      setAuth(res.data)
      changePage(currentPage ? currentPage : homepage)
    } catch (e) {
      if (e.message === "Request failed with status code 401")
        alert("Invalid username or password.")
      else alert(e.message)
    }
  }

  const register = async ( user, employeeId, email, pass ) => {
    try {
      await axios.post(`${serverUrl}/register`, {
        username: user,
        employeeId: employeeId,
        email: email,
        password: pass,
      })
      await login(user, pass)
    } catch (e) {
      if (e.message === "Request failed with status code 400")
        alert("Username or email already in use.")
      else alert(e.message)
    }
  }

  const logout = () => {
    removeCookie("auth")
    removeCookie("currentPage")
    setAuth(0)
    setCurrentPage(0)
  }

  const validAuth = () => {
    try {
      return jwt.decode(auth).exp >= new Date().getTime() / 1000
    } catch (e) {
      return false
    }
  }

  return <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route exact path="/" render={props =>
            validAuth()
              ? <Redirect to = {currentPage} {...props} logout={logout} />
              : <LoginPage {...props} login={login} logout={logout} />
          }
        />

        <Route exact path="/register" render={props => 
          <RegisterPage {...props} register={register} changePage={changePage} logout={logout} auth={auth}/>
        }/>

        <Route exact path="/jobs" render={props => validAuth() 
          ? <JobsPage {...props} changePage={changePage} logout={logout} auth={auth}/>
          : <Redirect to="/" />
        }/>

        <Route exact path="/createjob" render={props => validAuth()
          ? <CreateJobPage {...props} changePage={changePage} logout={logout} auth={auth}/>
          : <Redirect to="/" />
        }/>

        <Route path="/jobs/:jobNo" render={props => validAuth()
          ? <JobPage {...props} changePage={changePage} logout={logout} auth={auth}/>
          : <Redirect to="/" />
        }/>

        <Route exact path="/customers" render={props => validAuth()
          ? <CustomersPage {...props} changePage={changePage} logout={logout} auth={auth}/>
          : <Redirect to="/" />
        }/>

        <Route exact path="/createcustomer" render={props => validAuth()
          ? <CreateCustomerPage {...props} changePage={changePage} logout={logout} auth={auth}/>
          : <Redirect to="/" />
        }/>

        <Route exact path="/parts" render={props => validAuth()
          ? <PartsPage {...props} changePage={changePage} logout={logout} auth={auth}/>
          : <Redirect to="/" />
        }/>

        <Route exact path="/steps" render={props => validAuth()
          ? <StepsPage {...props} changePage={changePage} logout={logout} auth={auth}/>
          : <Redirect to="/" />
        }/>

        <Route exact path="/createsteptype" render={props => validAuth()
          ? <CreateStepTypePage {...props} changePage={changePage} logout={logout} auth={auth}/>
          : <Redirect to="/" />
        }/>

        <Route exact path="/users" render={props => validAuth()
          ? <UsersPage {...props} changePage={changePage} logout={logout} auth={auth}/>
          : <Redirect to="/" />
        }/>

        <Route exact path="/createuser" render={props => validAuth()
          ? <CreateUserPage {...props} changePage={changePage} logout={logout} auth={auth}/>
          : <Redirect to="/" />
        }/>

        <Route  exact path="/roles"render={props => validAuth()
          ? <RolesPage {...props} changePage={changePage} logout={logout} auth={auth}/>
          : <Redirect to="/" />
        }/>

        <Route exact path="/createrole" render={props => validAuth()
          ? <CreateRolePage {...props} changePage={changePage} logout={logout} auth={auth}/>
          :  <Redirect to="/"/>
        }/>

        <Route  exact path="/forms"render={props => validAuth()
          ? <FormsPage {...props} changePage={changePage} logout={logout} auth={auth}/>
          : <Redirect to="/" />
        }/>

        <Route exact path="/createform" render={props => validAuth()
          ? <CreateFormPage {...props} changePage={changePage} logout={logout} auth={auth}/>
          : <Redirect to="/" />
        }/>

        <Route exact path="/validators" render={props => validAuth()
          ? <ValidatorsPage {...props} changePage={changePage} logout={logout} auth={auth}/>
          : <Redirect to="/" />
        }/>

        
        <Route exact path="/createvalidator" render={props => validAuth()
          ? <CreateValidatorPage {...props} changePage={changePage} logout={logout} auth={auth}/>
          : <Redirect to="/" />
        }/>

        <Route exact path="/comments" render={props => validAuth()
          ? <CommentsPage {...props} changePage={changePage} logout={logout} auth={auth}/>
          : <Redirect to="/" />
        }/>

        <Route exact path="/createpart" render={props => validAuth()
          ? <CreatePartPage {...props} changePage={changePage} logout={logout} auth={auth}/>
          : <Redirect to="/" />
        }/>

        <Route exact path="/test" render={props => validAuth()
          ? <Test {...props} changePage={changePage} logout={logout} auth={auth}/>
          : <Redirect to="/" />
        }/>

        <Route render={props => validAuth() 
          ? <NotFoundPage {...props} changePage={changePage} logout={logout} auth={auth}/>
          : <Redirect to="/" />
        }/>
        
      </Switch>
    </Router>
  </ApolloProvider>
}

export default App