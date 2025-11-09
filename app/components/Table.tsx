"use client";
import React from "react";
import editSchema from "../utils/editSchema";

interface TableProps {
  table:{head: string[];
    body: Record<string, string | number>[];}
    editMode:boolean
    elemKey:string,id:number
}

export default function TableComponent({table,editMode,elemKey,id}:TableProps) {
    let head = table?.head
    let body = table?.body
    
    const update = function ({e,position,key}:{e:React.FormEvent<HTMLTableCellElement>,position:number,key?:string}){
            const newValue = e.currentTarget.innerText
            const dataSetType = e.currentTarget.dataset.type
            editSchema({type:elemKey,id,newValue,position,which:dataSetType,attrr:key})
      }

  if (!head || head.length === 0) {
    return (
      <div className="text-gray-400 italic p-4 border border-dashed border-gray-600 rounded-lg">
        No table headers provided.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl shadow-md bg-gray-900 border border-gray-700">
      <table className="min-w-full text-sm text-left text-gray-300">
        {/* Table Head */}
        <thead className="bg-gray-800 text-gray-200 capitalize text-xs tracking-wider">
          <tr>
            {head.map((header, idx) => (
              <th  key={idx} className={`${!editMode ? "opacity-60 cursor-not-allowed" : ""} px-4 py-3 font-semibold `}>
                {header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {body && body.length > 0 ? (
            body.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${
                  rowIndex % 2 === 0 ? "bg-gray-950/40" : "bg-gray-900/40"
                } border-b border-gray-700 hover:bg-gray-800/40 transition`}
              >
                {head.map((key, colIndex) => (
                  <td contentEditable={editMode}
                  data-type="body"
                  onInput={(e)=>{update({e,position:colIndex,key})}}
                  key={colIndex} className={`px-4 py-2 ${!editMode ? "opacity-60 cursor-not-allowed" : ""}`} >
                    {row[key] ?? (
                      <span className="text-gray-500">—</span>
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={head.length}
                className="text-center text-gray-500 py-4 italic"
              >
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
