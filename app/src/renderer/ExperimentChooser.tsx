import { useEffect, useState } from "react";

const ipcRenderer = window.electron.ipcRenderer;

const getExperiments = window.electron.electric.getExperiments;
const getExperimentId = window.electron.scanner.getExperimentId;
const setExperimentId = window.electron.scanner.setExperimentId;

export function ExperimentChooser({
  experimentIdChanged,
}: {
  experimentIdChanged: (experimentId: string | null) => void;
}) {
  const [selectedExperimentId, setSelectedExperimentId] = useState<
    string | null
  >(null);
  const [experimentOptions, setExperimentOptions] = useState<
    Experiment[] | null
  >(null);
  const [displayIdleMessage, setDisplayIdleMessage] = useState<boolean>(false);

  // Show a message when the scanner is idle
  const showIdleMessage = () => {
    setDisplayIdleMessage(true);
    setTimeout(() => {
      setDisplayIdleMessage(false);
    }, 3000);
  };

  const setAllExperimentIds = (experimentId: string | null) => {
    experimentIdChanged(experimentId);
    setSelectedExperimentId(experimentId);
    setExperimentId(experimentId);
  };

  useEffect(() => {
    return ipcRenderer.on("main:idle", () => {
      console.log("received main:idle");
      experimentIdChanged(null);
      setSelectedExperimentId(null);
      setExperimentId(null);
      showIdleMessage();
    });
  }, []);

  useEffect(() => {
    getExperiments()
      .then((response) => {
        const experiments = response as Experiment[];
        setExperimentOptions(experiments);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    // Get the list of people from the database every 10 seconds
    const interval = setInterval(() => {
      getExperiments()
        .then((response) => {
          const experiments = response as Experiment[];
          setExperimentOptions(experiments);
        })
        .catch((err) => {
          console.error(err);
        });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getExperimentId().then((response: string) => {
      const experimentId = response;
      setSelectedExperimentId(experimentId);
      experimentIdChanged(experimentId);
    });
  }, []);

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const experimentId = event.target.value || null;
    experimentIdChanged(experimentId);
    setSelectedExperimentId(experimentId);
    setExperimentId(experimentId);
    setDisplayIdleMessage(false);
  };

  return (
    <div>
      <div>
        {experimentOptions === null ? (
          <span>Loading experiments...</span>
        ) : (
          <div className="flex flex-row items-center">
            <select
              value={selectedExperimentId || ""}
              onChange={onChange}
              className={
                "rounded-md px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none w-[200px] border border-gray-300"
              }
            >
              <option value="">Choose an experiment</option>
              {experimentOptions.map((experiment) => (
                <option key={experiment.id} value={experiment.id}>
                  {experiment.name}
                </option>
              ))}
            </select>
            {/* {selectedPhenotyperId !== null ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer ml-2"
                onClick={() => setAllPhenotyperIds(null)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : null} */}
          </div>
        )}
      </div>
      {displayIdleMessage ? (
        <div className="text-xs text-yellow-600">
          Scanner is idle, resetting experiment.
        </div>
      ) : null}
    </div>
  );
}
