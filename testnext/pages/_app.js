import { useState, useEffect } from "react"
import { useCookies } from "react-cookie"

const MyApp = ({Component, pageProps}) => {
  const [cookie, setCookie, removeCookie] = useCookies('test-cookie')
  const [user, setUser] = useState(undefined)
  const [initialLoad, setInitialLoad] = useState(true)
  useEffect(()=>{
    if (initialLoad && !user && cookie.user) setUser(cookie.user)
    setInitialLoad(false)
  })
  return <Component {...pageProps} user={user} setUser={setUser} cookie={cookie} setCookie={setCookie} removeCookie={removeCookie}/>
}

export default MyApp