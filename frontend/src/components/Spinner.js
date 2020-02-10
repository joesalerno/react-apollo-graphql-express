import CircularProgress from "@material-ui/core/CircularProgress"
import { withStyles } from "@material-ui/core/styles"

const Spinner = withStyles({ root: { color: "#005291" }}) (CircularProgress)

export default Spinner