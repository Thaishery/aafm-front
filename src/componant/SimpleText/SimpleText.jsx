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
            {article.parags &&
              <article>
                {article.parags.map((parag,key)=>{
                  return(<Fragment key={key}>
                    <p>{parag}</p>
                  </Fragment>)
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