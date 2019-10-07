import React, {memo} from "react"
import jwt from "jsonwebtoken"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import MessagesIcon from "@material-ui/icons/Message"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import Typography from "@material-ui/core/Typography"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import useMediaQuery from '@material-ui/core/useMediaQuery'
import TTMLogo from "../img/ttmsmallvectorlogo.svg"

export default props => {
  const [navMenuAnchor, setNavMenuAnchor] = React.useState(null)
  const handleNavMenuClick = event => setNavMenuAnchor(event.currentTarget)
  const handleNavMenuClose = () => setNavMenuAnchor(null)
  
  const [userMenuAnchor, setUserMenuAnchor] = React.useState(null)
  const handleUserMenuClick = event => setUserMenuAnchor(event.currentTarget)
  const handleUserMenuClose = () => setUserMenuAnchor(null)
  
  const largeScreen = useMediaQuery('(min-width:1083px)') //hide buttons
  const tinyScreen = useMediaQuery('(max-width:521px)') //move title to bottom of navbar
  const reallyTinyScreen = useMediaQuery('(max-width:275px)') //make navBar bigger

  return <div
    style={{
      height: tinyScreen ? reallyTinyScreen ? "207px" : "133px" : "auto",
      width: "100%",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "flex-end",
      alignItems: "center",
      backgroundImage: "linear-gradient(#0000, #0006)"
    }}
  >
    <div
      style={{
        margin: tinyScreen ? "0 auto 0 4px" : "0 4px",
        background: `url(${TTMLogo})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "50px",
        width: "50px",
        opacity: "0.9",
        filter: "drop-shadow( 3px 3px 3px rgba(0, 0, 0, .7))",
        order: -1
      }}
    />

    <Typography variant="h4" style={{
      width:tinyScreen ? "500px" : "269px",
      textAlign: "center",
      color: "#FFF",
      margin: tinyScreen? "-5px auto 5px auto" : "auto",
      order: tinyScreen ? 2 : 0
    }}>
      {props.pageName}
    </Typography>

    <Button size="small" variant="outlined" onClick={() => props.changePage("/jobs")}
      style={{ margin: "0 4px", color: "#FFF", display: props.pageName === "Jobs" || !largeScreen ? "none" : "" }}
    > Jobs </Button>

    <Button size="small" variant="outlined" onClick={() => props.changePage("/parts")}
      style={{ margin: "0 4px", color: "#FFF", display: props.pageName === "Parts" || !largeScreen ? "none" : "" }}
    > Parts </Button>

    <Button size="small" variant="outlined" onClick={() => props.changePage("/customers")}
      style={{ margin: "0 4px", color: "#FFF", display: props.pageName === "Customers" || !largeScreen ? "none" : "" }}
    > Customers </Button>

    <Button size="small" variant="outlined" onClick={() => props.changePage("/users")}
      style={{ margin: "0 4px", color: "#FFF", display: props.pageName === "Users" || !largeScreen ? "none" : "" }}
    > Users </Button>

    <Button size="small" variant="outlined" onClick={() => props.changePage("/roles")}
      style={{ margin: "0 4px", color: "#FFF", display: props.pageName === "Roles" || !largeScreen ? "none" : "" }}
    > Roles </Button>

    <Button size="small" variant="outlined" onClick={() => props.changePage("/steps")}
      style={{ margin: "0 4px", color: "#FFF", display: props.pageName === "Steps" || !largeScreen ? "none" : "" }}
    > Steps </Button>

    <Button size="small" variant="outlined" onClick={() => props.changePage("/forms")}
      style={{ margin: "0 4px", color: "#FFF", display: props.pageName === "Forms" || !largeScreen ? "none" : "" }}
    > Forms </Button>

    <Button size="small" variant="outlined" onClick={() => props.changePage("/validators")}
      style={{ margin: "0 4px", color: "#FFF", display: props.pageName === "Validators" || !largeScreen ? "none" : "" }}
    > Validators </Button>

    <Button size="small" variant="outlined" onClick={() => props.changePage("/comments")}
      style={{ margin: "0 4px", color: "#FFF", display: props.pageName === "Comments" || !largeScreen ? "none" : "" }}
    > Comments </Button>
    
    <Button size="small" variant="outlined" onClick={handleNavMenuClick}
      style={{ margin: "0 4px", color: "#FFF", display: largeScreen ? "none" : "" }}
    > Menu ▼ </Button>

    <Menu id="nav-menu" anchorEl={navMenuAnchor} keepMounted open={Boolean(navMenuAnchor)} onClose={handleNavMenuClose}>
      <MenuItem onClick={() => props.changePage("/jobs")} 
        style={{display: props.pageName === "Jobs" ? "none" : ""}}
      > Jobs </MenuItem>

      <MenuItem onClick={() => props.changePage("/parts")}
        style={{display: props.pageName === "Parts" ? "none" : ""}}
      > Parts </MenuItem>

      <MenuItem onClick={() => props.changePage("/customers")}
          style={{display: props.pageName === "Customers" ? "none" : ""}}
      > Customers </MenuItem>

      <MenuItem onClick={() => props.changePage("/steps")}
          style={{display: props.pageName === "Steps" ? "none" : ""}}
      > Steps </MenuItem>

      <MenuItem onClick={() => props.changePage("/forms")}
          style={{display: props.pageName === "Forms" ? "none" : ""}}
      > Forms </MenuItem>

      <MenuItem onClick={() => props.changePage("/validators")}
        style={{display: props.pageName === "Validators" ? "none" : ""}}
      > Validators </MenuItem>

      <MenuItem onClick={() => props.changePage("/users")}
          style={{display: props.pageName === "Users" ? "none" : ""}}
      > Users </MenuItem>

      <MenuItem onClick={() => props.changePage("/roles")}
          style={{display: props.pageName === "Roles" ? "none" : ""}}
      > Roles </MenuItem>

      <MenuItem onClick={() => props.changePage("/comments")}
          style={{display: props.pageName === "Comments" ? "none" : ""}}
      > Comments </MenuItem>
    </Menu>

    <IconButton onClick={() => props.changePage("/messages")} style={{ color: "#FFF" }}>
      <MessagesIcon/>
    </IconButton>

    <Button size="small" onClick={handleUserMenuClick} style={{ margin: "0", color: "#FFF" }}>
      {jwt.decode(props.auth).id}
      <AccountCircleIcon fontSize="inherit" style={{margin: "5px"}}/>
    </Button>

    <Menu id="user-menu" anchorEl={userMenuAnchor} keepMounted open={Boolean(userMenuAnchor)} onClose={handleUserMenuClose}>
      <MenuItem onClick={() => props.changePage("/settings")}> Settings </MenuItem>
      <MenuItem onClick={props.logout}> Logout </MenuItem>
    </Menu>
  </div>
}