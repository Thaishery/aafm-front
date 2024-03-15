import { Fragment, useState } from "react"
import "./style.scss"
const Moderation = ()=>{
  //? ici nous allons placer toute la logique de médération . 
  const [currentTab, setCurrentTab] = useState('Pages')
  const handleMenuClick = (menu)=>{
    setCurrentTab(menu)
  }
  return (
    <div className="moderation__view__container">
      <div className="right__menu">
        <nav>
          <ul>
            <li>
              <button onClick={()=>{handleMenuClick('Pages')}}>Pages</button>
            </li>
            <li>
              <button onClick={()=>{handleMenuClick('Articles')}}>Articles</button>
            </li>
            <li>
              <button onClick={()=>{handleMenuClick('Catégories')}}>Catégories</button>
            </li>
            <li>
              <button onClick={()=>{handleMenuClick('Activitées')}}>Activitées</button>
            </li>
            <li>
              <button onClick={()=>{handleMenuClick('Membres')}}>Membres</button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="right_container">
        {[currentTab].map((currentTab,key)=>{
          switch(currentTab){
            case 'Pages': 
              return <Fragment key={key}>
                  Pages
              </Fragment>
            case 'Articles': 
            return <Fragment key={key}>
                Articles
            </Fragment>
            case 'Catégories': 
            return <Fragment key={key}>
                Catégories
            </Fragment>
            case 'Activitées': 
            return <Fragment key={key}>
                Activitées
            </Fragment>
            case 'Membres': 
            return <Fragment key={key}>
                Membres
            </Fragment>
            default : 
              return <></>
          }
        })}
      </div>
    </div>
  )
}
export default Moderation