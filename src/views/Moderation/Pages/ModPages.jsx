import { useEffect, useState } from "react"
import axios from "axios"
import urls from "../../../constants/urls";
import "./style.scss"
const ModPages = ({token})=>{
  const [pages, setPages]= useState()
  const [pageToEdit, setPageToEdit] = useState(-1)
  const [pageToEditContent, setPageToEditContent] = useState()
  const [isCreate, setIsCreate] = useState(false);
  const [newPageContent, setNewPageContent] = useState({
    name:"",
    description:"",
    content:""
  })

  const handlePageChange = (pageid)=>{
    setPageToEdit(parseInt(pageid))
    setPageToEditContent(pages.filter((page)=>{return page.id===parseInt(pageid)})[0])
  }

  const handlePageEdit = (e,id)=>{
    e.preventDefault()
    if(window.confirm('Confirmer la modification de la page?')!==true) return;
    axios({
      url:`${urls.apiUrl}/api/auth/pages/${id}`,
      method:'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      data:{
        "name": pageToEditContent.name,
        "description": pageToEditContent.description,
        "content":JSON.parse(pageToEditContent.content)
      }
    }).then((res)=>{
      getAllPages()
    }).catch((err)=>{
      console.log(err)
    })
  }

  const handleNewPageCreate = (e)=>{
    e.preventDefault()
    axios({
      url:`${urls.apiUrl}/api/auth/pages/create_new_page`,
      method:'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      data:{
        "name": newPageContent.name,
        "description": newPageContent.description,
        "content":JSON.parse(newPageContent.content)
      }
    }).then((res)=>{
      getAllPages()
    }).catch((err)=>{
      console.log(err)
    })
  }

  const handleBackToEdit = ()=>{
    setIsCreate(false)
    getAllPages()
  }

  const handlePageCreate = ()=>{
    setIsCreate(true)
    setPageToEdit(-1)
    setPageToEditContent({
      name:"",
      description:"",
      content:""
    })
  }

  const handlePageDelete = (id)=>{
    if(window.confirm('Confirmer la supréssion de la page?')!==true) return;
    axios({ 
      url:`${urls.apiUrl}/api/auth/pages/${id}`,
      method:'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    }).then((res)=>{
      getAllPages()
    }).catch((err)=>{
      console.log(err)
    })
  }

  const handleNameChange = (e)=>{
    setPageToEditContent({...pageToEditContent, name:e.target.value})
  }

  const handleDescriptionChange = (e)=>{
    setPageToEditContent({...pageToEditContent, description:e.target.value})
  }

  const handleContentChange = (e)=>{
    setPageToEditContent({...pageToEditContent, content:e.target.value})
  }

  const handleNameChangeCreate = (e)=>{
    setNewPageContent({...newPageContent, name:e.target.value})
  }

  const handleDescriptionChangeCreate = (e)=>{
    setNewPageContent({...newPageContent, description:e.target.value})
  }
  
  const handleContentChangeCreate = (e)=>{
    setNewPageContent({...newPageContent, content:e.target.value})
  }

  const getAllPages = ()=>{
    axios({
      url:`${urls.apiUrl}/api/auth/pages/get_all`,
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    }).then((res)=>{
      // console.log(res)
      if(res?.status !== 200) return;
      if(res?.data?.pages?.length < 1) return(setIsCreate(true));     
      setPages(res?.data?.pages)
      setPageToEdit(res?.data?.pages[0].id)
      setPageToEditContent(res?.data?.pages[0])
    })
  }

  useEffect(()=>{
    getAllPages()
  },[token])

  return(
    <>
      {pageToEdit !== -1 &&
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
        <form onSubmit={(e)=>{handlePageEdit(e, pageToEdit)}}>
          <button type="button" onClick={()=>{handlePageDelete(pageToEdit)}}>Supprimer la page</button>
          <button type="submit">Mettre a jour la page</button>
          <button type="button" onClick={()=>{handlePageCreate()}}>Créer une nouvelle page</button>

            <div className="formFields">
              {pageToEditContent&&
              <>
                <label htmlFor="name">Nom : </label>
                <input type="text" id="name" onChange={(e)=>{handleNameChange(e)}}  value={pageToEditContent.name} />
                <br />
                <label htmlFor="description">Description : </label>
                <input type="text" id="description" onChange={(e)=>{handleDescriptionChange(e)}}  value={pageToEditContent.description} />
                <br />
                <label htmlFor="content">Contenu : </label>
                <textarea className="contentEditor" type="textarea" id="content" onChange={(e)=>{handleContentChange(e)}}  value={typeof(pageToEditContent.content)==="object"?JSON.stringify(pageToEditContent.content,null,2):pageToEditContent.content} ></textarea>
              </>
              }
            </div>
        </form>
      </>
      }
      {isCreate && 
        <>
          <form onSubmit={(e)=>{handleNewPageCreate(e)}}>
            <button type="button" onClick={()=>{handleBackToEdit()}}>Modifier une page existante</button>
            <button >Créer la page</button>
            <br />
            <label htmlFor="name">Nom : </label>
            <input type="text" id="name" onChange={(e)=>{handleNameChangeCreate(e)}}  value={newPageContent.name} />
            <br />
            <label htmlFor="description">Description : </label>
            <input type="text" id="description" onChange={(e)=>{handleDescriptionChangeCreate(e)}}  value={newPageContent.description} />
            <br />
            <label htmlFor="content">Contenu : </label>
            <textarea className="contentEditor" type="textarea" id="content" onChange={(e)=>{handleContentChangeCreate(e)}}  value={typeof(newPageContent.content)==="object"?JSON.stringify(newPageContent.content,null,2):newPageContent.content} ></textarea>
          </form>
        </>
      }
    </>
  )
}
export default ModPages