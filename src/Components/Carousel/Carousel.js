import * as React from "react"
import TouchSweep from "touchsweep"
import '../Carousel/Carousel.css';
import noImage from '../../Assets/img/no-image.png';

export const Carousel = props => {
    const itemWidth = props.itemWidth
    const len = props.items.length
    const radius = Math.round((itemWidth || 210) / 2 / Math.tan(Math.PI / len))
    const theta = 360 / len

    const ref = React.useRef(null)
    const [selectedIndex, setSelectedIndex] = React.useState(0)

    const getSlideStyle = index => {
        const style = {}

        if (index < len) {
            const cellAngle = theta * index

            style.opacity = 1
            style.transform = `rotateY(${cellAngle}deg) translateZ(${radius}px)`
        } else {
            style.opacity = 0
            style.transform = "none"
        }

        return style
    }

    const getItemStyle = () => {
        const angle = theta * selectedIndex * -1

        return {
            transform: `translateZ(${-1 * radius}px) rotateY(${angle}deg)`
        }
    }


  

    const getClassName = parts =>
        Array.isArray(parts)
            ? parts.map(part => `${props.classNamePrefix}${part}`).join(" ")
            : `${props.classNamePrefix}${parts}`

    const prev = () => setSelectedIndex(selectedIndex - 1)
    const next = () => setSelectedIndex(selectedIndex + 1)

    React.useEffect(() => {
        const area = ref?.current
        const touchsweep = new TouchSweep(area || undefined)

        area?.addEventListener("swipeleft", next)
        area?.addEventListener("swiperight", prev)

        return () => {
            touchsweep.unbind()

            area?.removeEventListener("swipeleft", next)
            area?.removeEventListener("swiperight", prev)
        }
    })

    return (
        <>
            <div className="relative w-52 h-52 m-auto [perspective:62.5rem]" ref={ref}>
                <div className="absolute w-full h-full" style={getItemStyle()}>
                    {props.items.map((item, index) => (
                        <div
                            className={getClassName("__slide")}
                            key={index}
                            style={getSlideStyle(index)}
                        >
                            
                            <img src={item.primaryImageSmall ? item.primaryImageSmall : noImage}  />

                            <div className={getClassName("__slide-overlay")}>
                                {(
                                    <div>
                                        <strong>{item.title.length > 10 ? item.title.slice(0, 10).concat("...") : item.title}</strong>
                                        <span>{item.artistDisplayName}</span>
                                        <span>{item.objectDate}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {props.showControls && (
                <div className={getClassName("__controls")}>
                    <button
                        className={getClassName(["__control", "__control--prev"])}
                        onClick={prev}
                    >
                        {props.prevButtonContent}
                    </button>

                    <button
                        className={getClassName(["__control", "__control--next"])}
                        onClick={next}
                    >
                        {props.nextButtonContent}
                    </button>
                </div>
            )}
        </>
    )
}

Carousel.defaultProps = {
    itemWidth: 210,
    showControls: true,
    classNamePrefix: "carousel",
    prevButtonContent: "Previous",
    nextButtonContent: "Next"
}

export default Carousel
