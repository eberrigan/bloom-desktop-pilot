import React, { useCallback, useEffect, useState } from "react";
import { Electric_cyl_experiments } from "../generated/client";

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
const createExperiment = window.electron.electric.createExperiment;

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
    Electric_cyl_experiments[] | null
  >(null);
  const [newExperimentName, setNewExperimentName] = useState<string>("");
  const [newExperimentSpecies, setNewExperimentSpecies] = useState<string>(
    species[0]
  );

  useEffect(() => {
    getExperiments()
      .then((response) => {
        const experiments = response as Electric_cyl_experiments[];
        setExperiments(experiments);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="text-lg">
      <div className="text-xs font-bold">Experiments</div>
      <ul className="h-32 overflow-scroll border rounded-md p-2 w-96 mb-8">
        {experiments &&
          experiments.map((experiment) => (
            <li key={experiment.id}>
              {experiment.name} ({experiment.species})
            </li>
          ))}
      </ul>
      <div>
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
        <button
          className={
            "block p-2 rounded-md bg-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 mt-4 focus:outline-none border border-gray-300"
          }
          onClick={() => {
            createExperiment(newExperimentName, newExperimentSpecies)
              .then(() => {
                return getExperiments();
              })
              .then((response) => {
                const experiments = response as Electric_cyl_experiments[];
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
  );
}
