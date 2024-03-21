import { useEffect, useState } from "react"
import axios from "axios"
import urls from "../../../constants/urls";

// import "./style.scss"

const ModActivitees = ({token})=>{
  const [pages, setPages]= useState()
  const [pageToEdit, setPageToEdit] = useState(-1)
  const [pageToEditContent, setPageToEditContent] = useState()
  const [isCreate, setIsCreate] = useState(false);
  const [newPageContent, setNewPageContent] = useState({
    nom:"",
    description:"",
    places:0,
    is_open:false,
    lieu:"",
    date: Math.ceil((Date.now()/1000))
  })

  const handlePageChange = (pageid)=>{
    setPageToEdit(parseInt(pageid))
    setPageToEditContent(pages.filter((page)=>{return page.id===parseInt(pageid)})[0])
  }

  const handlePageEdit = (e,id)=>{
    e.preventDefault()
    if(window.confirm('Confirmer la modification de l \'activitées?')!==true) return;
    axios({
      url:`${urls.apiUrl}/api/auth/activitees/${id}`,
      method:'PUT',
      headers: { 'Authorization': `Bearer ${token}` },
      data:{
        "nom": pageToEditContent.nom,
        "description": pageToEditContent.description,
        "date": Math.ceil(new Date(pageToEditContent.date+3600)),
        "places":parseInt(pageToEditContent.places),
        "is_open":(pageToEditContent.is_open === true ||pageToEditContent.is_open === "true")? true:false,
        "lieu":pageToEditContent.lieu
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
      url:`${urls.apiUrl}/api/auth/activitees`,
      method:'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      data:{
        "nom": newPageContent.nom,
        "description": newPageContent.description,
        "date": Math.ceil(new Date(newPageContent.date+3600)/1000) ,
        "places":parseInt(newPageContent.places),
        "is_open":(newPageContent.is_open === true ||newPageContent.is_open === "true")? true:false,
        "lieu":newPageContent.lieu,
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
      nom:"",
      description:"",
      content:""
    })
  }

  const handlePageDelete = (id)=>{
    if(window.confirm('Confirmer la supréssion de l\'activité?')!==true) return;
    axios({ 
      url:`${urls.apiUrl}/api/auth/activitees/${id}`,
      method:'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    }).then((res)=>{
      getAllPages()
    }).catch((err)=>{
      console.log(err)
    })
  }

  const handlenomChange = (e)=>{
    setPageToEditContent({...pageToEditContent, nom:e.target.value})
  }

  const handleDescriptionChange = (e)=>{
    setPageToEditContent({...pageToEditContent, description:e.target.value})
  }

  const handlePlacesChanges = (e)=>{
    setPageToEditContent({...pageToEditContent, places:parseInt(e.target.value)})
  }
  
  const handleIsOpenChange = (e)=>{
    setPageToEditContent({...pageToEditContent, is_open:e.target.value})
  }

  const handleLieuChange = (e)=>{
    setPageToEditContent({...pageToEditContent, lieu:e.target.value})
  }

  const handleDateChange = (e)=>{
    setPageToEditContent({...pageToEditContent, date:Date.parse(e.target.value)/1000})
  }

  const handlenomChangeCreate = (e)=>{
    setNewPageContent({...newPageContent, nom:e.target.value})
  }

  const handleDescriptionChangeCreate = (e)=>{
    setNewPageContent({...newPageContent, description:e.target.value})
  }
  
  const handlePlacesChangesCreate = (e)=>{
    setNewPageContent({...newPageContent, places:e.target.value})
  }
  
  const handleIsOpenChangeCreate = (e)=>{
    setNewPageContent({...newPageContent, is_open:e.target.value})
  }

  const handleLieuChangeCreate = (e)=>{
    setNewPageContent({...newPageContent, lieu:e.target.value})
  }

  const handleDateChangeCreate = (e)=>{
    setNewPageContent({...newPageContent, date:Date.parse(e.target.value)/1000})
  }

  const getAllPages = ()=>{
    axios({
      url:`${urls.apiUrl}/api/auth/activitees`,
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    }).then((res)=>{
      console.log(res)
      if(res?.status !== 200) return;
      if(res?.data?.message === "Pas d'activitées trouver.")return(setIsCreate(true))
      setPages(res?.data?.message)
      setPageToEdit(res?.data.message[0].id)
      setPageToEditContent(res?.data.message[0])
    })
  }

  useEffect(()=>{
    getAllPages()
  },[token])

  return(
    <>
      {pageToEdit !== -1 &&
      <>
        <label htmlFor="page-select">Choisissez une activitée : </label>
        <select onChange={(e)=>{handlePageChange(e.target.value)}} nom="page" id="page-select">
          {!pages &&
            <option value={"-1"}>--</option>
          }
          {pages &&
            pages.map((page,key)=>{
              return <option value={page.id} key={key}>{page.nom}</option>
            })
          }
        </select>
        <form onSubmit={(e)=>{handlePageEdit(e, pageToEdit)}}>
          <button type="button" onClick={()=>{handlePageDelete(pageToEdit)}}>Supprimer l'activitée</button>
          <button type="submit">Mettre a jour l'activitée</button>
          <button type="button" onClick={()=>{handlePageCreate()}}>Créer une nouvelle activitée</button>

            <div classnom="formFields">
              {pageToEditContent&&
              <>
                <label htmlFor="nom">Nom : </label>
            <input type="text" id="nom" onChange={(e)=>{handlenomChange(e)}}  value={pageToEditContent.nom} />
            <br />
            <label htmlFor="description">Description : </label>
            <input type="text" id="description" onChange={(e)=>{handleDescriptionChange(e)}}  value={pageToEditContent.description} />
            <br />
            <label htmlFor="date">Date de l'activitées : </label>
            <input type="datetime-local" name="date" id="date" onChange={(e)=>{handleDateChange(e)}} value={new Date((pageToEditContent.date+3600)*1000).toISOString().slice(0,16)}/>
            <br />
            <label htmlFor="nbplaces">Nombre de places : </label>
            <input type="number" id="nbplaces"  value={parseInt(pageToEditContent.places)} onChange={(e)=>{handlePlacesChanges(e)}} />
            <br />
            <label htmlFor="lieu">Lieu de l'évenement : </label>
            <input nom="lieu" id="lieu" type="text" value={pageToEditContent.lieu}  onChange={(e)=>{handleLieuChange(e)}}/>
            <br />
            <label htmlFor="is_open">Activité ouverte a l'inscription ? </label>
            <select nom="is_open" id="is_open" onChange={(e)=>{handleIsOpenChange(e)}}>
              <option value="false">Non</option>
              <option value="true">Oui</option>
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
            <button type="button" onClick={()=>{handleBackToEdit()}}>Modifier une activitées existante</button>
            <button >Créer l'activitée</button>
            <br />
            <label htmlFor="nom">Nom : </label>
            <input type="text" id="nom" onChange={(e)=>{handlenomChangeCreate(e)}}  value={newPageContent.nom} />
            <br />
            <label htmlFor="description">Description : </label>
            <input type="text" id="description" onChange={(e)=>{handleDescriptionChangeCreate(e)}}  value={newPageContent.description} />
            <br />
            <label htmlFor="date">Date de l'activitées : </label>
            <input type="datetime-local" name="date" id="date" onChange={(e)=>{handleDateChangeCreate(e)}} value={new Date((newPageContent.date+3600)*1000).toISOString().slice(0,16)}/>
            <br />
            <label htmlFor="nbplaces">Nombre de places : </label>
            <input type="number" value={newPageContent.places} onChange={(e)=>{handlePlacesChangesCreate(e)}} />
            <br />
            <label htmlFor="lieu">Lieu de l'évenement : </label>
            <input nom="lieu" id="lieu" type="text" value={newPageContent.lieu}  onChange={(e)=>{handleLieuChangeCreate(e)}}/>
            <br />
            <label htmlFor="is_open">Activité ouverte a l'inscription ? </label>
            <select nom="is_open" id="is_open" onChange={(e)=>{handleIsOpenChangeCreate(e)}}>
              <option value="false">Non</option>
              <option value="true">Oui</option>
            </select>
          </form>
        </>
      }
    </>
  )
}
export default ModActivitees