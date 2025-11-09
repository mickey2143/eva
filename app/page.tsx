"use client";

import React, { useState } from "react";
import Element from "./components/Element";
import Upload from "./components/UploadButton";

import { validateNoDuplicateKeys } from "./utils/validateSchema";
import { getPreview } from "./utils/preview";
import validateSchema from "./schema/document";
import { Bounce, toast } from "react-toastify";


export default function LiveJsonPreviewer() {
  const [jsonInput, setJsonInput] = useState("");
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  

  
  if(jsonInput === ""){
    if (typeof window !== "undefined") {
      localStorage.removeItem("preview")
    }
    
  }
  function handleEdit(){
    setEditMode(!editMode)
    const preview = getPreview()
    if(!preview)return
    setJsonInput( JSON.stringify(preview, null, 2) )
  }

  const handleInputChange = (value: string) => {
    try {
      setJsonInput(value);
      const validation = validateSchema(value)
      if(!validation.success){
        toast.error([...validation.error].join(" "), {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
          });

          if (typeof window !== "undefined") {
            localStorage.clear()
          }
          

        return 0
      }
      
      

 if (typeof window !== "undefined") {
                
      localStorage.setItem("preview",value)
      localStorage.setItem("v1",value)
        }
     
    
      const parsed = JSON.parse(value);
      if(!Array.isArray(parsed.data)) throw new Error("Invalid format");
      setParsedData(parsed.data);
      setError(null);
    } catch (err: any) {
      setError(err.message);

      console.log(err)
      setParsedData([]);
    }
  };

  

 

  return (
    <div className="p-6 md:flex h-screen space-x-4">
     
     <div className=" md:hidden flex justify-between items-center mb-4">
          <button
            onClick={() => setViewMode(!viewMode)}
            className="px-4 py-1.5 text-sm rounded-md border border-green-500 text-green-400 hover:bg-green-500/10 transition"
          >
            {!viewMode ? "View Preview":"Off View"}

          </button>
        </div>

      <div className="bg-gray-800 p-4 relative rounded-lg hidden md:block shadow-md h-full w-full md:w-2/5">
        <Upload handleInputChange={handleInputChange}/>

        <textarea
          rows={8}
          placeholder="Paste or type JSON here..."
          value={jsonInput}
          onChange={(e) => handleInputChange(e.target.value)}
          className="w-full h-full p-3 rounded-md bg-gray-900 border border-gray-700 text-gray-100 font-mono text-sm"
        />
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </div>

    {!viewMode ? (<div className="bg-gray-800 md:hidden p-4 relative rounded-lg shadow-md h-full w-full md:w-2/5">
        <Upload handleInputChange={handleInputChange}/>

        <textarea
          rows={8}
          placeholder="Paste or type JSON here..."
          value={jsonInput}
          onChange={(e) => handleInputChange(e.target.value)}
          className="w-full h-full p-3 rounded-md bg-gray-900 border border-gray-700 text-gray-100 font-mono text-sm"
        />
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </div>):""}
      

    
    {viewMode ? ( <div className="bg-gray-800 p-4 rounded-lg shadow-md h-full w-full md:w-3/5 md:hidden block text-white overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => handleEdit()}
            className="px-4 py-1.5 text-sm rounded-md border border-green-500 text-green-400 hover:bg-green-500/10 transition"
          >
            {editMode ? "Save" : "Edit"}

          </button>
        </div>

        <Element editMode={editMode} />
       
      </div>):""}

      <div className="bg-gray-800 p-4 rounded-lg shadow-md h-full w-full md:w-3/5 hidden md:block text-white overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => handleEdit()}
            className="px-4 py-1.5 text-sm rounded-md border border-green-500 text-green-400 hover:bg-green-500/10 transition"
          >
            {editMode ? "Save" : "Edit"}

          </button>
        </div>

        <Element editMode={editMode} />
       
      </div>
    </div>
  );
}
