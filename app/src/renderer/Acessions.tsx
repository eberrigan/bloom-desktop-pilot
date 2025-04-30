import { useEffect, useState, useRef } from "react";
import { FileUploader } from "react-drag-drop-files";
import * as XLSX from "xlsx";

const ipcRenderer = window.electron.ipcRenderer;

const getAccession = window.electron.electric.getAccession;
const getAccessionFiles = window.electron.electric.getAccessionFiles;
const createAccession = window.electron.electric.createAccession;
const createPlantAccessionMap = window.electron.electric.createPlantAccessionMap;

function FieldInfo({ info }: { info: string }) {
    return (
        <div className="-mt-1 ml-2 inline-block group relative">
            <div className="absolute bg-white border border-gray-300 p-2 rounded-md text-xs w-48 mt-1 font-normal hidden group-hover:block z-10 left-8">
                {info}
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 inline-block z-0"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                />
            </svg>
        </div>
    );
}

export function Accessions() {
    const [accession_list, setAccessionList] = useState<{ id: string; name: string }[] | null>(null);
    const fileTypes = ["XLSX", "XLS"];
    const [file_name, setFileName] = useState<string>('undefined');
    const [sheetNames, setSheetNames] = useState<string[]>([]);
    const [selectedSheet, setSelectedSheet] = useState<string | null>(null);
    const [columns, setColumns] = useState<string[]>([]);
    const [data, setData] = useState<any[]>([]);
    const [selectedPlantId, setSelectPlantID] = useState<string | null>(null);
    const [selectedGenotypeId, setSelectGenotypeId] = useState<string | null>(null);
    const plantIdIndex = columns.indexOf(selectedPlantId ?? "");
    const genotypeIdIndex = columns.indexOf(selectedGenotypeId ?? "");
    const [hoveredColIndex, setHoveredColIndex] = useState<number | null>(null);
    const [isUploading, setUploading] = useState(false);
    const [message, setMessage] = useState<string>(null);
    const isDisabled = !selectedPlantId || !selectedGenotypeId;
    const tableRef = useRef(null);

    const fetchFiles = async () => {
        const files = await getAccessionFiles();
        console.log(files);
        console.log("LOADED FILES");
        setAccessionList(files); 
    };

    useEffect(() => {      
        fetchFiles();
        console.log("LITS OF ACCESSIONS");
        console.log(accession_list);

    }, []);

    useEffect(() => {
        if (selectedPlantId && selectedGenotypeId && tableRef.current) {
            tableRef.current.scrollTop = 0;
            tableRef.current.scrollLeft = 0;
        }
    }, [selectedPlantId, selectedGenotypeId]);

    const handleChange = (file: File | null): void => {
        //TODO : handle file upload error
        if (!file) return;

        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = (e) => {
            const ab = e.target?.result as ArrayBuffer;
            const workbook = XLSX.read(ab, { type: "array" });

            setSheetNames(workbook.SheetNames);

            const defaultSheet = workbook.SheetNames[0];
            const ws = workbook.Sheets[defaultSheet];
            const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });

            setSelectedSheet(defaultSheet);
            setColumns(jsonData[0] as string[]);
            setData(jsonData.slice(1));
        };
        reader.readAsArrayBuffer(file);

    };

    const handleUpload = async () => {
        if (!selectedPlantId || !selectedGenotypeId) return;
        setUploading(true);
        setMessage("Uploading...");
        console.log("RUN")

        try {

            console.log("Creating file")
            let res = await createAccession(file_name+"_"+sheetNames);
            if (!res.file_id) {
                throw new Error("No file ID returned from createAccession.");
            }
            let file_id = res.file_id;
            console.log("Created file", file_id);

            console.log("uploading data")
            console.log(data);

            for (const row of data) {
                console.log("Uploading accession : ", row);
                const plant_barcode = row[columns.indexOf(selectedPlantId)];
                const accession_id = row[columns.indexOf(selectedGenotypeId)];

                if (plant_barcode && accession_id) {
                    try {
                        await createPlantAccessionMap(accession_id, plant_barcode,file_id); 
                    } catch (err) {
                        console.error("Error uploading accession entry:", err);
                    }
                }
            }
            setMessage(" Done uploading!");
        } catch (err) {
            console.error("Error uploading accession entry:", err);
            setMessage("Upload failed.");
        }
        finally{
            fetchFiles();
            console.log("Done uploading accession");
            setMessage("Done uploading!");
        }

    }

    const handleSheetChange = async (sheetName: string) => {
        setSelectedSheet(sheetName);
        const file = (document.querySelector('input[type="file"]') as HTMLInputElement)?.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const ab = event.target?.result as ArrayBuffer;
            const workbook = XLSX.read(ab, { type: "array" });
            const ws = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });

            setColumns(jsonData[0] as string[]);
            setData(jsonData.slice(1));
        };
        reader.readAsArrayBuffer(file);
    };

    const handlePlantId = async (plantId: string) => {
        setSelectPlantID(plantId);
    }

    const handleGenotypeId = async (GenotypeId: string) => {
        setSelectGenotypeId(GenotypeId);
    }

    return (
        <div className="p-4">
            {/* List of all the uploaded accession files */}
            <div className="text-xs font-bold">Accession Files:</div> 
            
            {/* {accession_list} */}
            <ul className="h-32 overflow-scroll border rounded-md p-2 w mb-8 text-sm">
            {accession_list &&
                accession_list.map((accession_file, index) => (
                <li
                    key={accession_file.id}
                    className="bg-gray-100 p-2 rounded-md mb-2 shadow-sm"
                >
                    {accession_file.name} (ID: {accession_file.id})
                  </li>
                ))}
            </ul>

            {/* upload new accession file */}
            <div className="text-xs font-bold">Upload new Accession File</div>
            <div className="border rounded text-lg p-2 w mb-8" >

                <div className="block text-xs font-bold text-gray-700 text-left mt-1 p-1">
                    Plant ID ↔ Genotype ID Mapping
                    <FieldInfo info="Upload an excel file containing Plant ID to Genotype ID mapping" />
                </div>

                <div className="mt-1">
                    <div className="p-1 border rounded-md border-amber-300">
                        <FileUploader
                            handleChange={handleChange}
                            name="file"
                            types={fileTypes}
                            label="Drag and drop your file here"
                        />
                    </div>
                </div>

            </div>

            <div className="block text-xs font-bold text-gray-700 text-left mt-1 p-1">
                Preview File
                <FieldInfo info="Preview uploaded file and assign the genotypeId and plantID(QRcode/barcode) coumns from you excel file" />
            </div>
            <div className="border rounded text-lg p-2 mb-8 mr-4" >
                {sheetNames.length > 0 && (
                    <>
                        <h2 className="font-bold text-gray-700 text-xs">⚠️ Select the Plant ID and Genotype ID columns from your file.</h2>
                        {/* <h2 className="font-bold text-gray-700 text-xs">⚠️ Note: Once selected and uploaded, the Plant ID and Genotype ID columns <strong>cannot</strong> be changed.</h2> */}
                        <div className="mt-4 flex items-center gap-2">

                            <div className="mt-4 flex items-center gap-2">
                                <h2 className="font-bold text-gray-700 text-xs">Select Sheet:</h2>
                                <select
                                    value={selectedSheet ?? ""}
                                    onChange={(e) => {
                                        handleSheetChange(e.target.value);
                                    }}
                                >
                                    {sheetNames.map((sheet) => (
                                        <option key={sheet} value={sheet}>
                                            {sheet}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mt-4 flex items-center gap-2">
                                <h2 className="font-bold text-gray-700 text-xs">Select Plant ID (Barcode) Column:</h2>
                                <select
                                    value={selectedPlantId ?? ""}
                                    onChange={(e) => {
                                        handlePlantId(e.target.value);
                                    }}
                                >
                                    <option value="" disabled>Select...</option>
                                    {columns.map((columnsNames) => (
                                        <option key={columnsNames} value={columnsNames}>
                                            {columnsNames}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mt-4 flex items-center gap-2">
                                <h2 className="font-bold text-gray-700 text-xs">Select Genotype ID Column:</h2>
                                <select
                                    value={selectedGenotypeId ?? ""}
                                    onChange={(e) => {
                                        handleGenotypeId(e.target.value);
                                    }}
                                >
                                    <option value="" disabled>Select...</option>
                                    {columns.map((columnsNames) => (
                                        <option key={columnsNames} value={columnsNames}>
                                            {columnsNames}
                                        </option>
                                    ))}
                                </select>
                            </div>

                        </div>
                    </>
                )}

                {columns.length > 0 && (
                    <div
                        ref={tableRef}
                        className="mt-4 overflow-x-auto h-[200px]">
                        <table className="min-w-full border border-gray-300 h-64">
                            <thead>
                                <tr>
                                    {columns.map((col, idx) => {
                                        const isPlant = col === selectedPlantId;
                                        const isGenotype = col === selectedGenotypeId;

                                        return (
                                            <th
                                                key={idx}
                                                className={`px-4 py-2 border text-sm text-left font-medium
                        ${isPlant ? "bg-green-200" : isGenotype ? "bg-blue-200" : ""}
                        ${hoveredColIndex === idx ? "bg-blue-200" : ""}
                      `}
                                                onMouseEnter={() => setHoveredColIndex(idx)}
                                                onMouseLeave={() => setHoveredColIndex(null)}
                                            >
                                                {col}
                                                {isPlant && <span className="text-xs text-green-700 ml-2">🌱 Plant ID</span>}
                                                {isGenotype && <span className="text-xs text-blue-700 ml-2">🏷️ Genotype ID</span>}
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, rowIndex) => (
                                    <tr key={rowIndex} className="even:bg-gray-50">
                                        {columns.map((_, colIndex) => {
                                            const isPlantIdCol = colIndex === plantIdIndex;
                                            const isGenotypeCol = colIndex === genotypeIdIndex;

                                            return (
                                                <td
                                                    key={colIndex}
                                                    className={`px-4 py-2 border text-sm
                            ${isPlantIdCol ? "bg-green-100" : ""}
                            ${isGenotypeCol ? "bg-blue-100" : ""}
                            ${hoveredColIndex === colIndex ? "bg-blue-200" : ""}
                          `}
                                                >
                                                    {row[colIndex]}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* File Submission Button */}
            <div className="px-1 overflow-x-auto">
                <div className="flex items-center gap-4 mt-2 flex-wrap">
                    <button
                        disabled={isDisabled}
                        className={`p-2 rounded-md text-sm font-medium border focus:outline-none
                        ${isDisabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-50 border-gray-300'}`}
                        onClick={() => {
                            handleUpload();
                        }}
                    >
                        Upload Accession Files
                    </button>
                    {/* <FieldInfo info="First, select the Genotype ID and Barcode columns from the preview. Then, click 'Upload Accession Files' to submit. The button will remain disabled until both columns are selected." /> */}
                </div>

                {/* Upload status message */}
                {message && (
                    <div className="mt-2 ml-1 text-sm italic text-gray-600">
                    {message}
                    </div>
                )}
            </div>

        </div>
    )



}