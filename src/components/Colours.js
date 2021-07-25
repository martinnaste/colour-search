import React from 'react'

const Colours = ({colours}) => {
    return (
        <>
            {console.log('col in col' , colours)}
            {colours.length !== 0 ? colours.colors.map((colour) => (
                colour.hex //EDIT THIS HERE
            )) : <h3>Loading</h3>}
        </>
    )
}

export default Colours
