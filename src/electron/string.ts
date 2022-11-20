export const cleanString = (str: string) => str.replace(/[?%*:|"<>]/g, "").trim()

export const normalisePath = (str: string) => str.replace(/\\/g, "/").trim()

export const convertTxtFileToObject = (txt: string): { [key: string]: string } => {
    const dataWithNoComments = txt.split("\n").map(line => line.split("#")[0].trim()).filter(line => line.length > 0).join(" ")
    const dataWithPaddedSymbols = dataWithNoComments.replace(/=/g, " = ").replace(/{/g, " { ").replace(/}/g, " } ")
    const dataWithNoExtraSpaces = dataWithPaddedSymbols.replace(/\s+/g, " ")
    const symbols = dataWithNoExtraSpaces.split(" ")

    let index = 0
    const obj: { [key: string]: string } = {}

    while (index < symbols.length) {
        const symbol = symbols[index]

        if (symbol === "=") {
            const key = symbols[index - 1]
            let depth = 0
            const valueParts = []

            while (index < symbols.length) {
                const symbol = symbols[index]
                if (symbol === "{") {
                    depth++
                }
                if (symbol === "}") {
                    depth--
                    if (depth <= 0) break
                }
                valueParts.push(symbol)
                index++
            }

            obj[key] = valueParts.join(" ").trim().slice(4)
        }

        index += 1
    }

    return obj
}