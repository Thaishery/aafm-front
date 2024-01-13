import './slide.scss'
const Slide = ({src,alt,havecaptions, title, desc, active}) =>{
  return(
  <figure className={active?"active slide":"hide slide"}>
    <img src={src} alt={alt?alt:""} />
    {havecaptions &&
      <figcaption>
        {title &&
          <h2>{title}</h2>
        }
        {desc &&
          <p>{desc}</p>
        }
      </figcaption>
    }
  </figure>
  )
}
export default Slide;