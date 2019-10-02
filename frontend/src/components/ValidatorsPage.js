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

const GET_VALIDATORS = gql`
{
  validators {
    moduleName
    description
    forms {
      name
      stepTypes {
        jobSteps {
          job
        }
      }
    }
    enabled
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
  const Validators = useQuery(GET_VALIDATORS)

  return (
    <Background>
      <Fragment>
          <NavBar {...props} pageName="Validators" />
          <Button
            onClick={() => props.changePage("/createvalidator")}
            variant="outlined"
            style={{ color: "#FFF", margin: "4px 8px -4px 8px" }}
          >
            <AddCircle style={{ margin: "0 8px" }} /> Create New Validator
          </Button>
          <Paper style={{ flex: "auto", margin: "8px", backgroundColor: "rgba(255, 255, 255, .95)", }}>
            <Grid
              rows={Validators.data ? Validators.data.validators : []}
              columns={[
                { name: "moduleName", title: "Module" },
                { name: "description", title: "Description" },
                { name: "forms", title: "Forms", getCellValue: ref => {
                    "Forms, TODO"
                }},
                { name: "steps", title: "Steps", getCellValue: ref => {
                    "Steps, TODO"
                }},
                { name: "jobs", title: "Jobs", getCellValue: ref => {
                    "Jobs, TODO"
                }},
                { name: "enabled", title: "enabled" },
              ]}
            >
              <DragDropProvider />
              <SortingState defaultSorting={[{ columnName: "Module", direction: "desc" }]}/>
              <IntegratedSorting />
              <FilteringState defaultFilters={[]} />
              <IntegratedFiltering />
              <Table />
              <TableColumnReordering
                defaultOrder={[
                  "moduleName",
                  "description",
                  "forms",
                  "steps",
                  "jobs",
                  "enabled"
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