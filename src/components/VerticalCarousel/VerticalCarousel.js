import { useState, useEffect } from 'react'
import './VerticalCarousel.style.scss'
export const VerticalCarousel = ({ data }) => {
    const length = data.length

    const IMG_HEIGHT = 768
    const IMG_WIDTH = 1024

    const [animationSlider, setAnimationSlider] = useState({
        translateX: 0,
        translateY: 0,
        transition: 0.45,
        activeIndexY: 0,
        activeIndexX: 0,
        movementX: 0,
        movementY: 0,
        firstTouchX:0,
        firstTouchY:0,
        lastTouchX:0,
        lastTouchY:0
    })

    const { translateX, transition, activeIndexY, activeIndexX, translateY } = animationSlider

    const [value, onChange] = useState(1);
    // const [minVal, setMinVal] = useState(min);
    // const [maxVal, setMaxVal] = useState(max);
  
    useEffect(() => {
        // console.log(value)
}, [value]);

    // useEffect(() => {
    //     console.log('events listeners here')
    //     return () => {
    //         console.log('removing events')
    //     }
    // }, [])

    
    const upSlider = () => {
        if (activeIndexY === 0) {
            return setAnimationSlider({
                ...animationSlider,
                activeIndexY: length - 1,
                translateY: (length - 1) * IMG_HEIGHT
            })
        }
        setAnimationSlider({
            ...animationSlider,
            activeIndexY: activeIndexY - 1,
            translateY: (activeIndexY - 1) * IMG_HEIGHT
        })
    }

    const downSlider = () => {
        if (activeIndexY === length - 1) {
            return setAnimationSlider({
                ...animationSlider,
                activeIndexY: 0,
                translateY: 0
            })
        }

        setAnimationSlider({
            ...animationSlider,
            activeIndexY: activeIndexY + 1,
            translateY: (activeIndexY + 1) * IMG_HEIGHT
        })
    }

    const prevSlider = () => {
        if (activeIndexX === 0) {
            return setAnimationSlider({
                ...animationSlider,
                translateX: (length - 1) * IMG_WIDTH,
                activeIndexX: length - 1,

            })
        }
        setAnimationSlider({
            ...animationSlider,
            translateX: (activeIndexX - 1) * IMG_WIDTH,
            activeIndexX: activeIndexX - 1
        })
    }

    const nextSlider = () => {
        if (activeIndexX === length - 1) {
            return setAnimationSlider({
                ...animationSlider,
                translateX: 0,
                activeIndexX: 0
            })
        }

        setAnimationSlider({
            ...animationSlider,
            activeIndexX: activeIndexX + 1,
            translateX: (activeIndexX + 1) * IMG_WIDTH
        })
    }

    
    const SliderCSS = {
        display: 'block',
        position: 'fixed',
        height: '768px',
        width: '1024px',
        overflow: 'hidden'
    }


    function handleTouchStart(e){
        setAnimationSlider({
            ...animationSlider,
            movementX: 0,
            movementY:0,
            firstTouchX: 512,
            firstTouchY: 384,
        })
    }


    function handleTouchMove(e){
        // animationSlider.movement = e.changedTouches[0].clientX;
        // animationSlider.firstTouchX = 0
        setAnimationSlider({
            ...animationSlider,
            movementX: e.changedTouches[0].clientX - animationSlider.firstTouchX,
            movementY:e.changedTouches[0].clientY - animationSlider.firstTouchY,
        })
        // console.log('movementX', animationSlider.movementX)
        // console.log('movementY', animationSlider.movementY)
    }
    

    function handleTouchEnd(e) {
        if (animationSlider.movementX > 350 && animationSlider.movementX < 600) {
           nextSlider()
        } else if (animationSlider.movementX > -450 && animationSlider.movementX < -350) {
            prevSlider()
        } else {
        }
       
        if (animationSlider.movementY > -300 && animationSlider.movementY < -200) {
            upSlider()
         } else if (animationSlider.movementY < 300 && animationSlider.movementY > 200) {
             downSlider()
         } else {
         }  
      };
    
    const handleInput = ({ target: { value: radius } }) => {
        onChange(radius);
        console.log('value',value)
        
        console.log('radius',radius)
        if (radius - value > 0) {
            nextSlider()
        } else {
            prevSlider()
        }
    }
        
    
    
    
    
    function handleTouchWheel(e) {
        (e>0) ? upSlider() : downSlider()
    }

    const rangeSlider = (
        <div style={{ position: 'absolute' }}>
        <div style={{
            zIndex: '999',
            position: 'absolute',
            top:'663px',
            left:'190px'
        }}>
            <input
            
            className="slider"
                type="range"
                min="1"
                max="3"
                value={value}
                onChange={(e)=>handleInput(e)}
            />
            <div style={{
                position: 'absolute',
                top:'50%',
                transition: '4s'
            }}>{value}</div>
        </div>
    </div>
    )

    if (!Array.isArray(data) || data.length <= 0) {
        return <h1>NO SLIDES</h1>
    }


    return (
        <>
        {console.log(animationSlider.activeIndexY)}
        {animationSlider.activeIndexY === 2 ? rangeSlider : null}
        <div style={SliderCSS}
            onWheel={(e)=>handleTouchWheel(e.deltaY)}
            onTouchStart={(e)=>handleTouchStart(e)}
            onTouchMove={(e)=>handleTouchMove(e)}
            onTouchEnd={(e)=>handleTouchEnd(e)}
            
           
        >
            {/* <div style={{ position: 'absolute', zIndex: '3' }}>
                <button onClick={upSlider}>Up</button>
                <button onClick={downSlider}>Down</button>
            </div>
            <div style={{ position: 'absolute', zIndex: '3', right: '20px' }}>
                <button onClick={prevSlider}>Prev</button>
                <button onClick={nextSlider}>Next</button>
            </div> */}
            
            {data.map((slide, i) => {
                
                return (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        transform: `translateY(-${translateY}px)`,
                        transition: `transform ease-out ${transition}s`,
                        backgroundImage: `url(${slide.image})`,
                        width: '100%',
                        height: '768px',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}>
                        {slide.image.map(el => {
                            return (

                                <div style={{
                                    display: 'flex',
                                    flex: '1 0 100%',
                                    flexDirection: 'column',
                                    transform: `translateX(-${translateX}px)`,
                                    transition: `transform ease-out ${transition}s`,
                                    backgroundImage: `url(${el})`,
                                    width: '100%',
                                    height: '768px',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}>
                                  
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
        </>
    )
}