import { Fragment, useState } from "react"
import "./style.scss"
import ModPages from "./Pages/ModPages"
import ModArticles from "./Articles/ModArticles"
import ModCategories from "./Categories/ModCategories"
import ModActivitees from "./Activitees/ModActivitees"
import ModMembres from "./Membres/ModMembres"
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
              return <ModPages />
            case 'Articles': 
              return <ModArticles />
            case 'Catégories': 
              return <ModCategories />
            case 'Activitées': 
              return <ModActivitees />
            case 'Membres': 
              return <ModMembres />
            default : 
              return <></>
          }
        })}
      </div>
    </div>
  )
}
export default Moderation