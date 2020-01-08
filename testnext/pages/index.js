import "./index.scss";
import LoginPage from "../components/LoginPage"
import HomePage from "../components/HomePage"

const Index = ({ user, setUser, cookie, setCookie, removeCookie }) => {
  const login = (username, password) => {
    setUser(username)
    setCookie("user", username)
  }

  const logout = () => {
    setUser(undefined)
    removeCookie("user")
  }

  if (!user) return <LoginPage user={user} login={login} logout={logout}/>

  return <HomePage user={user} login={login} logout={logout} cookie={cookie}/>
}

export default Index