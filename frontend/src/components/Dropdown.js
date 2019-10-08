import React from "react"
import Downshift from "downshift"
import TextField from "@material-ui/core/TextField"
import Paper from "@material-ui/core/Paper"
import MenuItem from "@material-ui/core/MenuItem"

export default props => 
  <Downshift
    onSelect={selection => props.onSelect(selection)}
    itemToString={item => (item ? props.displayField ? item[props.displayField] : item[props.id] : "")}
  >
    {({
      getInputProps,
      getItemProps,
      getMenuProps,
      isOpen,
      openMenu,
      inputValue,
      selectedItem,
      highlightedIndex
    }) => ( <div style={{width: "100%"}}>
      <TextField
        {...getInputProps()}
        id={props.id}
        value={isOpen ? inputValue : props.value || inputValue}
        inputRef={ref => props.inputRef(ref)}
        required={props.required ? props.required : false}
        label={`Select ${props.name ? props.name : props.id}`}
        variant="outlined"
        margin="dense"
        fullWidth
        onKeyPress={props.onKeyPress}
        onFocus={openMenu}
        onClick={openMenu}
        style={{ backgroundColor: "white" }}
      />
      {!isOpen || !props.data ? null : (
        <Paper {...getMenuProps()} style={{maxHeight: 200, overflow: "auto"}}>
          { props.data
            .filter(item => item[props.displayField].toLowerCase().includes(inputValue.toLowerCase()))
            .filter(props.filter ? props.filter : () => true)
            .map((item, index) => (
              <MenuItem 
                {...getItemProps({
                  item,
                  index,
                  key:`${props.name || props.id}-dropdown-menu-${index}`,
                  style: {
                    backgroundColor: highlightedIndex === index ? "lightgray" : null,
                    fontWeight: selectedItem === item ? "bold" : "normal",  
                  }
                })}
              > {item[props.displayField]} </MenuItem>))
          }
        </Paper>
      )}
    </div>)}
  </Downshift>