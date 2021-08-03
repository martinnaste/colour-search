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
                    colours.map((colour) => (
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

export default Colours
