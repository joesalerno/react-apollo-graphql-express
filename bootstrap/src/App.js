import React, {useState} from 'react';
import WindowLayout from "./components/WindowLayout"
import TextField from "@material-ui/core/TextField"
import './App.css';

function App() {
  let a = []
  let [vals, setVals] = useState({})
  for (let i = 0; i < 10; i++) a.push(i)
  return <WindowLayout logo><div>
    {a.map(x=><TextField variant="outlined" key={x} id={x} error={!vals[x] || vals[x] == ""} onChange={event=> 
      {console.log(event.target)
      setVals({...vals, [event.target.id]: event.target.value})}
    }></TextField>)}
  </div>
    
  </WindowLayout>
}

export default App;
