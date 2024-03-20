import ModuleRender from "../ModuleRender/ModuleRender";
import "./articles.scss"
const Articles = ({articles}) =>{
  const url = (window.location.href.toString().split(window.location.host)[1].charAt(window.location.href.toString().split(window.location.host)[1].length-1)=== "/")?window.location.href.toString():window.location.href.toString()+"/"
  return (
    <>
      {articles &&
        articles.map((article, key)=>{
          if((article?.is_publish === false)||article?.is_publish === "false")return;
          return( 
            <article key={key} className="articles">
              {article?.description?.figure &&
                <figure className="-figure">
                  <img className="-img" src={article?.description?.figure?.src} alt={article?.description?.figure?.alt} />
                  {article?.description?.figure?.caption &&
                    <figcaption className="-caption">
                      {article?.description?.figure?.caption?.title &&
                        <h3 className="-title">{article?.description?.figure?.caption?.title}</h3>
                      }
                      {article?.description?.figure?.caption?.desc &&
                        <p className="-content">{article?.description?.figure?.caption?.desc}</p>
                      }
                    </figcaption>
                  }
                </figure>
              }
              {article.title &&
                <h2 className="-title">{article.title}</h2>
              }
              {article?.description?.content &&
                <ModuleRender modules={article?.description?.content} />
              }
              {article?.description?.link?.cta &&
                <a className="-cta articleBtn" href={url+""+article.title}>{article.description.link.cta}</a>
              }
              {!article?.description?.link?.cta && 
                <a className="-cta articleBtn" href={url+""+article.title}>Voir l'article</a>
              }
            </article>
          )
        })
      }
    </>

  )
}
export default Articles;