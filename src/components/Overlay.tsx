import classes from './Overlay.module.scss';

type OverlayProps = {
    children: React.ReactNode,
    onOutsideClick: () => void
}

const Overlay = ({ children, onOutsideClick }: OverlayProps) => {
    return (
        <div className={`d-flex ${classes.overlayBackground}`} onClick={onOutsideClick}>
            <div className={`${classes.overlay} background rounded`} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div >
    )
}

export default Overlay