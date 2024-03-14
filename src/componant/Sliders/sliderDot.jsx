const SliderDot = ({setActive,curent,id}) =>{
  return (
  <>
    <button onClick={()=>setActive(id)} className={curent===id?'active':""}></button>
  </>
  )
}
export default SliderDot