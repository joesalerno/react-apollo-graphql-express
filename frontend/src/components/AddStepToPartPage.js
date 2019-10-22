import React, { useState } from "react"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import getDateFromTime from "../modules/getDateFromTime"
import SmallWindowView from "./SmallWindowView"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Divider from "@material-ui/core/Divider"
import Dropdown from "./Dropdown"
import MultiDropdown from "./MultiDropdown"
import SignatureDialog from "./SignatureDialog"

const GET_PART = gql`{ query GetPart($id: String!) {
    part(id: $id) {
      
    }
  }
}`

const GET_STEPTYPES = gql`{
  stepTypes {
    id
    name
  }
}`

