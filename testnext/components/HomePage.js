import WindowLayout from "./WindowLayout"
import {Button} from "@material-ui/core"

const HomePage = ({user, logout, cookie}) => <WindowLayout logo height="400px" width="400px" user={user} logout={logout}>
  <div style={{display:"flex", flexDirection:"column", alignItems:"center", height:"100%", width:"100%"}}>
    <h1 style={{marginBottom:"0"}}>Welcome {user}</h1>
    <Button variant="contained" color="primary" onClick={logout} style={{margin:"auto"}}> Logout </Button>
  </div>
</WindowLayout>

export default HomePage