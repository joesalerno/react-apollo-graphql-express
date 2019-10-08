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

const GET_COMMENTS = gql` {
  comments {
    subject
    user {
      username
    }
    data
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
  const Comments = useQuery(GET_COMMENTS)

  return <Background>
    <NavBar {...props} pageName="Comments" />
    <Button
      onClick={() => props.changePage("/createcomment")}
      variant="outlined"
      style={{ color: "#FFF", margin: "4px 8px -4px 8px" }}
    >
      <AddCircle style={{ margin: "0 8px" }} /> Create New Comment
    </Button>
    <Paper style={{ flex: "auto", margin: "8px", backgroundColor: "rgba(255, 255, 255, .95)", }}>
      <Grid
        rows={Comments.data ? Comments.data.comments : []}
        columns={[
          { name: "data", title: "Comment" },
          { name: "user", title: "Posted By", getCellValue: ref => {
              return ref.user.username
          }},
          { name: "subject", title: "Subject ID" },
        ]}
      >
        <DragDropProvider />
        <SortingState defaultSorting={[{ columnName: "subject", direction: "desc" }]}/>
        <IntegratedSorting />
        <FilteringState defaultFilters={[]} />
        <IntegratedFiltering />
        <Table />
        <TableColumnReordering
          defaultOrder={[
            "data",
            "user",
            "subject"
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