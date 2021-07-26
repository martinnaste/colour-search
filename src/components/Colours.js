import React from 'react'

const Colours = ({colours}) => {

    // taken from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        var r = parseInt(result[1], 16)
        var g = parseInt(result[2], 16)
        var b = parseInt(result[3], 16)
        var res = r +', ' + g + ', ' + b
        return result ? res : null;
      }
      

    return (
        <table className="center">
            <thead>
                <tr>
                    <th> </th>
                    <th>Colour</th>
                    <th>Hex</th>
                    <th>RBG</th>
                </tr>
            </thead>
            <tbody>
                {colours.length !== 0 ? 
                colours.colors.map((colour) => (
                    <tr key={colour.hex.toString()}>
                        <td>
                            <div className="square" 
                                style={{
                                    backgroundColor: `${colour.hex}`
                                }}
                            />
                        </td>
                        <td>
                            {colour.color}
                        </td>
                        <td>
                            {colour.hex}
                        </td>
                        <td>
                            {hexToRgb(colour.hex.toString())}
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
    )
}

export default Colours
