import { useCallback, useEffect, useRef, useState } from "react"
import { ActionProvinceMapUpdated, ActionTypes } from "../../actions/projectReducer"
import { Tool } from "../../enums/Tool"
import { Colour } from "../../types/Colour"
import { Project } from "../../types/Project"
import classes from "./Map.module.scss"

const MAX_ZOOM = 17
const MIN_ZOOM = 0.1
const SCROLL_SENSITIVITY = 0.001

type MapProps = {
    state: Project
    selectedTool: Tool
    selectedToolSize: number
    selectedProvinceColour: Colour | undefined
    onProvinceSelected: (province: Colour) => void
    dispatch: (action: ActionProvinceMapUpdated) => void
}

const Map = ({ state, selectedTool, selectedToolSize, selectedProvinceColour, onProvinceSelected, dispatch }: MapProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const backCanvasRef = useRef<HTMLCanvasElement>(null)

    const [isMouseDown, setIsMouseDown] = useState(false)
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
    const [cameraZoom, setCameraZoom] = useState(1)
    const [cameraOffset, setCameraOffset] = useState({ x: 0, y: 0 })
    const [isMapLoaded, setIsMapLoaded] = useState(false)

    const draw = useCallback((
        canvas: HTMLCanvasElement,
        backCanvas: HTMLCanvasElement
    ) => {
        const ctx = canvas.getContext("2d")
        if (ctx === null) return

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        ctx.scale(cameraZoom, cameraZoom)

        ctx.imageSmoothingEnabled = false
        ctx.drawImage(backCanvas, cameraOffset.x, cameraOffset.y)
    }, [cameraOffset.x, cameraOffset.y, cameraZoom])

    useEffect(() => {
        if (!isMapLoaded) return

        const canvas = canvasRef.current
        const backCanvas = backCanvasRef.current
        if (canvas === null || backCanvas === null) return

        draw(canvas, backCanvas)
    }, [cameraOffset.x, cameraOffset.y, cameraZoom, draw, isMapLoaded])

    useEffect(() => {
        const canvas = backCanvasRef.current
        if (canvas === null) return
        const ctx = canvas.getContext("2d")
        if (ctx === null) return

        const img = new Image()
        img.onload = () => {
            ctx.drawImage(img, 0, 0)
            setIsMapLoaded(true)
        }
        img.src = URL.createObjectURL(new Blob([state.provinceMap]))
    }, [state.provinceMap])

    const paint = useCallback((e: MouseEvent) => {
        if (selectedProvinceColour === undefined) return

        const canvas = canvasRef.current
        const backCanvas = backCanvasRef.current
        if (canvas === null || backCanvas === null) return
        const ctx = backCanvas.getContext("2d")
        if (ctx === null) return

        const rect = canvas.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - 40 // rect.top should return 40, but it doesn't?
        const x = Math.floor((mouseX - cameraOffset.x * cameraZoom) / cameraZoom)
        const y = Math.floor((mouseY - cameraOffset.y * cameraZoom) / cameraZoom)

        ctx.fillStyle = `rgb(${selectedProvinceColour.red}, ${selectedProvinceColour.green}, ${selectedProvinceColour.blue})`
        ctx.fillRect(x - Math.floor(selectedToolSize / 2), y - Math.floor(selectedToolSize / 2), selectedToolSize, selectedToolSize)

        const buffer = Buffer.from(new Uint8Array(ctx.getImageData(0, 0, canvas.width, canvas.height).data.buffer))
        dispatch({ type: ActionTypes.PROVINCE_MAP_UPDATED, provinceMap: buffer })

        draw(canvas, backCanvas)
    }, [cameraOffset.x, cameraOffset.y, cameraZoom, dispatch, draw, selectedProvinceColour, selectedToolSize])

    const onMouseDown = useCallback((e: MouseEvent) => {
        const canvas = canvasRef.current
        if (canvas === null) return
        const ctx = canvas.getContext("2d")
        if (ctx === null) return
        const target = e.currentTarget as HTMLElement
        if (target === null) return
        setIsMouseDown(true)
        setDragStart({
            x: e.clientX / cameraZoom - cameraOffset.x,
            y: e.clientY / cameraZoom - cameraOffset.y
        })

        if (selectedTool === Tool.POINTER) {
            const rect = target.getBoundingClientRect()
            const point = ctx.getImageData(e.clientX - rect.left, e.clientY - rect.top, 1, 1).data
            onProvinceSelected({ red: point[0], green: point[1], blue: point[2] })
        } else {
            paint(e)
        }
    }, [cameraOffset.x, cameraOffset.y, cameraZoom, onProvinceSelected, paint, selectedTool])

    const onMouseUp = () => setIsMouseDown(false)

    const onMouseMove = useCallback((e: MouseEvent) => {
        if (!isMouseDown) return

        if (selectedTool === Tool.POINTER) {
            setCameraOffset({
                x: e.clientX / cameraZoom - dragStart.x,
                y: e.clientY / cameraZoom - dragStart.y
            })
        } else {
            paint(e)
        }
    }, [cameraZoom, dragStart.x, dragStart.y, isMouseDown, paint, selectedTool])

    const onMouseZoom = useCallback((e: WheelEvent) => {
        if (isMouseDown) return

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
    }, [cameraZoom, isMouseDown])

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