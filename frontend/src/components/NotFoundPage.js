import React from "react"
import Typography from "@material-ui/core/Typography"
import Link from "@material-ui/core/Link"
import SmallWindowView from "./SmallWindowView"
import { homepage } from "../config"

export default props => <SmallWindowView {...props} logo>
  <div style={{ margin: "16px", textAlign: "center" }}>
    <Typography component="h1" variant="h5">
      404 Page Not Found:
    </Typography>
    <Typography
      component="h1"
      variant="body1"
      style={{ margin: "0 16px 16px" }}
    >
      The server could not locate the page at {props.location.pathname}
    </Typography>
    <Link href={`${homepage}`} variant="body2"> Go to Home Page </Link>
  </div>
</SmallWindowView>