import React, { Fragment } from "react"
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

const GET_JOBS = gql`
{
  jobs {
    jobNo
    customer {
      name
    }
    part {
      name
    }
    status
    currentSteps {
      stepType {
        name
      }
    }
  }
}
`
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
  const Jobs = useQuery(GET_JOBS)

  return (
    <Background>
      <Fragment>
          <NavBar {...props} pageName="Jobs" />
          <Button
            onClick={() => props.changePage("/createjob")}
            variant="outlined"
            style={{ color: "#FFF", margin: "4px 8px -4px 8px" }}
          >
            <AddCircle style={{ margin: "0 8px" }} /> Create New Job
          </Button>
          <Paper style={{ flex: "auto", margin: "8px", backgroundColor: "rgba(255, 255, 255, .95)", }}>
            <Grid
              rows={Jobs.data ? Jobs.data.jobs : []}
              columns={[
                { name: "jobNo", title: "Job #" },
                { name: "customerName", title: "Customer", 
                  getCellValue: row => row.customer ? row.customer.name : undefined
                },
                { name: "partName", title: "Part",
                  getCellValue: row => (row.part ? row.part.name : undefined)
                },
                { name: "currentSteps", title: "Current Step(s)",
                  getCellValue: row => {
                    if (!row.currentSteps) return undefined
                    var string = ""
                    for (var [index, step] of row.currentSteps.entries()) {
                      string = string.concat(step.stepType.name)
                      if (index < row.currentSteps.length - 1)
                       string = string.concat(" / ")
                    }
                    return string
                  }
                },
                { name: "status", title: "Status" }
              ]}
            >
              <DragDropProvider />
              <SortingState defaultSorting={[{ columnName: "jobNo", direction: "desc" }]}/>
              <IntegratedSorting />
              <FilteringState defaultFilters={[]} />
              <IntegratedFiltering />
              <Table />
              <TableColumnReordering
                defaultOrder={[
                  "jobNo",
                  "customerName",
                  "partName",
                  "currentSteps",
                  "status"
                ]}
              />
              <TableHeaderRow
                showSortingControls
                sortLabelComponent={SortLabel}
              />
            <TableFilterRow />
          </Grid>
        </Paper>
      </Fragment>
    </Background>
  )
}