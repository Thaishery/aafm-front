import "./articles.scss"
const Articles = ({articles}) =>{
  return (
    <>
    {articles &&
    articles.map((article, key)=>{
      return( 
        <article key={key} className="articles">
          {article.figure &&
            <figure className="-figure">
              <img className="-img" src={article.figure.src} alt={article.figure.alt} />
              {article.figure.caption &&
                <figcaption className="-caption">
                  {article.figure.caption.title &&
                    <h3 className="-title">{article.figure.caption.title}</h3>
                  }
                  {article.figure.caption.desc &&
                    <p className="-content">{article.figure.caption.desc}</p>
                  }
                </figcaption>
              }
            </figure>
          }
          {article.title &&
            <h2 className="-title">{article.title}</h2>
          }
          {article.content &&
            article.content.map((content,key)=>{
              return( 
              <p className="-content" key={key}>
                {content}
              </p>)
            })
          }
          {article.link &&
            <a className="-cta articleBtn" href={article.link.href}>{article.link.cta}</a>
          }
        </article>
      )
    })}
    </>

  )
}
export default Articles;