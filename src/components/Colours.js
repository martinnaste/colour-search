import React from 'react'
import {hexToRgbString} from './Functions'

const Colours = ({colours}) => {

    return (
        <div>
            <table className="center-table" id="tableID">
                <thead>
                    <tr>
                        <th> </th>
                        <th className="th-s">Colour</th>
                        <th className="th">Hex</th>
                        <th className="th">RBG</th>
                    </tr>
                </thead>
                <tbody>
                    {colours.length !== 0 ? 
                    colours.colors.map((colour) => (
                        <tr key={colour.hex.toString()}>
                            <td className="td">
                                <div className="square" 
                                    style={{
                                        backgroundColor: `${colour.hex}`
                                    }}
                                />
                            </td>
                            <td className="td-s">
                                {colour.color}
                            </td>
                            <td className="td">
                                {colour.hex}
                            </td>
                            <td className="td">
                                {hexToRgbString(colour.hex.toString())}
                            </td>
                        </tr>                    
                    )) 
                    : 
                    <tr>
                        <td>
                            <h2>Loading</h2>
                        </td>
                    </tr>}
                </tbody>
            </table>
        </div>

        
    )
}

// colours.length !== 0 ? 
// colours.colors.filter((colour => {
//     // if(searchVal === ""){
//     //     return colour
//     //     //return the mapping of all of them 
//     // } else if(searchValType === 0 && colour.color.includes(searchVal.toLowerCase())){ //colour name
//     //     return colour
//     // } else if(searchValType === 2){ //rgb


//     //     //add all distances to array, sort array by distance asc. distance and hex key values? return the mapping of the new array
//     //     // console.log("distance ", dist);
//     // } else if(searchValType === 1) { // hex
//     //     // need to go to rgb then do distance
//     // }
//     return colour
// })).map((colour) => (

export default Colours
