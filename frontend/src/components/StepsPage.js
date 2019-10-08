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

const GET_STEPS = gql` {
  stepTypes {
    name
    description
    instructions
    form {
      name
    }
    requiredRoles {
      name
    }
    enabled
    jobs {
      jobNo
    }
    parts {
      name
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
  const Steps = useQuery(GET_STEPS)

  return <Background>
    <NavBar {...props} pageName="Steps"/>
    <Button
      onClick={() => props.changePage("/createsteptype")}
      variant="outlined"
      style={{ color: "#FFF", margin: "4px 8px -4px 8px" }}
    >
      <AddCircle style={{ margin: "0 8px" }} /> Create New Step Type
    </Button>
    <Paper style={{ flex: "auto", margin: "8px", backgroundColor: "rgba(255, 255, 255, .95)", }}>
      <Grid
        rows={Steps.data ? Steps.data.stepTypes : []}
        columns={[
          { name: "name", title: "Name" },
          { name: "description", title: "Description" },
          { name: "instructions", title: "Instructions" },
          { name: "form", title: "Form",
            getCellValue: row => row.form ? row.form.name : undefined
          },
          {
            name: "requiredRoles",
            title: "Required Role(s)",
            getCellValue: row => {
              if (!row.requiredRoles) return undefined
              var string = ""
              for (var [index, role] of row.requiredRoles.entries()) {
                string = string.concat(role.name)
                if (index < row.requiredRoles.length - 1) string = string.concat(", ")
              }
              return string
            }
          },
          { name: "enabled", title: "Enabled" },
          { name: "jobs", title: "Jobs", getCellValue: row => {
            if (!row.jobs) return undefined
            var string = ""
            for (var [index, job] of row.jobs.entries()) {
              string = string.concat(job.jobNo)
              if (index < row.jobs.length - 1) string = string.concat(", ")
            }
            return string
          }},
          { name: "parts", title: "Parts", getCellValue: row => {
            if (!row.parts) return undefined
            var string = ""
            for (var [index, part] of row.parts.entries()) {
              string = string.concat(part.nameo)
              if (index < row.parts.length - 1) string = string.concat(", ")
            }
            return string
          }}
        ]}
      >
        <DragDropProvider />
        <SortingState defaultSorting={[{ columnName: "name", direction: "asc" }]}/>
        <IntegratedSorting />
        <FilteringState defaultFilters={[]} />
        <IntegratedFiltering />
        <Table />
        <TableColumnReordering
          defaultOrder={[
            "name",
            "description",
            "instructions",
            "form",
            "requiredRoles",
            "enabled",
            "jobs",
            "parts"
          ]}
        />
        <TableHeaderRow
          showSortingControls
          sortLabelComponent={SortLabel}
        />
        <TableFilterRow />
      </Grid>
    </Paper>
  </Background>
}