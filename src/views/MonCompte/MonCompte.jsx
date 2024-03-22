import { Fragment, useEffect, useState } from "react"
import  axios  from "axios"
import urls from "../../constants/urls";
import "./style.scss"

const MonCompte = ({userIsLoggedIn ,token})=>{

  const [userInfo,setUserInfo] = useState({
    id: null,
    email: "",
    lastname: "",
    firstname: "",
    activitees: [],
    adhesion: {},
    articles: {},
  })

  const [data, setData] = useState({
    password:"",
    passwordVerif:""
  })

  const [demandeAdhesion, setDemandeAdhesion] = useState({
    commentaire:""
  })
  
  const getUserInfos = async () => {
    try{
      const res = await axios({
        url: `${urls.apiUrl}/api/auth/users/getSelf`,
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res?.data) {
        setUserInfo(res.data)
      } else {
      }
    } catch (error) {
      console.error('Error validating token:', error);
    } finally {
    }
  } 
  
  useEffect(()=>{
    async function fetchData(){
      try{
        const res = await axios({
          url: `${urls.apiUrl}/api/auth/users/getSelf`,
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res?.data) {
          setUserInfo(res.data)
        } else {
        }
      } catch (error) {
        console.error('Error validating token:', error);
      } finally {
      }
    }
    fetchData()
  },[token])

  const handleEditProfile =(e)=>{
    e.preventDefault()
    axios({
      url:`${urls.apiUrl}/api/auth/users/internal/edituser`,
      method: 'POST',
      data: prepareData(),
      headers:{
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then((res)=>{
      //should confirm here ... 
    })
  }

  const prepareData = ()=>{
    let senddata = {
      email: userInfo.email,
      lastname: userInfo.lastname,
      firstname: userInfo.firstname,
    }
    if(data.password)senddata.password = data.password;
    if(data.passwordVerif)senddata.passwordVerif = data.passwordVerif;
    return senddata
  }

  const handleLastname = (e)=>{
    setUserInfo({...userInfo, lastname: e.target.value})
  }

  const handleFirstname = (e)=>{
    setUserInfo({...userInfo, firstname: e.target.value})
  }

  const handlePassword = (e)=>{
    setData({...data, password: e.target.value})
  }

  const handlePasswordConfirm = (e)=>{
    setData({...data, passwordVerif: e.target.value})
  }

  const handleDemandeCommentaire = (e) =>{
    setDemandeAdhesion({...demandeAdhesion, commentaire: e.target.value})
  }
  const handelCancelActivity = async (activite)=>{
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
        if(res.status === 200)getUserInfos();
      })
    }
  }

  const handleDemandeAdhesion = (e)=>{
    e.preventDefault()
    axios({
      url:`${urls.apiUrl}/api/auth/adhesion`,
      method: 'POST',
      data: demandeAdhesion,
      headers:{
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then((res)=>{
      if(res.status === 200)getUserInfos();
    })
  }

  return(
    <div className="compte__container">
      <h2>Mon profile</h2>
        <form className="profile__form" onSubmit={handleEditProfile}>
          <div className="form__field col1">
            <label htmlFor="email">
              Email: 
            </label>
            <input type="email" name="email" disabled readOnly value={userInfo.email} />
          </div>
          <div className="form__field col2">
            <div className="field">
            <label htmlFor="lastname">
              Prenom:
            </label>
            <input type="text" name="lastname" onChange={(e)=>{handleLastname(e)}}  value={userInfo.lastname} />
            </div>
            <div className="field">
            <label htmlFor="firstname">
              Nom:
            </label>
            <input type="text" name="firstname" onChange={(e)=>{handleFirstname(e)}} value={userInfo.firstname} />
            </div>
          </div>
          <div className="form__field col2">
            <div className="field">
              <label htmlFor="password">
                Mot de passe:
              </label>
              <input type="password" name="password" onChange={(e)=>{handlePassword(e)}}  value={userInfo.password} />
            </div>
            <div className="field">
              <label htmlFor="passwordConfirm">
                Confirmer:
              </label>
              <input type="password" name="passwordConfirm" onChange={(e)=>{handlePasswordConfirm(e)}} value={userInfo.passwordConfirm} />
            </div>
          </div>
          <div className="submit_button_container">
            <button className="submit_button" type="submit" >Mettre a jour</button>
          </div>
        </form>
        <br/>
        <hr></hr>
      <h2>Mon adhésion</h2>
      <div className="adhesion__container">
        {
          userInfo && userInfo.adhesion &&  Object.keys(userInfo.adhesion).length > 0 &&
          <div className="adhesion_curent">
            <h3>Status du votre adhésion : </h3>
            <div>
              Statut: {userInfo.adhesion.statut}<br/>
              Date de validité : {userInfo.adhesion.date?userInfo.adhesion.date:"Pas encore valide"}<br/>
              Payer : {userInfo.adhesion.is_paid?'Payer':'Non payer ou payement non traité'}<br/>
              Commentaire : {userInfo.adhesion.commentaire?userInfo.adhesion.commentaire:''}<br/>
            </div>
          </div>
        }
        {
          userInfo && (!userInfo.adhesion || Object.keys(userInfo.adhesion).length === 0) &&
          <div>
            Pas d'ahdésion trouvé.
              <h3>Ma demande d'adhésion : </h3>
            <form onSubmit={handleDemandeAdhesion}>
              <p>
                Afin de demander l'adhesion, merci d'êcrire dans la zone suivantes toutes les informations permetant de vous ratacher a un payement.<br/>
                Attention, une fois cele-ci envoyer, elle ne sera plus modifiable. 
              </p>
              <textarea className="textarea__fullsize" value={demandeAdhesion.commentaire} onChange={(e)=>{handleDemandeCommentaire(e)}}></textarea><br/>
              <button className="submit_button" type="submit" >Demander l'adhesion</button>
              <br />
            </form>

          </div>
        }
      </div>
      {(userInfo?.activitees.length>0)&&
      <>
        <hr></hr>
        <h2>Mes Activités</h2>
        <p>Retrouver ici la liste de vos Activités a venirs</p>
        {userInfo?.activitees?.map((activite,key)=>{
          if(!activite.is_open)return(<Fragment key={key}></Fragment>); // no closed activity shown ... 
          let datetime = new Date(activite.date.date)
          if(datetime < new Date())return(<Fragment key={key}></Fragment>); // no pased activity shown ... 
          return(
            // this shoudl be a componant ... 
            <div key={key}>
            <div>{activite.nom}</div>
            <div>Le : {new Date(activite.date.date).toLocaleString().slice(0,16).replace(" "," à ")}</div>
            {
              (activite?.description !== "" && activite?.description !== "optionel" )&&
              <>
                <div>Desciption : </div>
                <p>{activite?.description}</p>
              </>
            }
            <button type="button" onClick={()=>{handelCancelActivity(userInfo.activitees[key])}}>Me désincrire.</button>
            <hr></hr>
          </div>
          )
        })}
      </>  
      }
    </div>
  )
}
export default MonCompte