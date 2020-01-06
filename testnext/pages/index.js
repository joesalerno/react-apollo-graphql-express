import "./index.scss";
import LoginPage from "../components/LoginPage"
import BasicLayout from "../components/BasicLayout"
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

  return <BasicLayout session={session} logout={logout}>
    <LoginPage session={session} login={login}/>
  </BasicLayout>
}

export default Index