import { useState, useEffect } from 'react'
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Colours from './components/Colours';
import { getResultRGB, getResultLAB, hexToRgb, rgbToLAB, labDelta } from './components/Functions';

function App() {
  const [colours, setColours] = useState([])
  const [coloursMod, setColoursMod] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    const getColours = async () => {
      const coloursFromServer = await fetchColours()
      setColours(coloursFromServer)
      setColoursMod(coloursFromServer)
    }
    getColours()
  },[])

  const fetchColours = async () => {
    const res = await fetch('https://raw.githubusercontent.com/okmediagroup/color-test-resources/master/xkcd-colors.json')
    const data = await res.json()

    console.log("Data ", data);
    console.log("Data.colors ", data.colors);
    
    let resultRGB = await getResultRGB(data.colors);
    // console.log("Add RGB ", resultRGB);
    let resultLAB = await getResultLAB(resultRGB);
    console.log("Add LAB ", resultLAB);
    return resultLAB
  } 

  async function modifyColMod(colour, delta){
    let col = await {...colour, delta: delta}
    return col
  }

  async function filterCols(list) {
    const newColourList = list.sort((a, b) => {
      return a.delta - b.delta;
    })
    return newColourList.slice(0,100)
  }

  useEffect(() => {
    if(searchTerm !== "") {
      async function labValConv(lab){
        const deltaModList = []
        for(const colour of coloursMod){
          let labDiff = await labDelta(lab, colour.lab)
          let col = await modifyColMod(colour, labDiff)
          deltaModList.push(col)
        }
        return deltaModList
      }
      async function typeCheck(searchValue) {
        if(searchValue[0] === "#"){
          console.log("It's hex ", searchValue);
          const hextorgb = await hexToRgb(searchValue)
          const rgbtolab = await rgbToLAB(hextorgb)
          const labVal = await labValConv(rgbtolab)
          const filt = await filterCols(labVal)
          setFiltered(filt)
        } else if(searchValue[0] === "r" && searchValue[1] === "g" && searchValue[2] === "b"){
          console.log("It's rgb ", searchValue);
          let sp = searchValue.split(",")
          let r = parseInt(sp[0].slice(4))
          let g = parseInt(sp[1])
          let b = parseInt(sp[2])
          if(isNaN(r) || isNaN(g) || isNaN(b) ){
            alert("Input incorrect. Format must be 'rgb(r,g,b)', please check and try again")
          } else {
            const rgbtolab = await rgbToLAB({r: r, g: g, b: b})
            const labVal = await labValConv(rgbtolab)
            const filt = await filterCols(labVal)
            setFiltered(filt)
          }
          
        } else {
          console.log("It's text ", searchTerm);
          const newColourList = coloursMod.filter((colour) => {
            return colour.color.includes(searchTerm.toLowerCase())
          })
          if(newColourList.length === 0){
            alert("No matches found for")
          }
          setFiltered(newColourList)
        }
      }
      typeCheck(searchTerm)
    } else if(searchTerm === ""){
      console.log("Resetting Search");
      setFiltered(coloursMod)
    }
  },[coloursMod, searchTerm])

  const search = (e) =>{
    let regexText = /[A-Za-z0-9]/
    if(e[0] === "r" && e[1] === "g" && e[2] === "b" && (e.length >=10 && e.length <= 16)){
      let sp = e.split(",")
      let r = parseInt(sp[0].slice(4))
      let g = parseInt(sp[1])
      let b = parseInt(sp[2])
      if((r >= 0 && r <= 255) && (g >= 0 && g <= 255) && (b >= 0 && b <= 255) && e.charAt(e.length-1) === ")"){
        setSearchTerm(e)
      }
      else {
        alert("Input incorrect. Format must be 'rgb(r,g,b)', please check and try again")
      }
    } else if(e.length === 7){
      let regex = /^#[a-fA-F0-9]{6}/g 
      let isValid = regex.test(e)
      if(isValid){
        setSearchTerm(e)
      } else {
        alert("Input incorrect. Format must be '#09afAF', please check and try again")
      }
    } else if((regexText.test(e) || e === "") && e[0] !== "#" ){
      setSearchTerm(e)
    }
    else{
      alert("Please check your formatting. It has to be either in 'rgb(r,g,b)', '#09afAF', or plain text")
    }
  }

  return (
    <div className="App">
      <Header />
      <SearchBar onSearch={search}/>
      <Colours colours={filtered.length > 0 ? filtered : colours} />
    </div>
  );
}

export default App;
