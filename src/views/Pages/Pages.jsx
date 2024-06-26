import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import urls from "../../constants/urls";
import FourOFour from "../404";
import { Helmet } from "react-helmet";
import SimpleText from "../../componant/SimpleText/SimpleText";
import Slider from "../../componant/Sliders/slider";
import ModuleRender from "../../componant/ModuleRender/ModuleRender";

const Pages = ()=>{
  let { pagenom } = useParams();
  const [pageContent,setPageContent] = useState()
  const [pagefound,setPageFound] = useState(true);
  useEffect(()=>{
      axios({
        url:`${urls.apiUrl}/api/public/pages/${pagenom}`,
        method: 'GET',
      }).then((res)=>{
        if(res?.status === 204) setPageFound(false)
        if(res?.status === 200) setPageContent(res?.data?.content)
      })
  },[])
  
  return(
    <>
      {!pagefound &&
        <FourOFour/>
      }

      <Helmet>
        <title>{pageContent?.name?`${pageContent.name} - `:""}Association de l'amitié Franco-Marocaine de Grigny.</title>
        {(pageContent?.description )?<meta name="description" content={pageContent?.description} />:null}
      </Helmet>

      {
        pageContent?.content?.modules &&
          <ModuleRender modules={pageContent?.content?.modules} />
      }         
    </>
  )
}
export default Pages
