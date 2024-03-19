import { useEffect, useState } from "react"
import axios from "axios"
import urls from "../../../constants/urls";
import "./style.scss"
const ModCategories = ({token})=>{
  const [pages, setPages]= useState()
  const [pageToEdit, setPageToEdit] = useState(-1)
  const [pageToEditContent, setPageToEditContent] = useState({
    name:"",
    description:"",
    content:""
  })
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
    axios({
      url:`${urls.apiUrl}/api/auth/categories/${id}`,
      method:'PUT',
      headers: { 'Authorization': `Bearer ${token}` },
      data:{
        "name": pageToEditContent.name,
        "description": (typeof(pageToEditContent.description)==="object"?pageToEditContent.description:JSON.parse(pageToEditContent.description)),
        "content": (typeof(pageToEditContent.content)==="object"?pageToEditContent.content:JSON.parse(pageToEditContent.content))
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
      url:`${urls.apiUrl}/api/auth/categories`,
      method:'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      data:{
        "name": newPageContent.name,
        "description": (typeof(newPageContent.description)==="object"?newPageContent.description:JSON.parse(newPageContent.description)),
        "content":(typeof(newPageContent.content)==="object"?newPageContent.content:JSON.parse(newPageContent.content))
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
    
    axios({ 
      url:`${urls.apiUrl}/api/public/categories/${id}`,
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
      url:`${urls.apiUrl}/api/public/categories`,
      method: 'GET',
    }).then((res)=>{
      if(res?.status !== 200) return;
      if(res?.data?.message === "Catégorie non trouvé") return(setIsCreate(true));
      setPages(res?.data?.categories)
      setPageToEdit(res?.data.categories[0].id)
      setPageToEditContent(res?.data.categories[0])
    })
  }

  useEffect(()=>{
    getAllPages()
  },[token])

  return(
    <>
      {pageToEdit !== -1 &&
      <>
        <label htmlFor="page-select">Choisissez une catégorie : </label>
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
          <button type="button" onClick={()=>{handlePageDelete(pageToEdit)}}>Supprimer la catégorie</button>
          <button type="submit">Mettre a jour la catégorie</button>
          <button type="button" onClick={()=>{handlePageCreate()}}>Créer une nouvelle catégorie</button>

            <div className="formFields">
              {pageToEditContent&&
              <>
                <label htmlFor="name">Nom : </label>
                <input type="text" id="name" onChange={(e)=>{handleNameChange(e)}}  value={pageToEditContent.name} />
                <br />
                <label htmlFor="description">Description : </label>
                <textarea className="contentEditor" type="textarea" id="content" onChange={(e)=>{handleDescriptionChange(e)}}  value={typeof(pageToEditContent.description)==="object"?JSON.stringify(pageToEditContent.description):pageToEditContent.description} ></textarea>
                <br />
                <label htmlFor="content">Contenu : </label>
                <textarea className="contentEditor" type="textarea" id="content" onChange={(e)=>{handleContentChange(e)}}  value={typeof(pageToEditContent.content)==="object"?JSON.stringify(pageToEditContent.content):pageToEditContent.content} ></textarea>
              </>
              }
            </div>
        </form>
      </>
      }
      {isCreate && 
        <>
          <form onSubmit={(e)=>{handleNewPageCreate(e)}}>
            <button type="button" onClick={()=>{handleBackToEdit()}}>Modifier une catégorie existante</button>
            <button >Créer la catégorie</button>
            <br />
            <label htmlFor="name">Nom : </label>
            <input type="text" id="name" onChange={(e)=>{handleNameChangeCreate(e)}}  value={newPageContent.name} />
            <br />
            <label htmlFor="description">Description : </label>
            <textarea className="contentEditor" type="textarea" id="content" onChange={(e)=>{handleDescriptionChangeCreate(e)}}  value={typeof(newPageContent.description)==="object"?JSON.stringify(newPageContent.description):newPageContent.description} ></textarea>
            <br />
            <label htmlFor="content">Contenu : </label>
            <textarea className="contentEditor" type="textarea" id="content" onChange={(e)=>{handleContentChangeCreate(e)}}  value={typeof(newPageContent.content)==="object"?JSON.stringify(newPageContent.content):newPageContent.content} ></textarea>
          </form>
        </>
      }
    </>
  )
}
export default ModCategories