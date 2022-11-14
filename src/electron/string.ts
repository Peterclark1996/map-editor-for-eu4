export const cleanString = (str: string) => str.replace(/[?%*:|"<>]/g, "").trim()

export const normalisePath = (str: string) => str.replace(/\\/g, "/").trim()