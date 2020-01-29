import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import TTMLogo from "../components/TTMTechnologiesLogo";
import "./NavBar.css";

const NavBar = ({ auth, logout, login, title }) => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const handleChange = event => {
    const {
      target: { id, value }
    } = event;
    if (id === "username") setUser(value);
    if (id === "password") setPass(value);
  };

  return (
    <div className="NavBar">
      <TTMLogo
        style={{ height: "inherit", width: "150px", margin: "0 auto 0 8px" }}
      />

      <h1 className="Title">{title}</h1>

      {!auth && (
        <>
          <TextField
            id="username"
            label="Username"
            onChange={handleChange}
            value={user}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={() => login(user, pass)}
            style={{ margin: "0 16px" }}
          >
            Login
          </Button>
        </>
      )}

      {auth && (
        <Button
          variant="contained"
          color="primary"
          onClick={logout}
          style={{ margin: "0 16px" }}
        >
          Logout {auth}
        </Button>
      )}
    </div>
  );
};

export default NavBar;
