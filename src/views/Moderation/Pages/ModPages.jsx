import { Fragment, useEffect, useState } from "react"
import axios from "axios"
import urls from "../../../constants/urls";
// import "./style.scss"
const ModPages = ({token})=>{
  const [pages, setPages]= useState()
  const [pageToEdit, setPageToEdit] = useState(-1)
  const handlePageChange = (pageid)=>{
    setPageToEdit(parseInt(pageid))
  }
  const handlePageEdit = (e)=>{
    e.preventDefault()
    console.log('trigger')
  }
  const handlePageDelete = ()=>{
    console.log("deleted ")
  }
  useEffect(()=>{
    axios({
      url:`${urls.apiUrl}/api/auth/pages/get_all`,
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    }).then((res)=>{
      console.log(res)
      if(res?.status !== 200) return;
      setPages(res?.data?.pages)
      setPageToEdit(res?.data.pages[0].id)
    })
    // if(pageToEdit === -1)return;
    // axios({
    //   url:`${urls.apiUrl}/api/auth/pages/get_all`,
    //   method: 'GET',
    //   headers: { 'Authorization': `Bearer ${token}` }
    // }).then((res)=>{
    //   console.log(res)
    // })
  },[token])
  return(
    <>
      <label htmlFor="page-select">Choisissez une page : </label>
      <select onChange={(e)=>{handlePageChange(e.target.value)}} name="page" id="page-select">
        {!pages &&
          <option value={"-1"}>--</option>
        }
        {pages &&
          pages.map((page,key)=>{
            return <option value={page.id} key={key}>{page.name}</option>
          })
        }
      </select>
      {pageToEdit !== -1 &&
      <>
        <form onSubmit={(e)=>{handlePageEdit(e)}}>
          <button type="button" onClick={()=>{handlePageDelete()}}>Supprimer la page</button>
          <button type="submit">Mettre a jour la page</button>
            <div className="formFields">
              {console.log(pageToEdit)}
            </div>
        </form>
      </>
      }
    </>
  )
}
export default ModPages