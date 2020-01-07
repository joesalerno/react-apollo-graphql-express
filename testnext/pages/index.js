import "./index.scss";
import LoginPage from "../components/LoginPage"
import { useReducer } from "react"

const Index = ({ session }) => {
  const forceUpdate = useReducer(()=>({}))[1]

  const login = (username, password) => {
    session.user = username
    forceUpdate()
  }

  const logout = () => {
    session.user = undefined
    forceUpdate()
  }

  console.log(session)

  return <LoginPage session={session} logout={logout} login={login}/>

}

export default Index