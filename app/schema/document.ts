import { z } from "zod";
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





// {
//   id: 2001,
//   title_3: "Patient Medical Summary",
//   paragraph_3:
//     "This report presents a comprehensive health assessment for Mr. John Ade, a 45-year-old male who recently underwent a full medical examination. The report focuses on four key health concerns: hypertension, diabetes, malaria, and obesity.",
//   paragraph_2:
//     "The findings below summarize diagnostic results, clinical observations, and recommendations for ongoing management and lifestyle improvement.",
//   header_1:"Personality",
//   list_1: {
//     id: 1,
//     type: "ol",
//     values: [
//       "Name: John Ade",
//       "Age: 45",
//       "Gender: Male",
//       "Date of Examination: 2025-11-09",
//     ],
//   },
//   table_1: {
//     head: ["Parameter", "Result", "Normal Range"],
//     body: [
//       {
//         Parameter: "Blood Pressure",
//         Result: "152/96 mmHg",
//         "Normal Range": "< 120/80 mmHg",
//       },
//       {
//         Parameter: "Fasting Blood Sugar",
//         Result: "142 mg/dL",
//         "Normal Range": "70–100 mg/dL",
//       },
//       {
//         Parameter: "Body Mass Index (BMI)",
//         Result: "32.1 (Obese)",
//         "Normal Range": "18.5–24.9",
//       },
//       {
//         Parameter: "Malaria Parasite Test",
//         Result: "Positive (+)",
//         "Normal Range": "Negative",
//       },
//     ],
//   },
// },










  