import axios from "axios";
import urls from "../../constants/urls";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FourOFour from "../404";
import ModuleRender from "../../componant/ModuleRender/ModuleRender";

const Article = ()=>{
  const { nom } = useParams();
  const { article } = useParams();
  const [oneArticle, setOneArticle] = useState()
  const [pagefound,setPageFound] = useState(true);
  useEffect(()=>{
    axios({
      url:`${urls.apiUrl}/api/public/articles/${nom}/${article}`,
      method: 'GET',
    }).then((res)=>{
      // console.log(res)
      if(res?.status === 204) setPageFound(false)
      if(res?.status === 200) setOneArticle(res?.data?.message)
    })
  },[article,nom])
  return (
    <>
          
      {!pagefound &&
        <FourOFour/>
      }

      {(oneArticle && (oneArticle?.is_publish === "false" ||oneArticle?.is_publish === false )) &&
        <FourOFour/>
      }

      {(oneArticle && (oneArticle?.is_publish === "true" ||oneArticle?.is_publish === true )) &&
        <article>
          <h2>{oneArticle?.name}</h2>
          <span>Catégorie : <Link to={`/categorie/${oneArticle.categorie.name}/`}>{oneArticle.categorie.name}</Link></span>
          <ModuleRender modules={oneArticle.content.modules} />
        </article>
      }
    </>
  )
}
export default Article