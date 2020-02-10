import React, { useState, useEffect } from "react"
import WindowLayout from "../components/WindowLayout"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Spinner from "../components/Spinner"
import jwt from "jsonwebtoken"
import wretch from "wretch"
import { userFromToken, validHostname } from "../modules"
import { apiAddress } from "../config"

const SettingsPage = ({auth, login, logout}) => {
  const inputRefs = {}
  const [user, setUser] = useState({})
  const [editing, setEditing] = useState("")

  const getUser = () => {
    wretch(`${apiAddress}/users/${jwt.decode(auth) && jwt.decode(auth).id}`)
    .get()
    .json(user => { setUser(user.length ? user[0] : {}) })
    .catch(error => console.log(error))
  }
  useEffect(getUser, [auth])

  const saveField = (field, value) => {
    wretch(`${apiAddress}/users/edit`)
    .post({uuid: user.uuid, [field]:value})
    .text(res => { setEditing(editing !== field && field) })
    .catch(error => alert(error))
  }

  const handleChange = event => {
    const { target: { id, value } } = event
    if (id === "host") setUser({...user, host:value})
  }

  const handleKeyDown = ({key, target}) => {
    const { id, value } = target
    if (key === "Enter") saveField(id, value)
  }
  
  const links = [{name:"CAM", ref:"/"}, {name:"Settings"}]
  return <WindowLayout links={links} title={"Settings"} auth={auth} login={login} logout={logout}>
    <div style={{minHeight:272, width:476, margin:12, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
      
      {!user.uuid && userFromToken(auth) && <Spinner/>}

      {user.uuid && userFromToken(auth) && <>
        <div style={{display:"flex", alignItems:"center", justifyContent:"center", height:40}}>
          <p style={{margin:"auto"}}>Host name:</p>
          <TextField
            id="host"
            inputRef = {(ref) => {inputRefs.host = ref}}
            value = {user.host || ""}
            disabled={editing !== "host"}
            variant="outlined"
            autoComplete="host"
            autoFocus
            required
            size="small"
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            style={{width: 270, backgroundColor: "white", margin:"6px"}}
          />

          <Button
            id="editHost"
            color="primary"
            variant="contained"
            fullWidth
            style={{width:40, display: editing === "host" ? "none" : ""}}
            onClick={() => setEditing(editing !== "host" && "host")}
          > Edit </Button>

          <Button
            id="saveHost"
            color="primary"
            variant="contained"
            fullWidth
            disabled={!validHostname(user && user.host)}
            style={{width:40, display: editing !== "host" ? "none" : ""}}
            onClick={() => { saveField("host", user.host) }}
          > Save </Button>

        </div>

        {JSON.stringify(user)}

      </>}

      {!userFromToken(auth) && "Log in to change settings"}
      
    </div>
  </WindowLayout>
}
export default SettingsPage