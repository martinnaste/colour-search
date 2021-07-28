import React, {useState, useRef} from 'react'

function SearchBar({onSearch}){
    const [searchText, setSearchText] = useState("")
    const inputEl = useRef("")
    
    const handleKeyPress = (e) => {
        if(e.key=== 'Enter') {
          onSearch(searchText)
        }
      }
    

    const handleInput = () => {
        setSearchText(inputEl.current.value)
    }

    return (
        <div className="search">
            <input 
            ref={inputEl}
            type="text" 
            placeholder="Enter Colour"
            onKeyPress={handleKeyPress}
            onChange={handleInput}
            value={searchText}
            />
        </div>
    )
}

export default SearchBar
