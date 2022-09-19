import Header from "./components/Header"
import Inspector from "./components/Inspector"
import Map from "./components/Map"
import classes from "./App.module.scss"
import Tools from "./components/Tools"
import Info from "./components/Info"
import { useState } from "react"
import { ProvinceColour } from "./types/ProvinceColour"

const App = () => {
    const [selectedProvinceColour, setSelectedProvinceColour] = useState<ProvinceColour | undefined>()

    return (
        <div className={`${classes.container} h-100`}>
            <Info />
            <Header />
            <Tools />
            <Map onProvinceSelected={setSelectedProvinceColour} />
            <Inspector selectedProvinceColour={selectedProvinceColour} />
        </div>
    )
}

export default App