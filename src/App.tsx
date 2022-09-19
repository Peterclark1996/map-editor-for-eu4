import Header from "./components/Header"
import Inspector from "./components/Inspector"
import Map from "./components/Map"
import classes from "./App.module.scss"
import Tools from "./components/Tools"
import Info from "./components/Info"

const App = () => {
    return (
        <div className={`${classes.container} h-100`}>
            <Info />
            <Header />
            <Tools />
            <Map />
            <Inspector />
        </div>
    )
}

export default App