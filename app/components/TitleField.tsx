"use client";
import React from "react";
import editSchema from "../utils/editSchema";

export default function TitleField({ value, editMode,elemKey,id }: {
  value: string;
  elemKey:string;
//   onChange: (val: string) => void;
  editMode: boolean;
  id:number
}) {

  const update = function (e:React.FormEvent<HTMLHeadingElement>){
    const newValue = e.currentTarget.innerText
    editSchema({type:elemKey,id:id,newValue:newValue})
  }

  return (
    <h1
      onInput={(e)=>{update(e)}}
      contentEditable={editMode}
      className={` text-4xl font-bold text-center pb-5 text-white w-full ${
        !editMode ? "opacity-60 cursor-not-allowed" : ""
      }`}
    
      >
        {value}
    
    </h1>
    
  );
}
