import { useEffect, useState } from "react";

const ipcRenderer = window.electron.ipcRenderer;

const getPeople = window.electron.electric.getPhenotypers;
const getPhenotyperId = window.electron.scanner.getPhenotyperId;
const setPhenotyperId = window.electron.scanner.setPhenotyperId;

export function PersonChooser({
  phenotyperIdChanged,
}: {
  phenotyperIdChanged: (phenotyperId: string | null) => void;
}) {
  const [selectedPhenotyperId, setSelectedPhenotyperId] = useState<
    string | null
  >(null);
  const [phenotyperOptions, setPhenotyperOptions] = useState<
    Phenotyper[] | null
  >(null);
  const [displayIdleMessage, setDisplayIdleMessage] = useState<boolean>(false);

  // Show a message when the scanner is idle
  const showIdleMessage = () => {
    setDisplayIdleMessage(true);
    setTimeout(() => {
      setDisplayIdleMessage(false);
    }, 3000);
  };

  const setAllPhenotyperIds = (phenotyperId: string | null) => {
    phenotyperIdChanged(phenotyperId);
    setSelectedPhenotyperId(phenotyperId);
    setPhenotyperId(phenotyperId);
  };

  useEffect(() => {
    return ipcRenderer.on("main:idle", () => {
      console.log("received main:idle");
      phenotyperIdChanged(null);
      setSelectedPhenotyperId(null);
      setPhenotyperId(null);
      showIdleMessage();
    });
  }, []);

  useEffect(() => {
    getPeople()
      .then((response) => {
        const people = response as Phenotyper[];
        setPhenotyperOptions(people);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    // Get the list of people from the database every 10 seconds
    const interval = setInterval(() => {
      getPeople()
        .then((response) => {
          const people = response as Phenotyper[];
          setPhenotyperOptions(people);
        })
        .catch((err) => {
          console.error(err);
        });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getPhenotyperId().then((response: string) => {
      const phenotyperId = response;
      setSelectedPhenotyperId(phenotyperId);
      phenotyperIdChanged(phenotyperId);
    });
  }, []);

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const phenotyperId = event.target.value || null;
    phenotyperIdChanged(phenotyperId);
    setSelectedPhenotyperId(phenotyperId);
    setPhenotyperId(phenotyperId);
    setDisplayIdleMessage(false);
  };

  return (
    <div>
      <div>
        {phenotyperOptions === null ? (
          <span>Loading phenotypers...</span>
        ) : (
          <div className="flex flex-row items-center">
            <select
              value={selectedPhenotyperId || ""}
              onChange={onChange}
              className={
                "rounded-md px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none w-[200px] border" +
                (selectedPhenotyperId === null
                  ? " border-amber-300"
                  : " border-gray-300")
              }
            >
              <option value="">Choose a phenotyper</option>
              {phenotyperOptions.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.name}
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
          Scanner is idle, resetting person.
        </div>
      ) : null}
    </div>
  );
}
