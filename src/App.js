import { useState, useEffect } from 'react'

import './App.css';
import Header from './components/Header';
import Colours from './components/Colours';

function App() {
  const [colours, setColours] = useState([])

  useEffect(() => {
    const getColours = async () => {
      const coloursFromServer = await fetchColours()
      setColours(coloursFromServer)
    }
    getColours()
  },[])

  const fetchColours = async () => {
    const res = await fetch('https://raw.githubusercontent.com/okmediagroup/color-test-resources/master/xkcd-colors.json')
    const data = await res.json()

    console.log(data);
    console.log("colors ", data.colors);
    return data
  }

  return (
    <div className="App">
      <Header />
      <Colours colours={colours}/>
      
    </div>
  );
}

export default App;
