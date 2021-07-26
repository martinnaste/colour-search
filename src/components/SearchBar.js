import React, {useState} from 'react'

const SearchBar = ({search}) => {
    const [inputVal, setInputVal] = useState("")
    
    const handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            // console.log("yeeee hawwww ",inputVal);
            search(inputVal);
        }
    }

    return (
        <div className="search">
            <input 
            type="text" 
            placeholder="Enter Colour"
            onKeyPress={handleKeyPress}
            onChange={(e) => setInputVal(e.target.value)}
            />
        </div>
    )
}

export default SearchBar
