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
const attachExperimentAccession = window.electron.electric.attachAccessionToExperiment;
const getScientists = window.electron.electric.getScientists;
const getAccessionFiles = window.electron.electric.getAccessionFiles;
// const createWaveNumber = window.electron.electric.createWaveNumber;

const species = [
  "Amaranth",
  "Arabidopsis",
  "Canola",
  "Lotus",
  "Maize",
  "Pennycress",
  "Rice",
  "Sorghum",
  "Soybean",
  "Spinach",
  "Sugar_Beet",
  "Tomato",
  "Wheat",
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
  const [existingExperiment, setExistingExperiment] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [createExperimentError, setCreateExperimentError] = useState<string | null>(null);
  // const [experimentWaves, setExperimentWaves] = useState<Record<string, WaveNumber[]>>({});


  useEffect(() => {
    getExperiments()
      .then((response) => {
        const experiments = response as ExperimentWithScientist[];
        setExperiments(experiments);
        // setExistingExperiment(experiments[0]?.id);
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
      // setNewExperimentAccession(accessionFiles[0].id);
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
  
      <ul className="border rounded-md max-w-full mr-10 mb-10 text-sm h-64 overflow-y-auto">
         { experiments && experiments.map((experiment) => (
          <li key={experiment.id} className="mb-2">
            {/* <div className="flex justify-between items-center cursor-pointer" onClick={() => handleToggleWaves(experiment.id)}> */}
            <div className="flex justify-between items-center cursor-pointer">
              <span>
                {experiment.species} - {experiment.name} (
                <i>{experiment.scientist?.name || "unknown"}</i>)
              </span>
              {/* <span className="text-gray-500">▼</span> */}
            </div>
          </li>
        ))}
      </ul>

      <div className="text-xs font-bold">Create New Experiment</div>
      <div className="border rounded text-lg p-2 w-96 mb-8" >
        <div className="text-xs font-bold">Name</div>
        <input
          data-testid="experiment-name-input"
          type="text"
          value={newExperimentName}
          className="p-2 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 mt-1 focus:outline-none w-[200px] border border-gray-300"
          onChange={(e) => setNewExperimentName(e.target.value)}
        />

        <div className="text-xs font-bold mt-2">Species</div>
        <select
          data-testid="experiment-species-select"
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
          data-testid="experiment-scientist-select"
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
        <select
          data-testid="experiment-accession-select"
          className="p-2 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 mt-1 focus:outline-none w-[200px] border border-gray-300"
          value={newExperimentAccession}
          onChange={(e) => {
            console.log("Selected accession ID:", e.target.value);
            setNewExperimentAccession(e.target.value);
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
          data-testid="create-experiment-button"
          className={
            "block p-2 rounded-md bg-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 mt-4 focus:outline-none border border-gray-300"
          }
          onClick={() => {
            console.log(
              `Creating experiment: ${newExperimentName}, ${newExperimentSpecies}, ${newExperimentScientistId}, ${newExperimentAccession}`
            );
            if (!newExperimentName || !newExperimentScientistId || !newExperimentAccession) {
              setCreateExperimentError("Please fill in all required fields.");
              console.error("Missing required fields while creating experiment");
              return;
            }

            createExperiment(
              newExperimentName,
              newExperimentSpecies,
              newExperimentScientistId,
              newExperimentAccession,
            ).then((result) => {
                if (result.error) {
                console.error(result.error);
                setCreateExperimentError("Failed to create experiment.");
                return;
                }
                return getExperiments();
              })
              .then((response) => {
                const experiments = response as ExperimentWithScientist[];
                setExperiments(experiments);
                setCreateExperimentError("Successfully created experiment.");
              })
              .catch((err) => {
                console.error(err);
                setCreateExperimentError("Unexpected error while creating experiment.");
              });
          }}
        >
          Create
        </button>
        </div>
        <div className="mt-2 text-sm text-red-600 text-center" data-testid="experiment-error-msg">{createExperimentError}</div>
      </div>

      <div className="text-xs font-bold">Attach Accession File to Existing Experiment</div>
      <div className="border rounded text-lg p-2 w-96 mb-8" >
        <div className="text-xs font-bold mt-2">Select Experiment:</div>
        <select
          data-testid="select-existing-experiment"
          className="p-2 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 mt-1 focus:outline-none w-[200px] border border-gray-300"
          value={existingExperiment}
          onChange={(e) => {
            console.log("Selected existing experiment ID:", e.target.value);
            setExistingExperiment(e.target.value);
          }}
        >
          {experiments && experiments.length > 0 && experiments.map((a) => (
            <option key={a.id} value={a.id}>
              {a.species} - {a.name} - ({a.scientist?.name || "unknown"})
            </option>
          ))}
        </select>
        <div className="text-xs font-bold mt-2">Select Accession File:</div>
        <select
          data-testid="select-accession-for-existing-experiment"
          className="p-2 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 mt-1 focus:outline-none w-[200px] border border-gray-300"
          value={newExperimentAccession}
          onChange={(e) => {
            console.log("Selected accession ID:", e.target.value);
            setNewExperimentAccession(e.target.value);
          }}
        >
          {accessionList.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name} - {a.id}
            </option>
          ))}
        </select>
        <div className="flex justify-center">
        <button
          className={
            "block p-2 rounded-md bg-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 mt-4 focus:outline-none border border-gray-300"
          }
          onClick={() => {
            console.log(
              `Attaching accession: ${newExperimentAccession} to experiment: ${existingExperiment}`
            );

            if (!existingExperiment || !newExperimentAccession) {
              setErrorMessage("Please make selection for experiment and an accession file.");
              console.error("Missing required fields while attaching accession");
              return;
            }

            setLoading(true);
            setErrorMessage(null);
            
            attachExperimentAccession(existingExperiment, newExperimentAccession)
            .then((result) => {
              if (result.error) {
                console.error(result.error);
                setErrorMessage("Failed to attach accession: " + result.error);
                return;
              }
              setSuccessMessage("Accession successfully attached.");
            })
            .catch((err) => {
              console.error(err);
              setErrorMessage("Unexpected error: " + err.message);
            })
            .finally(() => {
              setLoading(false);
            });
          }}
          >
          Attach Accession
        </button>
        </div>
        <div className="mt-2">
          {loading && (
            <p className="text-sm text-gray-500 animate-pulse">Attaching accession...</p>
          )}
          {errorMessage && (
            <p className="text-sm text-red-600 text-center">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-sm text-green-600 text-center">{successMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}
