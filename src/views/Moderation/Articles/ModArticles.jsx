import { Fragment, useEffect, useState } from "react"
import axios from "axios"
import urls from "../../../constants/urls";
import "./style.scss"
const ModArticles = ({token})=>{
  const [pages, setPages]= useState()
  const [pageToEdit, setPageToEdit] = useState(-1)
  const [categories, setCategories] = useState()
  const [categoriesId, setCategoriesId] = useState(-1)
  const [pageToEditContent, setPageToEditContent] = useState({
    name:"",
    content:"",
    description:"",
    id_categorie:0,
    is_publish:false
  })
  const [isCreate, setIsCreate] = useState(false);
  const [newPageContent, setNewPageContent] = useState({
    name:"",
    content:"",
    description:"",
    id_categorie:0,
    is_publish: false
  })

  const handlePageChange = (pageid)=>{
    setPageToEdit(parseInt(pageid))
    setPageToEditContent(pages.filter((page)=>{return page.id===parseInt(pageid)})[0])
  }

  const handlePageEdit = (e,id)=>{
    e.preventDefault()
    // console.log(pageToEditContent);
    axios({
      url:`${urls.apiUrl}/api/auth/articles/${id}`,
      method:'PUT',
      headers: { 'Authorization': `Bearer ${token}` },
      data:{
        "title": pageToEditContent.name,
        "contenu": (typeof(pageToEditContent.content)==="object"?pageToEditContent.content:JSON.parse(pageToEditContent.content)),
        "description" : (typeof(pageToEditContent.description)==="object"?pageToEditContent.description:JSON.parse(pageToEditContent.description)),
        "id_categorie": pageToEditContent.id_categorie?pageToEditContent.id_categorie:pageToEditContent.categorie.id,
        "is_publish": pageToEditContent.is_publish === "true"? true:false
      }
    }).then((res)=>{
      console.log(res)
      getAllPages()
    }).catch((err)=>{
      console.log(err)
    })
  }

  const handleNewPageCreate = (e)=>{
    e.preventDefault()
    // console.log(newPageContent);
    axios({
      url:`${urls.apiUrl}/api/auth/articles`,
      method:'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      data:{
        "title": newPageContent.name,
        "contenu":(typeof(newPageContent.content)==="object"?newPageContent.content:JSON.parse(newPageContent.content)),
        "id_categorie": newPageContent.id_categorie,
        "is_publish": newPageContent.is_publish === "true"? true:false
      }
    }).then((res)=>{
      console.log(res)
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
      url:`${urls.apiUrl}/api/auth/categories/${id}`,
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
  
  const handleIsPublishChange = (e)=>{
    setPageToEditContent({...pageToEditContent, is_publish:e.target.value})
  }
  
  const handleCatChange = (e)=>{
    setPageToEditContent({...pageToEditContent, id_categorie:e.target.value})
  }
  
  const handleNameChangeCreate = (e)=>{
    setNewPageContent({...newPageContent, name:e.target.value})
  }

  const handleDescriptionChangeCreate = (e)=>{
    setPageToEditContent({...pageToEditContent, description:e.target.value})
  }
  
  const handleContentChangeCreate = (e)=>{
    setNewPageContent({...newPageContent, content:e.target.value})
  
  }
  const handleIsPublishChangeCreate = (e)=>{
    setNewPageContent({...newPageContent, is_publish:e.target.value})
  }
  
  const handleCatChangeCreate = (e)=>{
    setNewPageContent({...newPageContent, id_categorie:e.target.value})
  }

  const getAllPages = ()=>{
    axios({
      url:`${urls.apiUrl}/api/auth/articles`,
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    }).then((res)=>{
      if(res?.status !== 200) return;
      if(res?.data?.message === "pas d'articles trouver") return(setIsCreate(true));
      setPages(res?.data?.message)
      setPageToEdit(res?.data.message[0].id)
      setPageToEditContent(res?.data.message[0])
    })
  }
  const getAllCategories = ()=>{
    axios({
      url:`${urls.apiUrl}/api/public/categories`,
      method: 'GET',
    }).then((res)=>{
      // console.log(res)
      if(res?.status !== 200) return;
      // if(res?.data?.message === "Catégorie non trouvé") return(setIsCreate(true));
      setCategories(res?.data.categories)
      setCategoriesId(res?.data.categories[0].id)
    })
  }

  useEffect(()=>{
    getAllPages()
    getAllCategories()
  },[token])

  return(
    <>
      {pageToEdit !== -1 &&
      <>
        <label htmlFor="page-select">Choisissez un article : </label>
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
          <button type="button" onClick={()=>{handlePageDelete(pageToEdit)}}>Supprimer l'article</button>
          <button type="submit">Mettre a jour l'article</button>
          <button type="button" onClick={()=>{handlePageCreate()}}>Créer un nouvelle article</button>

            <div className="formFields">
              {pageToEditContent&&
              <>
                <label htmlFor="name">Nom : </label>
                <input type="text" id="name" onChange={(e)=>{handleNameChange(e)}}  value={pageToEditContent.name} />
                <br />
                <label htmlFor="cat">Catégorie de l'article </label>
                <select name="cat" id="cat" onChange={(e)=>{handleCatChange(e)}}>
                  <option value={pageToEditContent.categorie.id}>{pageToEditContent.categorie.name}</option>
                  {categories?.map((cat,key)=>{
                    if(cat.id === pageToEditContent.categorie.id) return (<Fragment key={key}></Fragment>)
                    return (                  
                      <option key={key} value={cat.id}>{cat.name}</option>
                    )
                  })}
                </select>
                <br />
                <label htmlFor="content">Contenu : </label>
                <textarea className="contentEditorArticle" type="textarea" id="content" onChange={(e)=>{handleContentChange(e)}}  value={typeof(pageToEditContent.content)==="object"?JSON.stringify(pageToEditContent.content,null,2):pageToEditContent.content} ></textarea>
                <br />
                <label htmlFor="content">Description : </label>
                <textarea className="contentEditorArticle" type="textarea" id="content" onChange={(e)=>{handleDescriptionChange(e)}}  value={typeof(pageToEditContent.description)==="object"?JSON.stringify(pageToEditContent.description,null,2):pageToEditContent.description} ></textarea>
                <br />
                <label htmlFor="is_publish">Publier : </label>
                <select name="is_publish" id="is_publish" onChange={(e)=>{handleIsPublishChange(e)}}>
                  {(pageToEditContent.is_publish === true || pageToEditContent.is_publish === "true") && 
                    <>
                      <option value="true">Oui</option>
                      <option value="false">Non</option>
                    </>
                  }
                  {(pageToEditContent.is_publish === false || pageToEditContent.is_publish === "false") && 
                    <>
                      <option value="false">Non</option>
                      <option value="true">Oui</option>
                    </>
                  }
                </select>
              </>
              }
            </div>
        </form>
      </>
      }
      {isCreate && 
        <>
          <form onSubmit={(e)=>{handleNewPageCreate(e)}}>
            <button type="button" onClick={()=>{handleBackToEdit()}}>Modifier un article existant</button>
            <button >Créer l'article</button>
            <br />
            <label htmlFor="name">Titre de l'article : </label>
            <input type="text" id="name" onChange={(e)=>{handleNameChangeCreate(e)}}  value={newPageContent.name} />
            <br />
            <label htmlFor="cat">Catégorie de l'article </label>
            <select name="cat" id="cat" onChange={(e)=>{handleCatChangeCreate(e)}}>
              <option value="-1">---</option>
              {categories?.map((cat,key)=>{
                return (                  
                  <option key={key} value={cat.id}>{cat.name}</option>
                )
              })}
            </select>
            <br />
            <label htmlFor="content">Contenu : </label>
            <textarea className="contentEditorArticle" type="textarea" id="content" onChange={(e)=>{handleContentChangeCreate(e)}}  value={typeof(newPageContent.content)==="object"?JSON.stringify(newPageContent.content,null,2):newPageContent.content} ></textarea>
            <br />
            <label htmlFor="content">Description : </label>
            <textarea className="contentEditorArticle" type="textarea" id="content" onChange={(e)=>{handleDescriptionChangeCreate(e)}}  value={typeof(newPageContent.description)==="object"?JSON.stringify(newPageContent.description,null,2):newPageContent.description} ></textarea>
            <br />
            <label htmlFor="is_publish">Publier ? </label>
            <select name="is_publish" id="is_publish" onChange={(e)=>{handleIsPublishChangeCreate(e)}}>
              <option value="false">Non</option>
              <option value="true">Oui</option>
            </select>
          </form>
        </>
      }
    </>
  )
}
export default ModArticles