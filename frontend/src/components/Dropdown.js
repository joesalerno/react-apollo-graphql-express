import React from "react"
import Downshift from "downshift"

export default ({data, itemToString, width, onChange, onClick, allowTypedValues, inputField, validateInput, inputProps, initialSelectedItem}) => <Downshift
  onClick={onClick || (() => {})}
  onChange={ onChange || (selection => { if (selection) alert(itemToString(selection)) }) }
  itemToString={itemToString || (item => item)}
  initialSelectedItem={initialSelectedItem}
>
  {({
    getInputProps,
    getItemProps,
    getToggleButtonProps,
    selectedItem,
    selectItem,
    clearSelection,
    inputValue,
    highlightedIndex,
    isOpen,
    openMenu
  }) => {
    const filteredData = data.filter(item => !inputValue || itemToString ? itemToString(item).includes(inputValue) : item.includes(inputValue))
    return <div>
      <div>
        <input {...getInputProps({style: { width: width || "200px", border: "1px", borderStyle:"solid", borderColor: validateInput ? validateInput(inputValue) ? "#0F0" : "#F00" : "#7A7A7A" }, ...inputProps, 
          onKeyDown: event => { if (allowTypedValues && event.key === "Enter" && (!validateInput || validateInput(inputValue))) selectItem(inputField ? {[inputField]: inputValue} : inputValue) },
          onClick: () => {if (!selectedItem) openMenu()}
         })}
          
        />
        {selectedItem ? (
          <button onClick={clearSelection}
            style={{ background: "#FFF0", border: "0", margin: "-16px", width: "16px"}}
          > ✕ </button>
        ) : (
          <button {...getToggleButtonProps()}
            style={{ background: "#FFF0", border: "0", margin: "-16px", width: "16px" }}
          > ⌄ </button>
        )}
      </div>
      <div style={{
        position: "absolute",
        background: "#FFF",
        width: width || "200px",
        border: "1px",
        borderColor: "#7A7A7A",
        borderStyle: isOpen && filteredData.length ? "solid" : "hidden"
      }}>
        <ul style={{ listStyleType: "none" }}>
          {isOpen && filteredData.map((item, index) => 
              <li key={`dropdown-item-${index}-${itemToString ? itemToString(item) : item}`}
                {...getItemProps({ item, index, style: {
                  padding: "0 0 0 4px",
                  backgroundColor:
                    highlightedIndex === index ? "lightgray" : null,
                  fontWeight: selectedItem === item ? "bold" : "normal"
                }})}
              > {itemToString ? itemToString(item) : item} </li>
            )}
        </ul>
      </div>
    </div>
  }}
</Downshift>