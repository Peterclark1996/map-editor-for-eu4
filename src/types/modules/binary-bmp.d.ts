declare module "binary-bmp" {
    export function make(options: {
        bits: number
        width: number
        height: number
        data: number[]
    }): Uint8Array
}