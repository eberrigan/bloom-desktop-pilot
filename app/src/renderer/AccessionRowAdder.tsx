import { useState } from "react";
// import FieldInfo from "./FieldInfo";


const getAccession = window.electron.electric.getAccession;
const createPlantAccessionMap = window.electron.electric.createPlantAccessionMap;


interface AccessionRowAdderProps {
 file_id: string;
 toggleExpand: (id: string) => void;
}


export default function AccessionRowAdder({file_id, toggleExpand}: AccessionRowAdderProps) {
 const [active, setActive] = useState(false);
 const [accessionId, setAccessionId] = useState("");
 const [plantQr, setPlantQr] = useState("");


 const handleSubmit = () => {


   if (!accessionId.trim() || !plantQr.trim()) {
   alert("Please provide valid Accession ID and Plant QR Code.");
   return;
   }


   createPlantAccessionMap(
         accessionId,
         plantQr,
         file_id
       ).then(() => {
         toggleExpand(file_id);
         setAccessionId("");
         setPlantQr("");
         setActive(false);
       }).catch((error) => {
         console.error("Error creating plant accession map:", error);
       });
 };


 return (
   <>
   <div className="relative">
     <button
       onClick={(e) => {
         e.stopPropagation();
         setActive(!active);
       }}
       className="text-xs text-blue-600 border border-blue-500 px-1.5 py-0.5 rounded hover:bg-blue-50 cursor-pointer"
     >
       + Add Row
     </button>


     {active && (
       <div className="absolute right-full translate-x-[-180px] mt-2 left-0 z-10 bg-white border rounded shadow-lg p-3 w-64 space-y-2">
         <p className="text-sm text-gray-600 text-center">
           Add a new <strong>Accession ID</strong> and <strong>Plant QR Code</strong> to the existing accession file.
         </p>


         <input
           type="text"
           placeholder="Accession ID"
           value={accessionId}
           onChange={(e) => setAccessionId(e.target.value)}
           className="w-full border px-2 py-1 rounded text-sm"
         />
         <input
           type="text"
           placeholder="Plant QR Code"
           value={plantQr}
           onChange={(e) => setPlantQr(e.target.value)}
           className="w-full border px-2 py-1 rounded text-sm"
         />
         <div className="flex justify-end space-x-2">
           <button
             onClick={() => setActive(false)}
             className="text-sm text-gray-600 hover:text-black"
           >
             Cancel
           </button>
           <button
             onClick={handleSubmit}
             className="text-sm bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
           >
             Add
           </button>
         </div>
       </div>
     )}
   </div>
   </>
 );
