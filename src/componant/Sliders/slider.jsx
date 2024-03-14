import './style.scss'

import { useState } from "react"
import Controls from "./controls"
import Slide from "./slide"

const Slider = ({slides})=>{
  const [activeSlide,setActiveSlide] = useState(0)
  const handelPrevious = ()=>{
    if(activeSlide -1 < 0) setActiveSlide(slides.length -1);
    else setActiveSlide(activeSlide -1 )
  }
  const handelNext = ()=>{
    if(slides.length-1 >= activeSlide +1) setActiveSlide(activeSlide +1);
    else setActiveSlide (0)
  }
  const setSlideFromDots = (key)=>{
    console.log('setActiveTrigger',key)
    setActiveSlide(key)
  } 
  return(
    <div className="slider">
      <Controls next={()=>handelNext()} prev={()=>handelPrevious()}  slides={slides} curent={activeSlide} setActive={()=>setSlideFromDots}/>
      { slides.map((slide,key)=>{return <Slide key={key} src={slide.src} alt={slide.alt} havecaptions={slide.havecaptions} title={slide.title} desc={slide.desc} active={key===activeSlide?true:false} />})}
    </div>
  )
}
export default Slider