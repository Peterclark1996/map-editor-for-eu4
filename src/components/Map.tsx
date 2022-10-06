import { useCallback, useEffect, useRef, useState } from "react"
import { Colour } from "../types/Colour"
import { Project } from "../types/Project"
import classes from "./Map.module.scss"

const MAX_ZOOM = 17
const MIN_ZOOM = 0.1
const SCROLL_SENSITIVITY = 0.001

type MapProps = {
    state: Project
    onProvinceSelected: (province: Colour) => void
}

const Map = ({ state, onProvinceSelected }: MapProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const backCanvasRef = useRef<HTMLCanvasElement>(null)

    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
    const [cameraZoom, setCameraZoom] = useState(1)
    const [cameraOffset, setCameraOffset] = useState({ x: 0, y: 0 })
    const [isMapLoaded, setIsMapLoaded] = useState(false)

    useEffect(() => {
        if (!isMapLoaded) return

        const canvas = canvasRef.current
        const backCanvas = backCanvasRef.current
        if (canvas === null || backCanvas === null) return
        const ctx = canvas.getContext("2d")
        if (ctx === null) return

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        ctx.translate(window.innerWidth / 2, window.innerHeight / 2)
        ctx.scale(cameraZoom, cameraZoom)

        ctx.translate(window.innerWidth / 2 + cameraOffset.x, window.innerHeight / 2 + cameraOffset.y)

        ctx.imageSmoothingEnabled = false
        ctx.drawImage(backCanvas, 0, 0)
    }, [cameraOffset.x, cameraOffset.y, cameraZoom, isMapLoaded])

    useEffect(() => {
        const canvas = backCanvasRef.current
        if (canvas === null) return
        const ctx = canvas.getContext("2d")
        if (ctx === null) return

        const img = new Image()
        img.onload = () => {
            setCameraOffset({ x: img.width / -2, y: img.height / -2 })
            ctx.drawImage(img, 0, 0)
            setIsMapLoaded(true)
        }
        img.src = URL.createObjectURL(new Blob([state.provinceMap]))
    }, [state.provinceMap])

    const onMouseDown = useCallback((e: MouseEvent) => {
        const canvas = canvasRef.current
        if (canvas === null) return
        const ctx = canvas.getContext("2d")
        if (ctx === null) return
        const target = e.currentTarget as HTMLElement
        if (target === null) return
        const rect = target.getBoundingClientRect()
        const point = ctx.getImageData(e.clientX - rect.left, e.clientY - rect.top, 1, 1).data
        onProvinceSelected({ red: point[0], green: point[1], blue: point[2] })

        setIsDragging(true)
        setDragStart({
            x: e.clientX / cameraZoom - cameraOffset.x,
            y: e.clientY / cameraZoom - cameraOffset.y
        })
    }, [cameraOffset.x, cameraOffset.y, cameraZoom, onProvinceSelected])

    const onMouseUp = () => setIsDragging(false)

    const onMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging) return

        setCameraOffset({
            x: e.clientX / cameraZoom - dragStart.x,
            y: e.clientY / cameraZoom - dragStart.y
        })
    }, [cameraZoom, dragStart.x, dragStart.y, isDragging])

    const onMouseZoom = useCallback((e: WheelEvent) => {
        if (isDragging) return

        const newZoom = cameraZoom - (e.deltaY * SCROLL_SENSITIVITY * cameraZoom)
        if (newZoom < MIN_ZOOM) {
            setCameraZoom(MIN_ZOOM)
            return
        }
        if (newZoom > MAX_ZOOM) {
            setCameraZoom(MAX_ZOOM)
            return
        }
        setCameraZoom(newZoom)
    }, [cameraZoom, isDragging])

    useEffect(() => {
        const canvas = canvasRef.current
        if (canvas === null) return

        canvas.addEventListener("mousedown", onMouseDown)
        canvas.addEventListener("mouseup", onMouseUp)
        canvas.addEventListener("mousemove", onMouseMove)
        canvas.addEventListener("wheel", onMouseZoom)
        return () => {
            canvas.removeEventListener("mousedown", onMouseDown)
            canvas.removeEventListener("mouseup", onMouseUp)
            canvas.removeEventListener("mousemove", onMouseMove)
            canvas.removeEventListener("wheel", onMouseZoom)
        }
    }, [onMouseZoom, cameraZoom, onMouseDown, onMouseMove])

    return (
        <div className={`${classes.container} overflow-hidden`}>
            <canvas ref={canvasRef} />
            <canvas ref={backCanvasRef} className={classes.backCanvas} width="5632" height="2048" />
        </div>
    )
}

export default Map