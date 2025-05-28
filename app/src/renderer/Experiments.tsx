import { Experiment } from "@prisma/client";
import React, { useCallback, useEffect, useState } from "react";
import { set } from "zod";

// UI to control:
// - gain
// - exposure time
// - brightness
// - contrast
// - gamma
// - seconds per rotation
// - number of frames

// with a "save" button to save the settings to the scanner
// and a "reset" button to reset to the previous settings

const getExperiments = window.electron.electric.getExperiments;
const getWaveNumbers = window.electron.electric.getWaveNumbers;
const createExperiment = window.electron.electric.createExperiment;
const getScientists = window.electron.electric.getScientists;
const getAccessionFiles = window.electron.electric.getAccessionFiles;
// const createWaveNumber = window.electron.electric.createWaveNumber;

const species = [
  "Arabidopsis",
  "Rice",
  "Soybean",
  "Sorghum",
  "Pennycress",
  "Canola",
];

export function Experiments() {
  const [experiments, setExperiments] = useState<
    ExperimentWithScientist[] | null
  >(null);
  // const [waveNumbers, setWaveNumbers] = useState<WaveNumber[] | null>(null);
  const [scientists, setScientists] = useState<Scientist[]>([]);
  const [newExperimentName, setNewExperimentName] = useState<string>("");
  const [newExperimentSpecies, setNewExperimentSpecies] = useState<string>(
    species[0]
  );
  const [newExperimentScientistId, setNewExperimentScientistId] =
    useState<string>("");
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment['id'] | null>(
    null
  );
  const [waveNumber, setWaveNumber] = useState<number | null>(NaN);
  const [expandedExperimentId, setExpandedExperimentId] = useState<string | null>(null);
  const [accessionList, setAccessionList] = useState<Accessions[]>([]);
  const [newExperimentAccession, setNewExperimentAccession] = useState<string | null>(null);
  // const [experimentWaves, setExperimentWaves] = useState<Record<string, WaveNumber[]>>({});


  useEffect(() => {
    getExperiments()
      .then((response) => {
        const experiments = response as ExperimentWithScientist[];
        setExperiments(experiments);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    getScientists()
      .then((response) => {
        const scientists = response as Scientist[];
        setScientists(scientists);
        setNewExperimentScientistId(scientists[0].id);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(()=> {
    getAccessionFiles()
    .then((response) => {
      const accessionFiles = response as Accessions[];
      setAccessionList(accessionFiles);
      setNewExperimentAccession(accessionFiles[0].id);
    })
    .catch((err) => {
      console.error(err);
    });
  },[]);

  return (
    <div className="text-lg">
      <div className="text-xs font-bold">Experiments</div>
      {/* <ul className="h-32 overflow-scroll border rounded-md p-2 w-96 mb-8 text-sm">
        {experiments &&
          experiments.map((experiment) => (
            <li key={experiment.id}>
              {experiment.species} - {experiment.name} (
              <i>{experiment.scientist?.name || "unknown"}</i>)
            </li>
          ))}
      </ul> */}
  
      <ul className="border rounded-md p-2 w-96 mb-8 text-sm">
         { experiments && experiments.map((experiment) => (
          <li key={experiment.id} className="mb-2">
            {/* <div className="flex justify-between items-center cursor-pointer" onClick={() => handleToggleWaves(experiment.id)}> */}
            <div className="flex justify-between items-center cursor-pointer">
              <span>
                {experiment.species} - {experiment.name} (
                <i>{experiment.scientist?.name || "unknown"}</i>)
              </span>
              <span className="text-gray-500">▼</span>
            </div>

            {/* {expandedExperimentId === experiment.id && (
              <ul className="ml-4 mt-2 list-disc text-xs text-gray-700">
                {(experimentWaves[experiment.id] || []).map((wave) => (
                  <li key={wave.id}>Wave {wave.number}</li>
                ))}
              </ul>
            )} */}
          </li>
        ))}
      </ul>

      <div className="text-xs font-bold">Create New Experiment</div>
      <div className="border rounded text-lg p-2 w-96 mb-8" >
        <div className="text-xs font-bold">Name</div>
        <input
          type="text"
          value={newExperimentName}
          className="p-2 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 mt-1 focus:outline-none w-[200px] border border-gray-300"
          onChange={(e) => setNewExperimentName(e.target.value)}
        />

        <div className="text-xs font-bold mt-2">Species</div>
        <select
          className="p-2 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 mt-1 focus:outline-none w-[200px] border border-gray-300"
          value={newExperimentSpecies}
          onChange={(e) => setNewExperimentSpecies(e.target.value)}
        >
          {species.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <div className="text-xs font-bold mt-2">Scientist</div>
        <select
          className="p-2 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 mt-1 focus:outline-none w-[200px] border border-gray-300"
          value={newExperimentScientistId}
          onChange={(e) => setNewExperimentScientistId(e.target.value)}
        >
          {scientists.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <div className="text-xs font-bold mt-2">Accession File</div>
        <div className="text-xs font-bold mt-2">Accession File</div>
        <select
          className="p-2 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 mt-1 focus:outline-none w-[200px] border border-gray-300"
          value={newExperimentAccession}
          onChange={(e) => {
            console.log("Selected accession ID:", e.target.value);
            setNewExperimentAccession(e.target.value); // ✅ fixed
          }}
        >
          {accessionList.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name} - {a.id}
            </option>
          ))}
        </select>
        {/* <select
          className="p-2 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 mt-1 focus:outline-none w-[200px] border border-gray-300"
          value={newExperimentAccession}
          onChange={(e) => {
            console.log("Selected accession ID:", e.target.value);
            setNewExperimentAccession(e.target.value)

        }
        >
          {accessionList.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name} - {a.id}
            </option>
          ))}
        </select> */}
        
        <div className="flex justify-center">
        <button
          className={
            "block p-2 rounded-md bg-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 mt-4 focus:outline-none border border-gray-300"
          }
          onClick={() => {
            console.log(
              `Creating experiment: ${newExperimentName}, ${newExperimentSpecies}, ${newExperimentScientistId}, ${newExperimentAccession}`
            );
            createExperiment(
              newExperimentName,
              newExperimentSpecies,
              newExperimentScientistId,
              newExperimentAccession,
            ).then((result) => {
                result.error && console.error(result.error);
                return getExperiments();
              })
              .then((response) => {
                const experiments = response as ExperimentWithScientist[];
                setExperiments(experiments);
              })
              .catch((err) => {
                console.error(err);
              });
          }}
        >
          Create
        </button>
        </div>
      </div>

      {/* <div className="text-xs font-bold">Add New Wave (Existing Experiment)</div> */}
      {/* <div className="border rounded text-lg p-2 w-96 mb-8" >
      <div className="text-xs font-bold mt-2">Experiment</div>
        <select
          className="p-2 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 mt-1 focus:outline-none w-full border border-gray-300"
          value={selectedExperiment || ""}
          onChange={(e) => setSelectedExperiment(e.target.value)}
        >
          {experiments &&
          experiments.map((experiment) => (
            <option key={experiment.id} value={experiment.id}>
            {experiment.species} - {experiment.name} (
             <i>{experiment.scientist?.name || "unknown"}</i>)
            </option>
          ))} 
        </select>
        <div className="text-xs font-bold mt-2">Wave Number</div>
        <input
          type="number"
          className={
            "p-2 rounded-md border bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 w-[200px] focus:outline-none" +
            (waveNumber === null
              ? " border-amber-300"
              : " border-gray-300")
          }
          value={waveNumber}
          onChange={(e) => {
            const value =
              e.target.value === "" ? null : parseInt(e.target.value);
            setWaveNumber(value);
          }}
          min={0}
        />
        <button
          className={
            "block p-2 rounded-md bg-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 mt-4 focus:outline-none border border-gray-300"
          }
          onClick={() => {
            // console.log(
            //   `Creating Wave : ${newExperimentName}, ${newExperimentSpecies}, ${newExperimentScientistId}, ${waveNumber}`
            // );

            console.log("CREATING WAVE", waveNumber);

            const experiment = experiments.find((exp) => exp.id === selectedExperiment);
            console.log("SELECTED EXPERIMENT", experiment);

            if (!experiment) {
              console.error("Experiment not found");
              //TODO : Wave not created
              return;
            }
            
            createWaveNumber(
              waveNumber,
              Number(waveNumber),
              null,
            )
            .then((result) => {
              console.log("Wave created successfully", result);
            })
            .catch((err) => {
              console.error(err);
            });                 
          }}
        >
          Create Wave
        </button>
      </div> */}

    </div>
  );
}
