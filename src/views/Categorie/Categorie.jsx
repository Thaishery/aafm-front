import { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import urls from "../../constants/urls";
import FourOFour from "../404";
import axios from "axios";
import "./style.scss"
// import { useParams } from "react-router-dom";
import { useParams } from "react-router-dom";
// import Articles from "../../componant/Articles/Articles";
import ModuleRender from "../../componant/ModuleRender/ModuleRender";
import Articles from "../../componant/Articles/Articles";

const Categories = ()=>{
  const { nom } = useParams();
  const [categorie,setCategorie] = useState({})
  const [pagefound,setPageFound] = useState(true);

  useEffect(()=>{
      axios({
        url:`${urls.apiUrl}/api/public/categories/name/${nom}`,
        method: 'GET',
      }).then((res)=>{
        if(res?.status === 204) setPageFound(false)
        if(res?.status === 200) setCategorie(res?.data?.categories)
      })
  },[nom])
  return(
    <>
      
      {!pagefound &&
        <FourOFour/>
      }

      <Helmet>
        <title>Categorie{categorie?.name?` - ${categorie.name}`:""} - Association de l'amitié Franco-Marocaine de Grigny.</title>
        <meta name="description" content={`Retrouvez ici l'actualité de notre catégorie ${categorie.name}`} />
      </Helmet>

      {categorie?.content &&
        <>
          <h2>{categorie.content?.title}</h2>
          <ModuleRender modules={categorie?.content?.modules} />
        </>
      }

      {categorie?.articles?.length > 0 &&
        <Articles articles={categorie.articles} />     
      }
      
    </>
  )
}
export default Categories