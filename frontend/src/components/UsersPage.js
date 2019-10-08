import React from "react"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import NavBar from "./NavBar"
import Background from "./Background"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import AddCircle from "@material-ui/icons/AddCircle"
import ArrowDownward from "@material-ui/icons/ArrowDownward"
import ArrowUpward from "@material-ui/icons/ArrowUpward"
import {
  FilteringState,
  IntegratedFiltering,
  SortingState,
  IntegratedSorting
} from "@devexpress/dx-react-grid"
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFilterRow,
  DragDropProvider,
  TableColumnReordering
} from "@devexpress/dx-react-grid-material-ui"

const GET_USERS = gql` {
  users {
    username
    employeeId
    roles {
      name
    }
    email
    commentsBy {
      data
    }
    stepsCompleted {
      stepType {
        description
      }
      completedTime
    }
  }
}`

const SortingIcon = ({ direction }) => direction === "asc" 
  ? <ArrowUpward style={{ fontSize: "18px" }} />
  : <ArrowDownward style={{ fontSize: "18px" }} />
  
const SortLabel = ({ onSort, children, direction }) => (
  <Button size="small" variant="contained" onClick={onSort}>
    {children}
    {direction && <SortingIcon direction={direction} />}
  </Button>
)

export default props => {
  const Users = useQuery(GET_USERS)

  return <Background>
    <NavBar {...props} pageName="Users" />
    <Button
      onClick={() => props.changePage("/createuser")}
      variant="outlined"
      style={{ color: "#FFF", margin: "4px 8px -4px 8px" }}
    > 
      <AddCircle style={{ margin: "0 8px" }} /> Create New User
    </Button>
    <Paper style={{ flex: "auto", margin: "8px", backgroundColor: "rgba(255, 255, 255, .95)", }}>
      <Grid
        rows={Users.data ? Users.data.users : []}
        columns={[
          { name: "username", title: "Username" },
          { name: "employeeId", title: "Employee ID" },
          { name: "roles", title: "Roles", getCellValue: row => {
            if (!row.roles) return undefined
            var string = ""
            for (var [index, role] of row.roles.entries()) {
              string = string.concat(role.name)
              if (index < row.roles.length - 1)
                string = string.concat(" / ")
            }
            return string
          }},
          { name: "email", title: "Email" },
          { name: "lastComment", title: "Last Comment", getCellValue: row => {
            if(!row.commentsBy) return undefined
            var string = ""
            var time = "0"
            for (var comment of row.commentsBy){
              if (comment.timeCreated > time) string = comment.data
            }
            return string
          }},
          { name: "lastStep", title: "Last Step Completed", getCellValue: row => {
            if(!row.stepsCompleted) return undefined
            var string = ""
            var time = "0"
            for (var step of row.stepsCompleted){
              if (step.completedTime > time) string = step.data
            }
            return string
          }},
        ]}
      >
        <DragDropProvider/>
        <SortingState defaultSorting={[{ columnName: "username", direction: "desc" }]}/>
        <IntegratedSorting />
        <FilteringState defaultFilters={[]} />
        <IntegratedFiltering/>
        <Table/>
        <TableColumnReordering
          defaultOrder={[
            "username",
            "employeeId",
            "roles",
            "email",
            "lastComment",
            "lastStep"
          ]}
        />
        <TableHeaderRow
          showSortingControls
          sortLabelComponent={SortLabel}
        />
        <TableFilterRow/>
      </Grid>
    </Paper>
  </Background>
}