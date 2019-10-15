import React from "react"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import NavBar from "./NavBar"
import Background from "./Background"
import Link from "@material-ui/core/Link"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import AddCircle from "@material-ui/icons/AddCircle"
import ArrowDownward from "@material-ui/icons/ArrowDownward"
import ArrowUpward from "@material-ui/icons/ArrowUpward"

import {
  FilteringState,
  IntegratedFiltering,
  SortingState,
  IntegratedSorting,
  DataTypeProvider
} from "@devexpress/dx-react-grid"
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFilterRow,
  DragDropProvider,
  TableColumnReordering
} from "@devexpress/dx-react-grid-material-ui"

const GET_PARTS = gql` {
  parts {
    id
    name
    customer {
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

const PartFormatter = ({value}) => {
  if (value) return <Link href={`/parts/${value.id}`}>{value.name}</Link>
  return <b>"-"</b>
}

const PartTypeProvider = props => <DataTypeProvider formatterComponent={PartFormatter} {...props}/>

export default props => {
  const Parts = useQuery(GET_PARTS)

  return <Background>
    <NavBar {...props} pageName="Parts" />
    <Button
      onClick={() => props.changePage("/createpart")}
      variant="outlined"
      style={{ color: "#FFF", margin: "4px 8px -4px 8px" }}
    >
      <AddCircle style={{ margin: "0 8px" }} /> Create New Part
    </Button>
    
    <Paper style={{ flex: "auto", margin: "8px", backgroundColor: "rgba(255, 255, 255, .95)", }}>
      <Grid
        rows={Parts.data ? Parts.data.parts : []}
        columns={[
          { name: "name", title: "Name", getCellValue: row => {
            console.log(row)
            return row ? row : undefined
          } 
          },
          { name: "customer", title: "Customer", getCellValue: row =>
            row.customer ? row.customer.name : undefined
          }
        ]}
      >
        <PartTypeProvider for={["name"]}/>
        <DragDropProvider />
        <SortingState defaultSorting={[{ columnName: "name", direction: "desc" }]}/>
        <IntegratedSorting />
        <FilteringState defaultFilters={[]} />
        <IntegratedFiltering />
        <Table />
        <TableColumnReordering
          defaultOrder={[
            "name",
            "customer",
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