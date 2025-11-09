"use client";
import React from "react";
import editSchema from "../utils/editSchema";

export default function HeaderField({ value,editMode,elemKey,id}: {
  value: string;
  editMode: boolean;
  elemKey:string,
  id:number
}) {
  
   const update = function (e:React.FormEvent<HTMLHeadingElement>){
      const newValue = e.currentTarget.innerText
      editSchema({type:elemKey,id:id,newValue:newValue})
    }

  return (
    <h2
      onInput={(e)=>{update(e)}}
      contentEditable={editMode}
      className={` text-2xl font-bold pb-5 text-white  w-full ${
        !editMode ? "opacity-60 cursor-not-allowed" : ""
      }`}   >
        {value}
    
    </h2>
    
  );
}
