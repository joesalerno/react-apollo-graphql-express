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

const GET_CUSTOMERS = gql` {
  customers {
      name
      parts {
          id
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
  const Customers = useQuery(GET_CUSTOMERS)

  return <Background>
    <NavBar {...props} pageName="Customers" />
    <Button
      onClick={() => props.changePage("/createcustomer")}
      variant="outlined"
      style={{ color: "#FFF", margin: "4px 8px -4px 8px" }}
    >
      <AddCircle style={{ margin: "0 8px" }} /> Create New Customer
    </Button>
    <Paper style={{ flex: "auto", margin: "8px", backgroundColor: "rgba(255, 255, 255, .95)", }}>
      <Grid
        rows={Customers.data ? Customers.data.customers : []}
        columns={[
          { name: "name", title: "Name" },
          { name: "noParts", title: "Number of Parts", getCellValue: row =>
              row.parts ? row.parts.length : undefined
          }
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
            "noParts",
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