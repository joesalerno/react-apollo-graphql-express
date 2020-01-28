import React, { useState } from "react"
import Downshift from "downshift"
import TextField from "@material-ui/core/TextField"
import Chip from "@material-ui/core/Chip"
import Paper from "@material-ui/core/Paper"
import MenuItem from "@material-ui/core/MenuItem"

export default props => {

  const [inputValue, setInputValue] = props.inputValue && props.setInputValue 
    ? [props.inputValue, props.setInputValue]
    : useState("")

  const handleInputChange = event => setInputValue(event.target.value)
  
  const [selectedItem, setSelectedItem] = props.selectedItem && props.setSelectedItem
    ? [props.selectedItem, props.setSelectedItem]
    : useState([])

  const handleKeyDown = event => {
    console.log(event)
    if (selectedItem.length && !inputValue.length && event.key === 'Backspace') 
      setSelectedItem(selectedItem.slice(0, selectedItem.length - 1))
    if (props.onKeyDown) props.onKeyDown(event)
  }

  const toggleSelection = selection => selectedItem.some(selected =>
   selected[props.idField || props.id] === selection[props.idField || props.id])
    ? setSelectedItem(selectedItem.filter(item => item[props.idField || props.id] !== selection[props.idField || props.id]))
    : setSelectedItem([...selectedItem, selection])

  const handleSelect = selection => {
    toggleSelection(selection)
    setInputValue("")
  }

  return <Downshift
    onSelect={selection => {
      handleSelect(selection)
      if (props.onSelect) props.onSelect(selection)
    }}
    itemToString={item => item 
      ? props.displayField 
        ? item[props.displayField]
        : item[props.idField]
      : ""
    }
    selectedItem = {selectedItem}
    inputValue = {inputValue}
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
    }) => <div style={{width: "100%"}}>
      <TextField
        {...getInputProps()}
        id={props.id}
        value={isOpen ? inputValue : props.value || inputValue}
        inputRef={ref => props.inputRefs(ref)}
        required={props.required ? props.required : false}
        label={`Select multiple ${props.name ? props.name : props.id}`}
        InputProps={{ startAdornment: !selectedItem ? null :
          selectedItem.map((item, index) => <Chip
            key={`${props.name || props.id}-chip-${index}`}
            tabIndex={-1}
            label={props.displayField ? item[props.displayField] : item[props.idField]}
            onDelete={() => toggleSelection(item)}
          />)
        }}
        variant="outlined"
        margin="dense"
        fullWidth
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={openMenu}
        onClick={() => {
          if(props.onClick) props.onClick()
          openMenu()
        }}
        style={{ backgroundColor: "white" }}
      />
      {!isOpen || !props.data ? null : 
        <Paper {...getMenuProps()} style={{maxHeight: 200, overflow: "auto"}}>
          { props.data
            .filter(item => item[props.displayField].toLowerCase().includes(inputValue.toLowerCase()))
            .filter(props.filter ? props.filter : () => true)
            .map((item, index) => <MenuItem 
              {...getItemProps({
                item,
                index,
                key:`${props.name || props.id}-dropdown-menu-${index}`,
                style: {
                  backgroundColor: highlightedIndex === index ? "lightgray" : null,
                  fontWeight: selectedItem.some(selected =>
                    selected[props.idField || props.id] === item[props.idField || props.id])
                      ? "bold"
                      : "normal",
                }
              })}
            > {item[props.displayField]} </MenuItem>)
          }
        </Paper>
      }
    </div>}
  </Downshift>
}