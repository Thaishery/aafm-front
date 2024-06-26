import {  useState } from "react"
import { Navigate } from "react-router-dom"
import axios from "axios";
import urls from "../../constants/urls"
import "./style.scss"

const Auth = ({userIsLoggedIn,setUserIsLoggedIn,setToken, token}) =>{
  const [form, setForm] = useState('login');

  const [loginError, setLoginError] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginEmailError, setLoginEmailError] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginPasswordError, setLoginPasswordError] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerEmailError, setRegisterEmailError] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerPasswordError, setRegisterPasswordError] = useState('')
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState('')
  const [registerPasswordConfirmError, setRegisterPasswordConfirmError] = useState('')

  const googleId = "436223154606-lq7257b6v49dvkjnvir7pirrm4k9lmjb.apps.googleusercontent.com"
  const googleRedirect = `${urls.apiUrl}/api/users/external/login`

  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const usableEmailRegex = new RegExp(emailRegex);

  const handleFormChange = (form) =>{
    setLoginEmail('')
    setLoginEmailError('')
    setLoginPassword('')
    setLoginPasswordError('')
    setRegisterEmail('')
    setRegisterEmailError('')
    setRegisterPassword('')
    setRegisterPasswordError('')
    setRegisterPasswordConfirm('')
    setRegisterPasswordConfirmError('')
    setLoginError('')
    setForm(form)
  }

  const handleLoginSubmit = (e)=>{
    e.preventDefault()
    const body = {
      username:loginEmail,
      password:loginPassword
    }
    axios({
      url:`${urls.apiUrl}/api/users/internal/login`,
      method: 'POST',
      data:body,
      headers:{'Content-Type':'application/json'}
    })
    .then((res)=>{
      if(res?.data?.token !=="" ){
        localStorage.setItem('token', res.data.token)
        setToken(res.data.token)
        setUserIsLoggedIn(true)
        setInterval(refreshToken,7180*1000)
      }
    })
    .catch((err)=>{
      setLoginError('Email ou mot de passe invalide')
      console.log(err)
      
    })
  }
  
  const refreshToken = async ()=>{
    let token = localStorage.getItem('token')
    if(!token)return
    try {
      const res = await axios({
        url: `${urls.apiUrl}/api/users/internal/validateToken`,
        method: 'POST',
        data: {
          token: token
        },
        headers: { 'Content-Type': 'application/json' }
      });
      if (res?.data?.token) {
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
      } 
      else {
      }
    } catch (error) {
      localStorage.removeItem('token');
      setUserIsLoggedIn(false);
    } finally {
      // setLoading(false);
    }
  }

  const handleRegisterSubmit = (e)=>{
    e.preventDefault()
    const body = {
      email:registerEmail,
      password:registerPassword,
      passwordVerif:registerPasswordConfirm
    }
    console.log("trig axios handleRegisterSubmit auth.jsx")
    axios({
      url:`${urls.apiUrl}/api/users/internal/register`,
      method: 'POST',
      data:body,
      headers:{'Content-Type':'application/json'}
    })
    .then((res)=>{
      console.log(res)
      if(res?.data?.token !==""|null){
        setToken(res.data.token)
        localStorage.setItem('token', res.data.token)
        setUserIsLoggedIn(true)
      }
    })
  }

  const handleLoginEmailChange = (e)=>{
    if(!usableEmailRegex.test( e.target.value))
    {
      if(e.target.value === ""){
        setLoginEmailError('l\'email ne peux pas être vide');
      }else{
        setLoginEmailError('format invalide');
      }
    }else{
      setLoginEmailError('');
    }
    setLoginEmail(e.target.value)
  }

  const handleRegisterEmailChange = (e)=>{
    if(!usableEmailRegex.test( e.target.value))
    {
      if(e.target.value === ""){
        setRegisterEmailError('l\'email ne peux pas être vide');
      }else{
        setRegisterEmailError('format invalide');
      }
    }else{
      setRegisterEmailError('');
    }
    setRegisterEmail(e.target.value)
  }

  const handleLoginPasswordChange = (e)=>{
    setLoginPassword(e.target.value)
  }

  const handleRegisterPasswordChange = (e)=>{
    setRegisterPassword(e.target.value)
  }

  const handleRegisterConfirmPasswordChange = (e)=>{
    if(e.target.value !== registerPassword)setRegisterPasswordConfirmError('Les mots de passe doivent corespondre');
    else setRegisterPasswordConfirmError('');
    setRegisterPasswordConfirm(e.target.value)
  }

  return(
    <>
    {userIsLoggedIn &&
      <Navigate to={"/"} />
    }
    <div className="container login_container">
      <div className="login_container form_select">
        <button className={"form_select form_select_button "+(form === "login" ? "--activ" : "")} onClick={()=>{handleFormChange("login")}}>Se connecter</button>
        <button className={"form_select form_select_button "+(form === "register" ? "--activ" : "")} onClick={()=>{handleFormChange("register")}}>S'inscrire</button>
      </div>

      {form === "login"&&
        <form onSubmit={handleLoginSubmit} className={loginError?"form input--error":"form"}>
          {loginError &&
              <pre className="error_message">
              {loginError}
            </pre>
          }
          <div className={"input " + (loginEmailError !== "" ? "input--error" : "")}>
          {(loginEmailError !== "")&&
              <pre className="error_message">
                {loginEmailError}
              </pre>
            }
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" value={loginEmail} onChange={(e)=>handleLoginEmailChange(e)} />
          </div>
          <div className={"input " + (loginPasswordError !== "" ? "input--error" : "")}>
          {(loginPasswordError !== "")&&
              <pre className="error_message">
                {loginPasswordError}
              </pre>
            }
            <label htmlFor="password">Mot de passe:</label>
            <input type="password" name="password" id="password" value={loginPassword} onChange={(e)=>handleLoginPasswordChange(e)} />
          </div>
          <div className="submit_button_container">
            <button className="submit_button" type="submit" >Se connecter</button>
          </div>
        </form>
      }
      
      {form === "register"&&
        <form onSubmit={handleRegisterSubmit} className="form">
          <div className={"input " + (registerEmailError !== "" ? "input--error" : "")}>
          {(registerEmailError !== "")&&
              <pre className="error_message">
                {registerEmailError}
              </pre>
            }
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" value={registerEmail} onChange={(e)=>handleRegisterEmailChange(e)} />
          </div>
          <div className={"input " + (registerPasswordError !== "" ? "input--error" : "")}>
          {(loginPasswordError !== "")&&
              <pre className="error_message">
                {loginPasswordError}
              </pre>
            }
            <label htmlFor="password">Mot de passe:</label>
            <input type="password" name="password" id="password" value={registerPassword} onChange={(e)=>handleRegisterPasswordChange(e)} />
          </div>
          <div className={"input " + (registerPasswordConfirmError !== "" ? "input--error" : "")}>
          {(registerPasswordConfirmError !== "")&&
              <pre className="error_message">
                {registerPasswordConfirmError}
              </pre>
            }
            <label htmlFor="passwordConfirm">Confirmer le mot de passe:</label>
            <input type="password" name="passwordConfirm" id="passwordConfirm" value={registerPasswordConfirm} onChange={(e)=>handleRegisterConfirmPasswordChange(e)} />
          </div>
          <div className="submit_button_container">
            <button className="submit_button" type="submit" >S'incrire</button>
          </div>
        </form>
      }
      <div className="google_btn_container">
        <a href={`https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${googleId}&scope=email profile&access_type=offline&redirect_uri=${googleRedirect}`}>
          <div className="customGPlusSignIn"><span className="icon"></span> <span className="buttonText">Se connecter<br/> via Google</span></div>
        </a>
      </div>
    </div>
    </>
  )
}
export default Auth