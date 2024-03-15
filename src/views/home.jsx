import { useEffect, useState } from "react";
// import Articles from "../componant/Articles/Articles"
// import SimpleText from "../componant/SimpleText/SimpleText"
// import Slider from "../componant/Sliders/slider"
// import DualColList from "../componant/dualColList/dualColList"
import urls from "../constants/urls";
import axios from 'axios';
import Helmet from 'react-helmet';
import ModuleRender from "../componant/ModuleRender/ModuleRender";

const Home = ({userIsLoggedIn,token})=>{
  
  const [modules,setModules] = useState(localStorage.getItem('homeContent')?JSON.parse(localStorage.getItem('homeContent')):[])
  useEffect(()=>{
    axios({
      url:`${urls.apiUrl}/api/public/pages/get_home_content`,
      method: 'GET',
    }).then((res)=>{
      console.log(res)
      if(res?.data?.content?.content?.modules){
        localStorage.setItem('homeContent',JSON.stringify(res?.data?.content?.content?.modules))
        setModules(res?.data?.content?.content?.modules)
        // loader.onSetIsLoading(false)
      }
    })
  },[])

  return(
    <>
      <Helmet>
        <title>Accueil - Association de l'amitié Franco-Marocaine de Grigny.</title>
        <meta
          name="description"
          content="Ceci est la page d'accueil de l'association de l'amitiée Franco-Marocaine." 
        />
      </Helmet>

      <ModuleRender modules={modules} />
    </>
  )
}
export default Home