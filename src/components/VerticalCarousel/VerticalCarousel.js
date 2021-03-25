import { useState } from 'react'

export const VerticalCarousel = ({ data }) => {
    //const getWidth = () => window.innerWidth
    const [animationSlider, setAnimationSlider] = useState({
        translate: 0,
        transition: 0.45,
        activeIndex: 0
    })
    
    const { translate, transition, activeIndex } = animationSlider

    const length = data.length

    // setAnimationSlider({ activeIndex: activeIndex === 0 ? length - 1 : activeIndex - 1 })
    const upSlider = () => {
        if (activeIndex === 0) {
            return setAnimationSlider({
                ...animationSlider,
                translate: (length - 1) * 768,
                activeIndex: length - 1
            })
        }
        setAnimationSlider({
            ...animationSlider,
            activeIndex: activeIndex - 1,
            translate: (activeIndex - 1) * 768
        })
    }

    const downSlider = () => {
        if (activeIndex === length - 1) {
            return setAnimationSlider({
                ...animationSlider,
                translate: 0,
                activeIndex: 0
            })
        }

        setAnimationSlider({
            ...animationSlider,
            activeIndex: activeIndex + 1,
            translate: (activeIndex + 1) * 768
        })
    }

    const prevSlider = () => {
        if (activeIndex === 0) {
            return setAnimationSlider({
                ...animationSlider,
                translate: (length - 1) * 1024,
                activeIndex: length - 1
            })
        }
        setAnimationSlider({
            ...animationSlider,
            translate: (activeIndex - 1) * 1024,
            activeIndex: activeIndex - 1
        })
    }

    // setAnimationSlider({ activeIndex: activeIndex === length - 1 ? 0 : activeIndex + 1 })
    const nextSlider = () => {
        if (activeIndex === length - 1) {
            return setAnimationSlider({
                ...animationSlider,
                translate: 0,
                activeIndex: 0
            })
        }

        setAnimationSlider({
            ...animationSlider,
            activeIndex: activeIndex + 1,
            translate: (activeIndex + 1) * 1024
        })
    }



    if (!Array.isArray(data) || data.length <= 0) {
        return <h1>NO SLIDES</h1>
    }
    const SliderCSS = {
        // width: 100%;
        // height: 100%;
        //position: 'relative', //или оцентровать блок?
        //margin: '0 auto',
        display: 'block',
        position: 'fixed',
        height: '768px',
        width: '1024px',
        overflow: 'hidden'
    }

    const SliderSection = {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        width: `${1024 * length}px`,
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        transform: `translateX(-${translate}px)`,
        transition: `transform ease-out ${transition}s`,
    }

    const SliderPage = {
        display: 'flex',
        flexDirection: 'column',
        height: `${768 * length}px`,
        width: `1024px`,
        transform: `translateY(-${translate}px)`,
        transition: `transform ease-out ${transition}s`,
    }

    // const SliderContent2 = {
    //     transform: `translateY(-${translate}px)`,
    //     transition: `transform ease-out ${transition}s`,
    //     height: `${768 * length}px`,
    //     width: `1024px`,
    //     display: 'flex'
    // }

    // const buttonCss = {
    //     position:'relative',
    //     zIndex:'3'
    // }

    {/* <div className={index === activeIndex ? 'slide active' : 'slide'} key={index}>
                            {index === activeIndex && (
                                <img
                                    src={slide.image}
                                    alt={index}
                                />
                            )}
                        </div>  */}

    return (
        //className="slider"
        <div style={SliderCSS}>

            <button onClick={prevSlider}>Left</button>
            <button onClick={nextSlider}>right</button>
            <button onClick={upSlider}>Up</button>
            <button onClick={downSlider}>Down</button>

            <div style={SliderSection}>
                {data.map((slide, index) => {
                    console.log('slide', slide)
                    return (
                        <>
                            <img
                                // style={{
                                // width:'100%'
                                // }}
                                src={slide.image}
                                alt={index}
                            />
                        </>
                    )
                })}
            </div>
        </div>

    )
}