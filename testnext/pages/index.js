import "./index.scss";
import LoginPage from "../components/LoginPage"
import HomePage from "../components/HomePage"

const Index = ({ user, setUser, setCookie, cookie }) => {
  const login = (username, password) => {
    setUser(username)
    setCookie("user", username)
  }

  const logout = () => setUser(undefined)

  if (!user) return <LoginPage user={user} login={login} logout={logout}/>

  return <HomePage user={user} login={login} logout={logout} cookie={cookie}/>
}

export default Index