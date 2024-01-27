import { Fragment } from 'react';
import "./simpleText.scss"

const SimpleText = ({articles}) =>{
  return (
    <div className='simpleText'>
      {articles && 
        articles.map((article,key) =>{
          return (
          <Fragment key={key}>
            {article.title &&
              <h2>{article.title}</h2>
            }
            {article.content &&
              <article>
                {article.content.map((content,key)=>{
                  switch (content.type) {
                    case 'parag':
                      return(
                        <Fragment key={key}>
                          <p>{content.value}</p>
                        </Fragment>)  
                    case 'link':
                      return (
                        <Fragment key={key}>
                          <a href={content.link}>{content.value}</a>
                        </Fragment>)
                    default:
                      break;
                  }
                })}
              </article>
            }
          </Fragment>)}
        )
      }
    </div>
  )
}
export default SimpleText;