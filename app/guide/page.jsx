"use client";
import React from "react";

const exampleData = {
  data: [
    {
      id: 2001,
      title_3: "Patient Medical Summary",
      paragraph_3:
        "This report presents a comprehensive health assessment for Mr. John Ade, a 45-year-old male who recently underwent a full medical examination. The report focuses on four key health concerns: hypertension, diabetes, malaria, and obesity.",
      paragraph_2:
        "The findings below summarize diagnostic results, clinical observations, and recommendations for ongoing management and lifestyle improvement.",
      header_1:"Personality",
      list_1: {
        id: 1,
        type: "ol",
        values: [
          "Name: John Ade",
          "Age: 45",
          "Gender: Male",
          "Date of Examination: 2025-11-09",
        ],
      },
      table_1: {
        head: ["Parameter", "Result", "Normal Range"],
        body: [
          {
            Parameter: "Blood Pressure",
            Result: "152/96 mmHg",
            "Normal Range": "< 120/80 mmHg",
          },
          {
            Parameter: "Fasting Blood Sugar",
            Result: "142 mg/dL",
            "Normal Range": "70–100 mg/dL",
          },
          {
            Parameter: "Body Mass Index (BMI)",
            Result: "32.1 (Obese)",
            "Normal Range": "18.5–24.9",
          },
          {
            Parameter: "Malaria Parasite Test",
            Result: "Positive (+)",
            "Normal Range": "Negative",
          },
        ],
      },
    },
    {
      id: 2004,
      title_3: "Lifestyle and Preventive Advice",
      header_1: "Health Maintenance Tips",
      paragraph_12:
        "Patient is advised to adopt sustainable lifestyle changes to prevent complications associated with chronic diseases and infections.",
      list_2: {
        id: 4,
        type: "ul",
        values: [
          "Reduce salt intake and avoid processed foods.",
          "Engage in moderate physical exercise 5 days a week.",
          "Drink at least 2 liters of water daily.",
          "Avoid alcohol and tobacco use.",
          "Perform routine medical checkups every 3–6 months.",
        ],
      },
    },
  ],
};

export default function GuidePage() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">

      <div>
        <h2 className="text-xl font-semibold mb-2 text-green-600">Example JSON</h2>
        <pre className="bg-gray-900 text-green-200 p-4 rounded-lg overflow-x-auto text-sm">
          {JSON.stringify(exampleData, null, 2)}
        </pre>
      </div>

    </div>
  );
}
