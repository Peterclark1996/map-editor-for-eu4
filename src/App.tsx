import Header from "./components/Header"
import Inspector from "./components/Inspector"
import Map from "./components/Map"
import classes from "./App.module.scss"
import Tools from "./components/Tools"
import Info from "./components/Info"
import { useEffect, useReducer, useState } from "react"
import { Colour } from "./types/Colour"
import reducer, { ActionTypes, initialState } from "./actions/reducer"
import { ipcRenderer } from "electron"

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const [selectedProvinceColour, setSelectedProvinceColour] = useState<Colour | undefined>()

    useEffect(() => {
        ipcRenderer.invoke("fetch-definition")
            .then((data: string) => {
                const provinces = data.split("\n").map(row => {
                    const parts = row.split(";")
                    return {
                        id: parseInt(parts[0]),
                        colour: {
                            red: parseInt(parts[1]),
                            green: parseInt(parts[2]),
                            blue: parseInt(parts[3])
                        },
                        name: parts[4]
                    }
                })
                dispatch({ type: ActionTypes.PROVINCES_LOADED, provinces })
            })
    }, [])

    return (
        <div className={`${classes.container} h-100`}>
            <Info />
            <Header />
            <Tools />
            <Map onProvinceSelected={setSelectedProvinceColour} />
            <Inspector state={state} selectedProvinceColour={selectedProvinceColour} />
        </div>
    )
}

export default App