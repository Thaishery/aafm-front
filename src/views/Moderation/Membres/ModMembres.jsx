import { Fragment, useEffect, useState } from "react"
import axios from "axios"
import urls from "../../../constants/urls";
import "./style.scss"

const ModMembres = ({ token }) => {
  const [pages, setPages] = useState()
  const [pageToEdit, setPageToEdit] = useState(-1)
  const [pageToEditContent, setPageToEditContent] = useState()
  const [isCreate, setIsCreate] = useState(false);
  const [newPageContent, setNewPageContent] = useState({
    name: "",
    description: "",
    content: ""
  })

  const handleValidateAdhesion = async (e,adhesionId) =>{
    e.preventDefault();
    console.log(adhesionId)
    axios({
      url: `${urls.apiUrl}/api/auth/adhesion/validate/${adhesionId}`,
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    }).then((res) => {
      console.log(res)
      if(res.status !== 200) return;
      if(res?.data?.message !== "ok") return;
      getAllPages()
    }).catch((err) => {
      console.log(err)
    })
  }
  const handleDeclineAdhesion = async (e,adhesionId) =>{
    e.preventDefault();
    console.log(adhesionId)
    axios({
      url: `${urls.apiUrl}/api/auth/adhesion/decline/${adhesionId}`,
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    }).then((res) => {
      console.log(res)
      if(res.status !== 200) return;
      if(res?.data?.message !== "ok") return;
      getAllPages()
    }).catch((err) => {
      console.log(err)
    })
  }

  const getAllPages = () => {
    axios({
      url: `${urls.apiUrl}/api/auth/all_adhesion`,
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    }).then((res) => {
      console.log(res)
      if (res?.status !== 200) return;
      setPages(res?.data)
      // setPageToEdit(res?.data[0].id)
      // setPageToEditContent(res?.data[0])
    })
  }

  useEffect(() => {
    getAllPages()
  }, [token])

  return (
    <>
      <h3 className="adhesion_title">En Attente : </h3>
      {(pages && pages?.length > 0) &&
        <ul className="adhesion_list">
          <li>
            <div>
              Status :
            </div>
            <div>
              Email :
            </div>
            <div className="adhesion_com">
              Commentaire :
            </div>
            <div>
              Status payement :
            </div>
            <div>
              Actions :
            </div>
          </li>
          {pages.map((page, key) => {
            if (page.statut !== "pending") return (<Fragment key={key}></Fragment>)
            return (
              <li key={key}>
                <div>
                  {page.statut}
                </div>
                <div>
                  {page.user_email}
                </div>
                <div className="adhesion_com">
                  {page.commentaire}
                </div>
                <div>
                  {page.is_paid ? "Payer" : "Non payer"}
                </div>
                <div>
                  {page.statut === "pending" &&
                    <>
                      <button onClick={(e)=>{handleValidateAdhesion(e,page.id)}}>Accepter</button>
                      <button onClick={(e)=>{handleDeclineAdhesion(e,page.id)}}>Refusser</button>
                    </>
                  }
                </div>
              </li>
            )
          })}
        </ul>
      }
      <hr />
      <h3 className="adhesion_title">Validé : </h3>
      {(pages && pages?.length > 0) &&
        <ul className="adhesion_list">
          <li>
            <div>
              Status :
            </div>
            <div>
              Email :
            </div>
            <div className="adhesion_com">
              Commentaire :
            </div>
            <div>
              Status payement :
            </div>
            <div>
              Actions :
            </div>
          </li>
          {pages.map((page, key) => {
            if (page.statut === "pending") return (<Fragment key={key}></Fragment>)
            return (
              <li key={key}>
                <div>
                  {page.statut}
                </div>
                <div>
                  {page.user_email}
                </div>
                <div className="adhesion_com">
                  {page.commentaire}
                </div>
                <div>
                  {page.is_paid ? "Payer" : "Non payer"}
                </div>
                <div>
                  {page.statut === "accepted" &&
                    <>
                      <button onClick={(e)=>{handleDeclineAdhesion(e,page.id)}}>Révoquer</button>
                    </>
                  }
                </div>
              </li>
            )
          })
          }
        </ul>
      }
    </>
  )
}
export default ModMembres