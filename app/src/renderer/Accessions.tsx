import { useEffect, useState, useRef } from "react";
import { FileUploader } from "react-drag-drop-files";
import AccessionRowAdder from "./AccessionRowAdder";
import * as XLSX from "xlsx";

const ipcRenderer = window.electron.ipcRenderer;

// const getAccession = window.electron.electric.getAccession;
const getAccessionFiles = window.electron.electric.getAccessionFiles;
const createAccession = window.electron.electric.createAccession;
const createPlantAccessionMap = window.electron.electric.createPlantAccessionMap;
const getAccessionFileContent = window.electron.electric.getAccessionListWithFileId;
const updateAccessionFile = window.electron.electric.updateAccessionFile;

type AccessionWithExperiments = {
    id: string;
    name: string;
    createdAt: string;
    experiments: {
        name: string;
    }[];
};

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
    const [accession_list, setAccessionList] = useState<AccessionWithExperiments[] | null>(null);
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
    const [message, setMessage] = useState<string | null>(null);
    const [expandedAccessionIds, setExpandedAccessionIds] = useState<Set<string>>(new Set());
    const [accessionPreview, setAccessionPreview] = useState<Record<string, string | null>[]>([]);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const [editingRowId, setEditingRowId] = useState<string | null>(null);
    const [editingField, setEditingField] = useState<'id'|null>(null);
    const [editingValue, setEditingValue] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const workbookRef = useRef<XLSX.WorkBook | null>(null);

    const MAX_FILE_SIZE = 15.5 * 1024 * 1024;

    const isDisabled = !selectedPlantId || !selectedGenotypeId;
    const tableRef = useRef(null);

    const fetchFiles = async () => {
        const files = await getAccessionFiles();
        setAccessionList(files);
    };

    const saveInlineEdit = async () => {
        if (!editingRowId || !editingField) return;

        await updateAccessionFile(editingField,editingRowId, editingValue);

        setAccessionPreview(prev =>
          prev.map((row) =>
            row.id === editingRowId
              ? { ...row, [editingField]: editingValue }
              : row
          )
        );
      
        setEditingRowId(null);
        setEditingField(null);
        setEditingValue('');
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    // useEffect(() => {
    //     if (selectedPlantId && selectedGenotypeId && tableRef.current) {
    //         tableRef.current.scrollTop = 0;
    //         tableRef.current.scrollLeft = 0;
    //     }
    // }, [selectedPlantId, selectedGenotypeId]);

    const handleChange = (file: File | null): void => {
        setErrorMessage(null);
        setSheetNames([]);
        setColumns([]);
        setData([]);

        if (!file) return;

        if (file.size >= MAX_FILE_SIZE) {
            setErrorMessage("File size exceeds 15MB. Please re-upload as two smaller files and attach both to the experiment.");
            return;
        }

        setLoading(true);
        setUploadedFile(file); 
        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = (e) => {
            console.log("On Drag Drop File Change");
            const ab = e.target?.result as ArrayBuffer;
            const workbook = XLSX.read(ab, { type: "array" });

            workbookRef.current = workbook;
            setSheetNames(workbook.SheetNames);

            const defaultSheet = workbook.SheetNames[0];
            const ws = workbook.Sheets[defaultSheet];
            const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });

            setSelectedSheet(defaultSheet);
            setColumns(jsonData[0] as string[]);
            setData(jsonData.slice(1, 21).map((row:any[])=> row.map((cell) => String(cell))));
            setLoading(false);

        };
        reader.readAsArrayBuffer(file);
    };

    const handleUpload = async () => {
        if (!selectedPlantId || !selectedGenotypeId || !workbookRef.current || !selectedSheet) return;
        setUploading(true);
        setMessage("Uploading...");

        try {
            let res = await createAccession(file_name);
            if (!res.file_id) {
                throw new Error("No file ID returned from createAccession.");
            }
            let file_id = res.file_id;
            const sheet = workbookRef.current.Sheets[selectedSheet];
            const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            const headers = rows[0] as string[];
            const plantIdx = headers.indexOf(selectedPlantId);
            const genotypeIdx = headers.indexOf(selectedGenotypeId);

            for (let i = 1; i < rows.length; i++) {
                const row = rows[i];
                const plant_barcode = String((row as any[])[plantIdx]);
                const accession_id = String((row as any[])[genotypeIdx]);

                if (plant_barcode && accession_id) {
                    console.log(`Uploading row ${i}: Plant Barcode: ${plant_barcode}, Accession ID: ${accession_id}`);
                    try {

                    await createPlantAccessionMap(accession_id, plant_barcode, file_id);
                    } catch (err) {
                    console.error("Error uploading accession entry (row " + i + "):", err);
                    }
                }
                if (i % 100 === 0) {
                    await new Promise((r) => setTimeout(r, 0));
                }
            }

            // for (const row of data) {
            //     console.log("Uploading accession : ", row);
            //     const plant_barcode = row[columns.indexOf(selectedPlantId)];
            //     const accession_id = row[columns.indexOf(selectedGenotypeId)];

            //     if (plant_barcode && accession_id) {
            //         try {
            //             await createPlantAccessionMap(accession_id, plant_barcode, file_id);
            //         } catch (err) {
            //             console.error("Error uploading accession entry:", err);
            //         }
            //     }
            // }
            setMessage(" Done uploading!");
        } catch (err) {
            console.error("Error uploading accession entry:", err);
            setMessage("Upload failed.");
        }
        finally {
            fetchFiles();
            setMessage("Done uploading!");
        }
    }

    const handleSheetChange = async (sheetName: string) => {
        setSelectedSheet(sheetName);
        setLoading(true);
        const reader = new FileReader();
        reader.onload = (event) => {
            const ab = event.target?.result as ArrayBuffer;
            const workbook = XLSX.read(ab, { type: "array" });
            const ws = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(ws, {
            header: 1,
            range: "A1:Z30" 
            });
            // const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });

            setColumns(jsonData[0] as string[]);
            setData(jsonData.slice(1));
            setLoading(false);
        };
        reader.readAsArrayBuffer(uploadedFile);
        
    };

    const handlePlantId = async (plantId: string) => {
        setSelectPlantID(plantId);
    }

    const handleGenotypeId = async (GenotypeId: string) => {
        setSelectGenotypeId(GenotypeId);
    }

    const toggleExpand = (id: string) => {
        console.log("Open Preview for accession ID:", id);
        getAccessionFileContent(id).then((preview) => {
            console.log("Accession preview data:", preview);
            setAccessionPreview(preview);
        });
        
        setExpandedAccessionIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) newSet.delete(id);
            else newSet.add(id);
            return newSet;
        });
    };

    return (
        <div className="p-4 min-h-screen bg-gray-100 ">
            <div className="text-xs font-bold">Accession Files:</div>

            <ul className="max-h-96 overflow-scroll border rounded-md p-2 mb-8 text-sm">
                {accession_list &&
                    accession_list.map((accession) => (
                        <li
                            key={accession.id}
                            className="bg-gray-100 p-2 rounded-md mb-2 shadow-sm cursor-pointer"
                            onClick={() => toggleExpand(accession.id)}
                        >
                            <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 transition-transform duration-200 ${
                                    expandedAccessionIds.has(accession.id) ? "rotate-180" : ""
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                                </svg>
                                <span className="font-semibold">{accession.name}</span>
                            </div>

                            <div className="flex items-center gap-4">
                               <AccessionRowAdder file_id = {accession.id} toggleExpand={toggleExpand}/>
                               <span className="text-xs text-gray-500">
                                   {new Date(accession.createdAt).toLocaleDateString()}
                               </span>
                           </div>

                            {/* <span className="text-xs text-gray-500">
                                {new Date(accession.createdAt).toLocaleDateString()}
                            </span> */}
                            </div>

                            <div className="text-xs text-gray-600">ID: {accession.id}</div>

                            {expandedAccessionIds.has(accession.id) && (
                                <div
                                    className="mt-2 text-sm bg-white border rounded p-2"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="font-semibold mb-1">Linked Experiments:</div>

                                    {accession.experiments.length > 0 ? (
                                    <ul className="list-disc list-inside">
                                        {accession.experiments.map((exp, i) => (
                                        <li key={i}>{exp.name}</li>
                                        ))}
                                    </ul>
                                    ) : (
                                    <div className="italic text-gray-400">No experiments linked</div>
                                    )}

                                    <table className="mt-4 text-xs w-full border">
                                    <thead className="bg-gray-100">
                                    {accessionPreview.length > 0 && (
                                    <tr>
                                        {Object.keys(accessionPreview[0]).map((key) => (
                                        <th key={key} className="p-2 text-left border-b capitalize">
                                            {key.replace(/_/g, " ")}
                                        </th>
                                        ))}
                                    </tr>
                                    )}
                                    </thead>
                                    <tbody>
                                        { accessionPreview && accessionPreview.map((row) => (
                                        <tr key={row.id}>
                                            {Object.entries(row).map(([key, value]) => {
                                            const isEditable = key === "accession_id";
                                            const isEditing = editingRowId === row.id && editingField === key;

                                            return (
                                                <td
                                                key={key}
                                                className="p-2 border text-xs cursor-pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (isEditable) {
                                                    setEditingRowId(row.id);
                                                    setEditingField(key as 'id');
                                                    setEditingValue(value as string);
                                                    }
                                                }}
                                                >
                                                {isEditing ? (
                                                    <input
                                                    className="border p-1 rounded w-full"
                                                    value={editingValue}
                                                    onChange={(e) => setEditingValue(e.target.value)}
                                                    onBlur={saveInlineEdit}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') saveInlineEdit();
                                                        if (e.key === 'Escape') setEditingRowId(null);
                                                    }}
                                                    autoFocus
                                                    />
                                                ) : (
                                                    value ?? 'N/A'
                                                )}
                                                </td>
                                            );
                                            })}
                                        </tr>
                                        ))}
                                    </tbody>
                                    </table>
                                </div>
                                )}
                        </li>
                    ))}
            </ul>


            {/* upload new accession file */}
            <div className="text-xs font-bold">Upload New Accession File</div>
            <div className="border rounded text-lg p-2 w mb-8" >

                <div className="block text-xs font-bold text-gray-700 text-left mt-1 p-1">
                    Plant ID ↔ Genotype ID Mapping
                    <FieldInfo info="Upload an Excel file mapping Plant ID to Genotype ID. Max size: 15MB. If exceeded, split and re-upload as two files." />
                </div>

                <div className="mt-1">
                    <div className="p-1 border rounded-md border-amber-300">
                        <FileUploader
                            handleChange={handleChange}
                            name="file"
                            types={fileTypes}
                            label="Drag and drop your file here (Max: 15MB)"
                        />
                    </div>
                </div>

                {errorMessage && (
                    <div className="mt-2 text-red-500 text-sm">
                        {errorMessage}
                    </div>
                )}

            </div>

            <div className="block text-xs font-bold text-gray-700 text-left mt-1 p-1">
                Preview File
                <FieldInfo info="Preview uploaded file and assign the genotypeId and plantID(QRcode/barcode) coumns from you excel file" />
            </div>
            <div className="border rounded text-lg p-2 mb-8 mr-4" >
                {loading && (
                <div className="flex justify-center items-center py-4">
                    <svg className="animate-spin h-5 w-5 text-gray-600" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span className="ml-2 text-sm text-gray-600">Loading file...</span>
                </div>
                )}

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