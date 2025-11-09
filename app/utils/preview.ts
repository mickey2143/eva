export function getPreview (){
    try{
      const previewJSON:any = localStorage.getItem("preview")
      const parsedPreviewJSON = JSON?.parse(previewJSON)
      return parsedPreviewJSON
    }catch(err){
  
    }
  }