"use client"
import React from "react";

export default function Upload({handleInputChange}:{handleInputChange:any}){
  const handleFileUpload = (e:any) => {
    console.log(e)
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event:any) => {
      try {
        const upload = event.target?.result
        handleInputChange(upload)
        // const json = 
        // setJsonContent(json);
        // console.log("JSON content:", json);
      } catch (err) {
        alert("Invalid JSON file");
      }
    };

    reader.readAsText(file);
  };


    return (
        <div className="right-5 p-4 absolute ">
  <input
    id="file-upload"
    type="file"
    accept=".json"
    onChange={(e)=>handleFileUpload(e)}
    className="hidden"
  />

  <button
  title="Upload JSON"
    onClick={() => document.getElementById("file-upload")?.click()}
    className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white"
    ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
  </svg>
  
  </button>
</div>

    )
}
