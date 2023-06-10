import { useState } from "react"
import Nav from './nav-mobile'
const Burger = ({navElements}) =>{
  const [showMenu, setShowMenu] = useState(false)
  const switchNav= ()=>{
    setShowMenu(!showMenu)
  }
  
  return(
    <>
    {showMenu &&
      <div className="nav-burger nav-burger-open" onClick={switchNav}></div>
    }
    {!showMenu &&
      <div className="nav-burger nav-burger-close" onClick={switchNav}></div>
    }
    {showMenu &&
      <>
      <div className="nav-container-mobile">
        <nav>
          <ul className="nav-list-container">
            {
              navElements.map((elem)=><Nav key={elem.link} path={elem.path} link={elem.link}/>)
            }
          </ul>
        </nav>
      </div>
      </>
    }
    </>
  )
}
export default Burger