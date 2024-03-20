import { Fragment, useState } from "react"
import "./moderation.scss"
import ModPages from "./Pages/ModPages"
import ModArticles from "./Articles/ModArticles"
import ModCategories from "./Categories/ModCategories"
import ModActivitees from "./Activitees/ModActivitees"
import ModMembres from "./Membres/ModMembres"
const Moderation = ({userIsLoggedIn,token})=>{
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
              <button className={"mod_button" + (currentTab==="Pages"?" --active":"")} onClick={()=>{handleMenuClick('Pages')}}>Pages</button>
            </li>
            <li>
              <button className={"mod_button" + (currentTab==="Articles"?" --active":"")} onClick={()=>{handleMenuClick('Articles')}}>Articles</button>
            </li>
            <li>
              <button className={"mod_button" + (currentTab==="Catégories"?" --active":"")} onClick={()=>{handleMenuClick('Catégories')}}>Catégories</button>
            </li>
            <li>
              <button className={"mod_button" + (currentTab==="Activitées"?" --active":"")} onClick={()=>{handleMenuClick('Activitées')}}>Activitées</button>
            </li>
            <li>
              <button className={"mod_button" + (currentTab==="Membres"?" --active":"")} onClick={()=>{handleMenuClick('Membres')}}>Membres</button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="right_container">
        {[currentTab].map((currentTab,key)=>{
          switch(currentTab){
            case 'Pages': 
              return <ModPages key={key} token={token} />
            case 'Articles': 
              return <ModArticles key={key} token={token}/>
            case 'Catégories': 
              return <ModCategories key={key} token={token}/>
            case 'Activitées': 
              return <ModActivitees key={key} />
            case 'Membres': 
              return <ModMembres key={key} />
            default : 
              return <></>
          }
        })}
      </div>
    </div>
  )
}
export default Moderation