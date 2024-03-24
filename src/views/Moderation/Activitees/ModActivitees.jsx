import { Fragment, useEffect, useState } from "react"
import axios from "axios"
import urls from "../../../constants/urls";

import "./style.scss"

const ModActivitees = ({token})=>{
  const [pages, setPages]= useState()
  const [pageToEdit, setPageToEdit] = useState(-1)
  const [pageToEditContent, setPageToEditContent] = useState()
  const [isCreate, setIsCreate] = useState(false);
  const [addParticipantId, setAddParticipantId] = useState(-1);
  const [newPageContent, setNewPageContent] = useState({
    nom:"",
    description:"",
    places:0,
    is_open:false,
    lieu:"",
    date: Math.ceil((Date.now()/1000))
  })
  const [activityUsers, setActivityUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const getActiviteesUsers = async (activiteId)=>{
    await axios({
      url:`${urls.apiUrl}/api/auth/activitees_users/${activiteId}`,
      method:'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    }).then((res)=>{
      if(res.status !== 200 ) return (setActivityUsers([]));
      if(res.data.message === "Pas d'activitées trouver.") return (setActivityUsers([]));
      setActivityUsers(res?.data?.users)
    }).catch((err)=>{
    })
  }

  const handleParticipantAdd = async(e, userId, activiteesId)=>{
    e.preventDefault();
    if(window.confirm('Confirmer l\'ajout de l\'utilisateur?')!==true) return;
    await axios({
      url:`${urls.apiUrl}/api/auth/activitees/moderer/inscrire/${activiteesId}/${userId}`,
      method:'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    }).then((res)=>{
      //? dans tous les cas mise a jours des utilisateurs : 
      getActiviteesUsers(activiteesId)
      getAllUsers()
    }).catch((err)=>{
    })
  }

  const handleDeleteUser = async (e,userId,activiteesId)=>{
    e.preventDefault();
    if(window.confirm('Confirmer la supression de l\'utilisateur?')!==true) return;
    await axios({
      url:`${urls.apiUrl}/api/auth/activitees/moderer/desinscrire/${activiteesId}/${userId}`,
      method:'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    }).then((res)=>{
      //? dans tous les cas mise a jours des utilisateurs : 
      getActiviteesUsers(activiteesId)
      getAllUsers()
    }).catch((err)=>{
    })
  }
  const handlePageChange = (pageid)=>{
    getActiviteesUsers(pageid);
    setPageToEdit(parseInt(pageid))
    setPageToEditContent(pages.filter((page)=>{return page.id===parseInt(pageid)})[0])
  }

  const handlePageEdit = (e,id)=>{
    e.preventDefault()
    if(window.confirm('Confirmer la modification de l \'Activités?')!==true) return;
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
        "date": Math.ceil(new Date(newPageContent.date+3600)) ,
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
      if(res?.status !== 200) return;
      if(res?.data?.message === "Pas d'Activités trouver.")return(setIsCreate(true));
      setPages(res?.data?.message)
      setPageToEdit(res?.data.message[0].id)
      setPageToEditContent(res?.data.message[0])
      getActiviteesUsers(res?.data.message[0].id)
    })
  }

  const getAllUsers = async()=>{
    await axios({
      url:`${urls.apiUrl}/api/auth/users/getAll`,
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    }).then((res)=>{
      if(res.status !== 200) return(setAllUsers([]));
      setAllUsers(res?.data)
      setAddParticipantId(res?.data[0]?.id)
    })
  }

  useEffect(()=>{
    getAllPages()
    getAllUsers()
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
          {(pages && typeof(pages)!=="string" && pages?.length > 0 ) &&
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
              {(pageToEditContent && typeof(pageToEditContent) !=="string")&&
              <>
                <label htmlFor="nom">Nom : </label>
            <input type="text" id="nom" onChange={(e)=>{handlenomChange(e)}}  value={pageToEditContent.nom} />
            <br />
            <label htmlFor="description">Description : </label>
            <input type="text" id="description" onChange={(e)=>{handleDescriptionChange(e)}}  value={pageToEditContent.description} />
            <br />
            <label htmlFor="date">Date de l'Activités : </label>
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
            {(pageToEditContent.is_open === true || pageToEditContent.is_open === "true") && 
              <>
                <option value="true">Oui</option>
                <option value="false">Non</option>
              </>
            }
            {(pageToEditContent.is_open === false || pageToEditContent.is_open === "false") && 
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
        <br />
        <h3>Particiapants : </h3>
        <br />
          {
            (typeof(activityUsers) === "object" && activityUsers.length > 0 )&&
            <>
              <ul>
                {activityUsers.map((user,key)=>{
                  return(
                    <li key={key} className="user_list_item">
                      <div>
                        {user.email}
                      </div> 
                      <div>
                        {user.firstname}
                      </div> 
                      <div>
                        {user.lastname}
                      </div> 
                      <button onClick={(e)=>{handleDeleteUser(e,user.id, pageToEdit)}}>Supprimer l'utilisateur</button>
                    </li>
                  )
                })}
              </ul>
              
            </>
          }
        <br />
        <h3>Ajouter un Participants : </h3>
        <br />
        <form onSubmit={(e)=>{handleParticipantAdd(e, addParticipantId,pageToEdit)}}>
          <label htmlFor="participant">Séléctionner l'utilisatateur : </label>
          <select name="pariciapant" id="participant" onChange={(e)=>{setAddParticipantId(e.target.value)}}>
          {!allUsers &&
            <option value={"-1"}>--</option>
          }
          {allUsers &&
            allUsers.map((user,key)=>{
              if(
                (typeof(activityUsers) === "object" && activityUsers.length > 0 )&&
                activityUsers.find((auser) => auser.id === user.id)
              )return(
              <Fragment key={key}>
                {
                  (addParticipantId === user.id) &&
                  <>
                    {
                      setAddParticipantId(-1)
                    }
                  </>
                }
              </Fragment>
              )
              return (
                <option value={user.id} key={key}>
                  {user.email}
                  {
                    addParticipantId === -1 &&
                      setAddParticipantId(user.id)
                  }
                </option>
              )
            })
          }
          </select>
          <button>Ajouter</button>
        </form>
      </>
      }
      {isCreate && 
        <>
          <form onSubmit={(e)=>{handleNewPageCreate(e)}}>
            <button type="button" onClick={()=>{handleBackToEdit()}}>Modifier une Activités existante</button>
            <button >Créer l'activitée</button>
            <br />
            <label htmlFor="nom">Nom : </label>
            <input type="text" id="nom" onChange={(e)=>{handlenomChangeCreate(e)}}  value={newPageContent.nom} />
            <br />
            <label htmlFor="description">Description : </label>
            <input type="text" id="description" onChange={(e)=>{handleDescriptionChangeCreate(e)}}  value={newPageContent.description} />
            <br />
            <label htmlFor="date">Date de l'Activités : </label>
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