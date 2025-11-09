import { getPreview } from "./preview";


function saveEdit(newEdit:any){
  try {
    const newEditToString = JSON.stringify(newEdit)
    localStorage.setItem("preview",newEditToString)
  } catch (error) {
    
  }
}

export default function editSchema({type,id,position,newValue,which,attrr}:{type:string,id:any,position?:any,newValue:string,which?:string,attrr?:any}) {
  const parsedPreviewJSON:any = getPreview()

    const [eleType,num] = type.split("_");
    const sectionToEdit = parsedPreviewJSON.data.find((obj:any)=>obj.id === id)
    if (eleType === "title" || eleType === "header" || eleType === "paragraph" ){
      if(sectionToEdit){
        sectionToEdit[type] = newValue
      }
      saveEdit(parsedPreviewJSON)
    }else if(eleType === "list"){
     
        if(sectionToEdit){
            sectionToEdit[type].values[position] = newValue
        }
        saveEdit(parsedPreviewJSON)
    }else if(eleType === "table"){
      
      if(sectionToEdit){
        if(which === "head"){
          sectionToEdit[type][which][position] = newValue
        }else if(which === "body"){
          sectionToEdit[type][which][position][attrr] = newValue
        }
     }
     saveEdit(parsedPreviewJSON)
    }

    
}
