import { Fragment, useEffect, useState } from "react"
import axios from "axios";
import urls from "../../constants/urls";

const Activitees = ({userIsLoggedIn ,token}) =>{
  const [activitees,setActivitees] = useState([]);
  const getActivitees = async()=>{
    try{
      await axios({
        url: `${urls.apiUrl}/api/auth/activitees`,
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      }).then((res)=>{
        console.log(res)
        setActivitees(res?.data?.message)
      });
    }catch(e){

    }
  }
  const handleActivityRegister = async (activite) => {
    if(window.confirm('Confirmer l\'inscription a l\'activitée?')===true){
      await axios({
        url:`${urls.apiUrl}/api/auth/activitees/sinscrire/${activite.id}`,
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res)=>{
        console.log(res)
        if(res.status === 200)getActivitees();
      })
    }
  }
  const handleActivityUnregister = async (activite) => {
    if(window.confirm('Confirmer la désincription a l\'activitée?')===true){
      await axios({
        url:`${urls.apiUrl}/api/auth/activitees/desinscrire/${activite.id}`,
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res)=>{
        if(res.status === 200)getActivitees();
      })
    }
  }

  useEffect(()=>{
    async function getActivitees(){
      try{
        await axios({
          url: `${urls.apiUrl}/api/auth/activitees`,
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` }
        }).then((res)=>{
          setActivitees(res?.data?.message)
        });
      }catch(e){

      }
    }
    getActivitees();
  },[token])

  return(
    <>
      <h2>Retrouver ici la liste des activités disponibles : </h2>
      {((typeof(activitees)==="object") && activitees?.length > 0)  && 
        activitees.map((activite,key)=>{
          if(!activite?.is_open) return(<Fragment key={key}></Fragment>) 
          return(
          <Fragment key={key}>
            <div className="activitees_container">
              <div>{activite.nom}</div>
              <div>Le : {new Date(activite.date.date).toLocaleString().slice(0,16).replace(" "," à ")}</div>
              {(activite.description !== "" && activite.description !== "optionel") &&
                <>
                  <p>Description : </p> 
                  <div>{activite.description}</div>
                </>
              }
              {(activite.lieu && activite.lieu != null && activite.lieu !== "") &&
                <div>Adresse: <br /> {activite.lieu}</div>
              }
              <div>Places disponibles : {(activite.place_libres > 0)?activite.place_libres:"Plus aucune place disponible." } </div>
            </div>
            {((activite.place_libres > 0)&& !activite.inscrit)&&
              <button onClick={()=>{handleActivityRegister(activitees[key])}}>M'inscrire a l'activité</button>
            }
            {(activite.inscrit)&&
              <button onClick={()=>{handleActivityUnregister(activitees[key])}}>Me desincrire de l'activité</button>
            }
            <hr />
          </Fragment>
          )
        })
      }
    </>
  )
}
export default Activitees