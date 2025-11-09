"use client"
import React from "react";
import TitleField from "./TitleField";
import TableComponent from "./Table";
import HeaderField from "./HeaderField";
import List from "./List";
import Paragraph from "./paragraph";
import { getPreview } from "../utils/preview";

const renderByKey = (key: string, value: any, editMode: boolean,id:number) => {
    if (key.startsWith("title")) {
      return <TitleField elemKey={key} key={key} value={value} editMode={editMode}  id={id}/>;
    }

    if (key.startsWith("header") || key.startsWith("headers")) {
      return <HeaderField elemKey={key} key={key} value={value} editMode={editMode}  id={id}/>;
    }

    if (key.startsWith("table")) {
      return <TableComponent elemKey={key} key={key} table={value} editMode={editMode}  id={id}/>;
    }

    if (key.startsWith("list")) {
      return <List elemKey={key} key={key} list={value} editMode={editMode}  id={id}/>;
    }

    if (key.startsWith("paragraph") || key === "text") {
      return (
        < Paragraph elemKey={key} key={key} value={value} editMode={editMode}  id={id} />
      );
    }

    return null; // ignore unknown fields
  };


const Main = ({data,editMode}:{data:any,editMode:boolean})=>{
    return (
        data.map((section:any, i:number) => (
          <div key={i} className="border-b border-gray-700 mb-6 pb-4">
            {Object.entries(section).map(([key, value]) =>
              renderByKey(key, value, editMode,section.id)
            )}
          </div>
        ))
    )
}

export default function Element({editMode}:{editMode:boolean}){
    const preview = getPreview()
    const data = preview?.data
    return(
    <>
      {data?.length > 0 ? (<Main data={data} editMode = {editMode}/>):"Nothing to Display"}
    </>
)

}