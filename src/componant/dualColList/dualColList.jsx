import "./dualColList.scss"
const DualColList = ({title,listItem}) =>{
  return (
    <>
      {listItem &&
        <div className="dualColList">
          {title &&
            <h2>{title}</h2>
          }
          <ul className="listWraper">
            {listItem.map((item,key)=>{
              return(
                <li key={key}>
                  {item.link &&
                    <a href={item.link}>{item.content}</a>
                  }
                  {!item.link &&
                    <span>{item.content}</span>
                  }
                </li>
              )
            })}
          </ul>
        </div>
      }
    </>
  )
}
export default DualColList