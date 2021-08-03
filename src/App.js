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

    console.log("data ", data);
    console.log("data.colors ", data.colors);
    
    let resultRGB = await getResultRGB(data.colors);
    console.log("res end ", resultRGB);
    let resultLAB = await getResultLAB(resultRGB);
    console.log("red end 2 ", resultLAB);
    return resultLAB
  }  

  // async function typeCheck(searchValue) {
  //   // console.log("sval ", searchValue);
  //   if(searchValue[0] === "#"){
  //     console.log("its hex ", searchValue);
  //     const hextorgb = await hexToRgb(searchValue)
  //     const rgbtolab = await rgbToLAB(hextorgb)
  //     const labVal = await labValConv(rgbtolab)
  //     console.log("labval ", labVal);
  //     const filt = await filterCols(labVal)
  //     setFiltered(filt)
  //     // return(labVal)
  //     // return rgbtolab
  //     // get lab val corresponding to the hex. run the comparison with everything in the full colours list, and add the distances to another list with the hex value.
  //     //sort from smallest to largest, return that array as the new colours list, slicing after 100
  //   } else if(searchValue[0] === "r" && searchValue[1] === "g" && searchValue[2] === "b"){
  //     console.log("its rgb ", searchValue);
  //   } else {
  //     console.log("its text ");
  //   }
  // }

  async function modifyColMod(colour, delta){
    let col = await {...colour, delta: delta}
    return col
}

  //put labval here and call it from typecheck????
  // async function labValConv(lab){
  //   console.log("col mod ", coloursMod, "lab ", lab);
  //   const deltaModList = []
  //   for(const colour of coloursMod){
  //     // console.log("colour in mod ", colour, "mod lab ", colour.lab);
  //     let labDiff = await labDelta(lab, colour.lab)
  //     // console.log("labdiff ", labDiff);
  //     let col = await modifyColMod(colour, labDiff)
  //     deltaModList.push(col)
  //     //setColoursMod({...coloursMod, delta: labDiff}) // change this
  //   }
  //   // console.log("deltalist ", deltaModList);
  //   return deltaModList
  // }

  async function filterCols(list) {
    const newColourList = list.sort((a, b) => {
      return a.delta - b.delta;
    })
    return newColourList.slice(0,100)
  }

  // async function filterColsText(searchTerm) {
  //   const newColourList = coloursMod.color.filter((colour) => {
  //     if(colour.includes(searchTerm.toLowerCase())){
  //       return colour
  //     }
  //   })
  //   return newColourList
  // }

  useEffect(() => {
    //call my functions here?
    if(searchTerm !== "") {
      //check for error here
      async function labValConv(lab){
        console.log("col mod ", coloursMod, "lab ", lab);
        const deltaModList = []
        for(const colour of coloursMod){
          // console.log("colour in mod ", colour, "mod lab ", colour.lab);
          let labDiff = await labDelta(lab, colour.lab)
          // console.log("labdiff ", labDiff);
          let col = await modifyColMod(colour, labDiff)
          deltaModList.push(col)
        }
        // console.log("deltalist ", deltaModList);
        return deltaModList
      }
      async function typeCheck(searchValue) {
        // console.log("sval ", searchValue);
        if(searchValue[0] === "#"){
          console.log("its hex ", searchValue);
          const hextorgb = await hexToRgb(searchValue)
          const rgbtolab = await rgbToLAB(hextorgb)
          const labVal = await labValConv(rgbtolab)
          const filt = await filterCols(labVal)
          setFiltered(filt)
        } else if(searchValue[0] === "r" && searchValue[1] === "g" && searchValue[2] === "b"){
          console.log("its rgb ", searchValue);
          let sp = searchValue.split(",")
          let r = parseInt(sp[0].slice(4))
          let g = parseInt(sp[1])
          let b = parseInt(sp[2])
          // console.log("sp ", r, g, b);
          const rgbtolab = await rgbToLAB({r: r, g: g, b: b})
          const labVal = await labValConv(rgbtolab)
          const filt = await filterCols(labVal)
          setFiltered(filt)
        } else {
          console.log("its text ");
          const newColourList = coloursMod.filter((colour) => {
            return colour.color.includes(searchTerm.toLowerCase())
          })
          setFiltered(newColourList)
        }
      }
      typeCheck(searchTerm)
    } else if(searchTerm === ""){
      setFiltered(coloursMod)
    }
  },[coloursMod, searchTerm])

  const search = (e) =>{
    console.log("e ",e);
    if(e[0] === "r" && e[1] === "g" && e[2] === "b" && (e.length >=10 && e.length <= 16)){
      let sp = e.split(",")
      let r = parseInt(sp[0].slice(4))
      let g = parseInt(sp[1])
      let b = parseInt(sp[2])
      if((r >= 0 && r <= 255) && (g >= 0 && g <= 255) && (b >= 0 && b <= 255)){
        setSearchTerm(e)
      }
      else {
        //error
      }
    } else if(e.length === 7){
      let regex = /^#[A-Za-z0-9]/
      let isValid = regex.test(e)
      if(isValid){
        setSearchTerm(e)
      } else {
        //error
      }
    }
    // setSearchTerm(e)
  }

  return (
    <div className="App">
      <Header />
      <SearchBar onSearch={search}/>
      {/* {search error thing here } */}
      <Colours colours={filtered.length > 0 ? filtered : colours} />
      {}
      
    </div>
  );
}

export default App;
