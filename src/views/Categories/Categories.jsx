import { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import ModuleRender from "../../componant/ModuleRender/ModuleRender";
import urls from "../../constants/urls";
import FourOFour from "../404";
import axios from "axios";
import "./style.scss"

const Categories = ()=>{
  const [categories,setCategories] = useState([])
  const [pagefound,setPageFound] = useState(true);

  useEffect(()=>{
      axios({
        url:`${urls.apiUrl}/api/public/categories`,
        method: 'GET',
      }).then((res)=>{
        if(res?.status === 204) setPageFound(false)
        if(res?.status === 200) setCategories(res?.data?.categories)
      })
  },[])
  return(
    <>
      
      {!pagefound &&
        <FourOFour/>
      }

      <Helmet>
        <title>Categories - Association de l'amitié Franco-Marocaine de Grigny.</title>
        <meta name="description" content="Retrouvez ici nos nos catégories d'actualitées." />
      </Helmet>

      {((typeof(categories)==="array")&&categories.length > 0) && 
        categories.map((categori,key)=>{
          return(
            <Fragment key={key}>
              <h2>{categori?.description?.title}</h2>
              {categori?.description?.modules &&
                <ModuleRender modules={categori?.description?.modules} />
              }
              <Link to={`/categorie/${categori.name}/`} ><button className="button">Voir la catégorie</button></Link>
            </Fragment>
          )
        })
      }
      
    </>
  )
}
export default Categories