"use client";
import React from "react";
import editSchema from "../utils/editSchema";

interface ListProps {
  list:{
    type: "ol" | "ul";
    title:string,
    values: string[]
  },
  elemKey:string,
  editMode: boolean;
  id: number;
}


export default function List({
  list,
  elemKey,
  editMode,
  id
}: ListProps) {
    
    // const id = list?.id
    const type = list?.type
    const title = list?.title
    const values = list?.values

      const update = function (e:React.FormEvent<HTMLLIElement>,position:number){
        const newValue = e.currentTarget.innerText
        editSchema({type:elemKey,id,newValue,position})
      }
    
    
    const ListTag = ()=>type === "ol" ? (<ol className={`${!editMode ? "opacity-60 cursor-not-allowed" : ""} list-decimal list-inside`}>
   {values?.map((item, idx) => (
          <li contentEditable={editMode} key={idx} onInput={e=>update(e,idx)}>
            {item}
          </li>
        ))}
</ol>) :  (<ul className={`${!editMode ? "opacity-60 cursor-not-allowed" : ""} list-inside list-disc`}>
   {values?.map((item, idx) => (
          <li contentEditable={editMode} key={idx} onInput={e=>update(e,idx)}>
            {item}
          </li>
        ))}
</ul>);
  

  const handleEdit = (index: number, newValue: string) => {
   
    const updated = [...values];
    updated[index] = newValue;

  };

  return (
    <div className="my-4">
      <h3 className="text-md mb-2 capitalize">
        {title}
      </h3>

      



      <ListTag />


        
      
    </div>
  );
}
