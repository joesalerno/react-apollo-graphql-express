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

const GET_FORMS = gql` {
  forms {
    name
    description
    data {
      instructions
    }
    stepTypes {
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
  const Forms = useQuery(GET_FORMS)

  return <Background>
    <NavBar {...props} pageName="Forms" />
    <Button
      onClick={() => props.changePage("/createform")}
      variant="outlined"
      style={{ color: "#FFF", margin: "4px 8px -4px 8px" }}
    >
      <AddCircle style={{ margin: "0 8px" }} /> Create New Form
    </Button>
    <Paper style={{ flex: "auto", margin: "8px", backgroundColor: "rgba(255, 255, 255, .95)", }}>
      <Grid
        rows={Forms.data ? Forms.data.forms : []}
        columns={[
          { name: "name", title: "Name" },
          { name: "description", title: "Description" },
          { name: "instructions", title: "Instructions", getCellValue: row =>{
            if (!row.data) return undefined
            var string = ""
            for (var [index, dataItem] of row.data.entries()) {
              string = string.concat(dataItem.instructions)
              if (index < row.data.length - 1) string = string.concat(", ")
            }
            return string
          }},
          { name: "stepTypes", title: "Step Types", getCellValue: row => {
            if (!row.stepTypes) return undefined
            var string = ""
            for (var [index, stepType] of row.stepTypes.entries()) {
              string = string.concat(stepType.name)
              if (index < row.stepTypes.length -1) string = string.concat(", ")
            }
            return string
          }}
        ]}
      >
        <DragDropProvider />
        <SortingState defaultSorting={[{ columnName: "name", direction: "desc" }]}/>
        <IntegratedSorting />
        <FilteringState defaultFilters={[]} />
        <IntegratedFiltering />
        <Table />
        <TableColumnReordering
          defaultOrder={[
            "name",
            "description",
            "instructions",
            "stepTypes",
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