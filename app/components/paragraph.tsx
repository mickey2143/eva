"use client";
import React from "react";
import editSchema from "../utils/editSchema";

export default function Paragraph({ value,editMode,elemKey,id}: {
  value: string;
  editMode: boolean;
  elemKey: string,
  id:number
}) {


    const update = function (e:React.FormEvent<HTMLHeadingElement>){
       const newValue = e.currentTarget.innerText
       editSchema({type:elemKey,id:id,newValue:newValue})
     }
   
    
  return (
    <p
      onInput={(e)=>{update(e)}}
      contentEditable={editMode}
      className={`  text-gray-300 leading-relaxed my-3 ${!editMode ? "opacity-60 cursor-not-allowed" : ""}`}>
        {value}
    
    </p>
  );
}
