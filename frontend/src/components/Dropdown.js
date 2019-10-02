import React from "react"
import Downshift from "downshift"
import TextField from "@material-ui/core/TextField"
import Paper from "@material-ui/core/Paper"
import MenuItem from "@material-ui/core/MenuItem"

export default props => 
  <Downshift
    onSelect={selection => props.onSelect(selection)}
    itemToString={item => (item ? props.displayField ? item[props.displayField] : item.name : "")}
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
    }) => (
      <div>
        <TextField
          {...getInputProps()}
          id={props.id}
          label={`Select ${props.id}`}
          autoComplete={props.id}
          required
          inputRef={ref => props.inputRef(ref)}
          variant="outlined"
          margin="dense"
          fullWidth
          onKeyPress={props.handleKeyPress}
          onFocus={openMenu}
          onClick={openMenu}
          style={{ backgroundColor: "white" }}
        />
        {!isOpen || props.query.loading ? null : (
          <Paper {...getMenuProps()} style={{maxHeight: 200, overflow: 'auto'}}>
            { props.query.data.customers
              .filter(item => item[props.displayField].toLowerCase().includes(inputValue.toLowerCase()))
              .map((item, index) => (
                <MenuItem 
                  {...getItemProps({
                    item,
                    index,
                    key:item.id,
                    style: {
                      backgroundColor: highlightedIndex === index ? 'lightgray' : null,
                      fontWeight: selectedItem === item ? 'bold' : 'normal',  
                    }
                  })}
                  key = {item[props.displayField]}
                > {item[props.displayField]} </MenuItem>))
            }
          </Paper>
        )}
      </div>
    )}
  </Downshift>