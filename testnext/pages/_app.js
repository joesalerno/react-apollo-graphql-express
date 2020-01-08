import { useState } from "react"
import { useCookies, withCookies, Cookies } from "react-cookie"

const MyApp = ({Component, pageProps}) => {
  const [cookie, setCookie, removeCookie] = useCookies('test-cookie')
  const [user, setUser] = useState(undefined)
  //const [user, setUser] = useState(cookie.user || undefined)
  //if (!user && cookie.user) setUser(cookie.user)
  return <Component {...pageProps} user={user} setUser={setUser} cookie={cookie} setCookie={setCookie} removeCookie={removeCookie}/>
}

// class MyApp extends App {
//   state = {
//     user: undefined
//   }

  

//   componentDidMount() {
//     console.log(this.props.cookies)
//     //if (!user && this.props.cookies.user) setUser()
//   }

//   render() {
//     <Component {...pageProps} user={user} setUser={setUser} cookie={cookie} setCookie={setCookie} removeCookie={removeCookie}/>
//   }
// }

// MyApp.getInitialProps = async ({Component, ctx}) => {
//   let pageProps = {}

//   if (Component.getInitialProps) pageProps = await Component.getInitialProps(ctx)
  
//   return {pageProps: {...pageProps, session: ctx.req.session, sessionID: ctx.req.sessionID}}
// }

export default MyApp