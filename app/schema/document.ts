import { success, z } from "zod";

const test2 = {
  "data": [
    {
      "id":"500",
      "title_1": "Health Report",
      "paragraph_1": "This section explains important details about health.",
       "paragraph_2": "This section explains important details about health.",
      "list_1": {
        "id": "1",
        "type": "ol",
        "values": ["Eat healthy", "Exercise regularly"]
      },
      "header_1":"foo",
      "table_1": {
        "head": ["Name", "Age"],
        "body": [
          { "Name": "Michael", "Age": 32 },
          { "Name": "Peter", "Age": 23 }
        ]
      }
    },
    {
      "id":"400",
      "title_3": "Education Section",
      "header_1":"My Food",
      "paragraph_1": "This is another section of the document.",
      "list_2": {
        "id": "2",
        "type": "ul",
        "values": ["Primary School", "Secondary School"]
      }
    }
  ]
}

const listSchema = z.object({
  id: z.union([z.string(), z.number()]), // accept string or number
  type: z.enum(["ol", "ul"]),
  values: z.array(z.string())
});


const tableSchema = z.object({
  head: z.array(z.string()),
  body: z.array(z.record(z.any(),z.any()))
}).refine((data) => {
  const headLower = data.head.map(h => h.toLowerCase());
  return data.body.every(row => {
    const rowKeys = Object.keys(row).map(k => k.toLowerCase());
    return rowKeys.length === headLower.length && rowKeys.every(k => headLower.includes(k));
  });
}, {
  message: "Table body keys do not match head"
});


const sectionSchema = z.record(z.any(),z.any()).refine((section) => {
  for (const key in section) {
    if (key === "id") {
      if (typeof section[key] !== "string" && typeof section[key] !== "number") return false;
    } else if (/^title_\d*$/.test(key)) {
      if (typeof section[key] !== "string") return false;
    } else if (/^paragraph_\d*$/.test(key)) {
      if (typeof section[key] !== "string") return false;
    } else if (/^list_\d*$/.test(key)) {
      const parseResult = listSchema.safeParse(section[key]);
      if (!parseResult.success){ 
        console.log(key)
        return false
      };
    } else if (/^table_\d*$/.test(key)) {
      const parseResult = tableSchema.safeParse(section[key]);
      if (!parseResult.success) return false;
    } else if (/^header_\d*$/.test(key)) {
      if (typeof section[key] !== "string") return false;
    } else {
      return false; // unknown key
    }
  }
  return true;
}, { message: "Section contains invalid keys or values" });


const documentSchema = z.object({data:z.array(sectionSchema)});


export default function validateSchema (value:any){
  const error:any = new Set()
  try {
    value = JSON.parse(value)
    let result = documentSchema.safeParse(value)
    if (result.success) {
      return {success:true}
    } else {
      
      JSON.parse(result.error.message).forEach((err:any)=>{
        error.add(err.message)
      })
      
    }
    return {success:false,error}
  } catch (error) {
    return {success:false,error:new Set(["Format not Accepted"])}
  }

}



const test = {
    "data":[
        {
            "id":1,
            "title":"Text",
            "paragraph":"This is a Long Text",
            "headers":["Health Educations"],
            "list":{
                "id":1,
                "type":"ol",
                "values":["The List value","The list value 2"]
            },
            "table":{
                "id":1,
                "head":["name","Age"],
                "body":[
                    {"name":"Michael","age":34},
                    {"name":"Peter","age":23}
                ]
            }
        }
    ]
}


let d = {
    "data": [
      {
        "title_1": "Health Report",
        "paragraph_1": "This section explains important details about health.",
         "paragraph_2": "This section explains important details about health.",
        "list_1": {
          "id": 1,
          "type": "ol",
          "values": ["Eat healthy", "Exercise regularly"]
        },
        "table_1": {
          "head": ["Name", "Age"],
          "body": [
            { "Name": "Michael", "Age": 32 },
            { "Name": "Peter", "Age": 23 }
          ]
        }
      },
      {
        "title": "Education Section",
        "paragraph": "This is another section of the document.",
        "list_2": {
          "id": 2,
          "type": "ul",
          "values": ["Primary School", "Secondary School"]
        }
      }
    ]
  }















  