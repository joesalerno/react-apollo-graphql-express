import React, { useState } from "react"
import WindowLayout from "./components/WindowLayout"
import "./App.css"

function App() {
  const [values, setValues] = useState({})
  return (
    <WindowLayout>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {Array.from(Array(10)).map((x, i) => (
          <input
            onChange={event => {
              setValues({ ...values, [i]: event.target.value })
            }}
            id={i}
            value={values[i]}
            style={{
              width: 165,
              backgroundColor: values[i]
            }}
          />
        ))}
      </div>
    </WindowLayout>
  )
}

export default App
