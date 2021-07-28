import { useState, useEffect } from 'react'
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Colours from './components/Colours';
import { getResultRGB, getResultLAB } from './components/Functions';

function App() {
  const [colours, setColours] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filtered, setFiltered] = useState([])
  const [searchType, setSearchType] = useState(0)

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

    console.log("data ", data);
    console.log("data.colors ", data.colors);
    
    let resultRGB = await getResultRGB(data.colors);
    console.log("res end ", resultRGB);
    let resultLAB = await getResultLAB(resultRGB);
    console.log("red end 2 ", resultLAB);
    return data
  }  

  function typeCheck(searchValue) {
    console.log("sval ", searchValue);
    var sendToConv = ""
    if(searchValue[0] === "#"){
      console.log("its hex ", searchValue);
      // get lab val corresponding to the hex. run the comparison with everything in the full colours list, and add the distances to another list with the hex value.
      //sort from smallest to largest, return that array as the new colours list, slicing after 100
    } else if(searchValue[0] === "r" && searchValue[1] === "g" && searchValue[2] === "b"){
      console.log("its rgb ", searchValue);
    } else {
      console.log("its text ");
    }
  }

  useEffect(() => {
    console.log("search ", searchTerm);
    //call my functions here?
    typeCheck(searchTerm)
  },[searchTerm])

  const search = (e) =>{
    console.log("e ",e);
    setSearchTerm(e)
  }

  return (
    <div className="App">
      <Header />
      <SearchBar onSearch={search}/>
      <Colours colours={colours} /> 
      
    </div>
  );
}

export default App;
