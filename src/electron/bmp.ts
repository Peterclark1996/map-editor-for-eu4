import { make } from "binary-bmp"

export const convertTo24Bmp = (rgbaArray: Uint8Array, width: number, height: number) => {
    const rgbArray = new Array(rgbaArray.length / 4 * 3)
    for (let i = 0; i < rgbaArray.length; i += 4) {
        rgbArray[i / 4 * 3] = rgbaArray[i]
        rgbArray[i / 4 * 3 + 1] = rgbaArray[i + 1]
        rgbArray[i / 4 * 3 + 2] = rgbaArray[i + 2]
    }

    return make({
        bits: 24,
        width,
        height,
        data: Array.from(rgbArray)
    })
}