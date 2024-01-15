import './controls.scss'
import SliderDot from './sliderDot'

const Controls = ({prev, next,slides,curent, setActive})=>{
  return(
    <div className='-controls'>
      <button className='slider-prev' onClick={prev}>&lt;</button>
      <button className="slider-next" onClick={next}>&gt;</button>
      <ul className='dots'>
        {slides&&
          slides.map((dot,key)=><SliderDot setActive={setActive(key)} curent={curent} id={key} />)
        }
      </ul>
    </div>
  )
}
export default Controls