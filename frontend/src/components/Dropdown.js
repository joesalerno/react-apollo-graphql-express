import React from "react"
import Downshift from "downshift"

export default ({
  data,
  itemToString,
  onClick,
  onChange,
  readOnly,
  acceptTypedInput, inputField,
  validateInput,
  inputValue, setInputValue, 
  selectedItem,
  initialSelectedItem,
  width,
  placeholder,
  inputProps,
}) => <Downshift
  itemToString={ itemToString || (item => item) }
  onClick={ onClick || (() => {}) }
  onChange={ onChange || (selection => { if (selection) alert(itemToString(selection)) }) }
  inputValue={ inputValue }
  setInputValue={ setInputValue }
  selectedItem={ selectedItem }
  initialSelectedItem={ initialSelectedItem }
>
  {({
    getInputProps,
    getItemProps,
    getToggleButtonProps,
    getMenuProps,
    selectedItem,
    selectItem,
    clearSelection,
    inputValue,
    highlightedIndex,
    isOpen,
    openMenu,
    closeMenu
  }) => {
    const filteredData = readOnly ? data : data.filter(item => !inputValue || itemToString ? itemToString(item).includes(inputValue) : item.includes(inputValue))
    const validTypedInput = () => acceptTypedInput && (!validateInput || validateInput(inputValue))
    const selectTypedInput = () => selectItem(inputField ? {[inputField]: inputValue} : inputValue)
    return <div>
      <div>
        <input {...getInputProps({style: { 
          width: `calc(${width} - 5.2px)` || "200px",
          padding: "0 0 0 2px",
          border: "2px",
          borderStyle:"solid",
          borderRadius: "3px",
          borderColor: validateInput ? validateInput(inputValue) ? "#005291" : "#F00" : "#005291" 
        },
          onKeyDown: event => { if (event.key === "Enter" && validTypedInput()) selectTypedInput() },
          onClick: () => {if (!selectedItem || readOnly) openMenu()},
          onBlur: () => {validTypedInput() ? selectTypedInput() : setInputValue(itemToString(selectedItem)); closeMenu() },
          onChange: event => setInputValue(event.target.value),
          placeholder,
          readOnly,
          ...inputProps,
         })}  
        />

        {!readOnly && selectedItem && <button onClick={() => {clearSelection();openMenu();}}
          style={{ background: "#FFF0", border: "0", margin: "-16px", width: "16px"}}
        > ✕ </button>}
        
        {(readOnly || !selectedItem) && <button {...getToggleButtonProps()}
          style={{ background: "#FFF0", border: "0", margin: "-16px", width: "16px" }}
        > ⏷ </button>}

      </div>
      {isOpen && <div style={{
        position: "absolute",
        zIndex: 2,
        background: "#FFF",
        width: `calc(${width} - 1.6px)` || "196.4px",
        maxHeight: "298px",
        overflowY: "auto",
        border: "1px",
        borderColor: "#7A7A7A",
        borderStyle: isOpen && filteredData.length ? "solid" : "hidden"
      }}>
        <ul {...getMenuProps({ style: { listStyleType: "none" }})}>
          {filteredData.map((item, index) => 
            <li key={`dropdown-item-${index}-${(item.id || item._id || item.uuid) ? (item.id || item._id || item.uuid) : itemToString ? itemToString(item) : item}`}
              {...getItemProps({ item, index, style: {
                padding: "0 0 0 2px",
                backgroundColor: highlightedIndex === index ? "lightgray" : null,
                fontWeight: selectedItem === item ? "bold" : "normal",
              }})}
            > {itemToString ? itemToString(item) : item} </li>
          )}
        </ul>
      </div>}
    </div>
  }}
</Downshift>