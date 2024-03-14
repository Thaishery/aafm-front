import SimpleText from "../SimpleText/SimpleText";
import Slider from "../Sliders/slider";

const ModuleRender = ({modules})=>{
  return(
    modules.map((mod,key)=>{
      switch(mod.type){
        case 'simpleText': 
          return <SimpleText
            key={key}  
            articles={mod.module_content}
          />
        case 'slider':
          return <Slider
          key={key}
          slides={mod.module_content}
          />
        default:
          break;
      }
      return(<></>)
    })
  )
}
export default ModuleRender;