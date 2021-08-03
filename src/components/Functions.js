export async function hexToRgb(hex) {
    //https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}

export function hexToRgbString(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var r = parseInt(result[1], 16)
    var g = parseInt(result[2], 16)
    var b = parseInt(result[3], 16)
    var res = r +', ' + g + ', ' + b
    return result ? res : null;
}

export async function rgbToLAB(rgb){
    //function made with psuedocode on http://www.easyrgb.com/en/math.php and https://en.wikipedia.org/wiki/CIELAB_color_space
    var r = rgb.r / 255
    var g = rgb.g / 255
    var b = rgb.b / 255
    var x, y, z
    var l, a, bb
    var lab = []
    
    //adjusting rgb
    r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
  
    //forming xyz values - using given illuminant variables
    x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
    y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
    z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
  
    x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
    y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
    z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;
  
    l = (116 * y) - 16
    a = 500 * (x - y)
    bb = 200 * (y - z)
    lab = {...lab, l: l, a: a, b: bb}
    return lab
}

export async function labDelta(lab1, lab2) {
    // console.log("lab1 ", lab1, "lab2 ", lab2);
    var l1 = lab1.l
    var a1 = lab1.a
    var b1 = lab1.b
    var l2 = lab2.l
    var a2 = lab2.a
    var b2 = lab2.b
    // console.log("lab ", l1, a1, b1, l2, a2, b2);


    let delta = Math.sqrt(Math.pow((l1-l2),2) + Math.pow((a1-a2),2) + Math.pow((b1-b2),2))
    // console.log("delta ", delta);
    return delta

}

async function modifyColLAB(colour, lab){
    let col = await {...colour, lab: lab}
    return col
}

async function addResultLAB(colours) {
    let result = []
    for(const colour of colours) {
        let lab = await rgbToLAB(colour.rgb)
        let res = await modifyColLAB(colour, lab);
        result.push(res)
    }
    return result
}

export async function getResultLAB(colours) {
    let result = await addResultLAB(colours);
    return result
}

async function modifyColRGB(colour, hexRGB){
    let col = await {...colour, rgb: hexRGB}
    return col
}

async function addResultRGB(colours) {
    let result = []
    for(const colour of colours) {
        let hexRGB = await hexToRgb(colour.hex)
        let res = await modifyColRGB(colour, hexRGB);
        result.push(res)
    }
    return result
}

export async function getResultRGB(colours) {
    let result = await addResultRGB(colours);
    return result
}
