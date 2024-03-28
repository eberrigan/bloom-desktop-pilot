import { useEffect, useState } from "react";

const ipcRenderer = window.electron.ipcRenderer;

const getPhenotypers = window.electron.electric.getPhenotypers;
const createPhenotyper = window.electron.electric.createPhenotyper;

export function Phenotypers() {
  const [phenotypers, setPhenotypers] = useState<Phenotyper[] | null>(null);
  const [newPhenotyperName, setNewPhenotyperName] = useState<string>("");
  const [newPhenotyperEmail, setNewPhenotyperEmail] = useState<string>("");

  useEffect(() => {
    getPhenotypers()
      .then((response) => {
        const people = response as Phenotyper[];
        setPhenotypers(people);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    // Get the list of people from the database every 10 seconds
    const interval = setInterval(() => {
      getPhenotypers()
        .then((response) => {
          const people = response as Phenotyper[];
          setPhenotypers(people);
        })
        .catch((err) => {
          console.error(err);
        });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="text-xs font-bold">Phenotypers</div>
      <ul className="h-32 overflow-scroll border rounded-md p-2 w-96 mb-8">
        {phenotypers &&
          phenotypers.map((phenotyper) => (
            <li key={phenotyper.id}>
              {phenotyper.name} ({phenotyper.email})
            </li>
          ))}
      </ul>
      <div>
        <div className="text-xs font-bold">Name</div>
        <input
          type="text"
          value={newPhenotyperName}
          className="p-2 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 mt-1 focus:outline-none w-[200px] border border-gray-300"
          onChange={(e) => setNewPhenotyperName(e.target.value)}
        />
        <div className="text-xs font-bold mt-2">Email</div>
        <input
          type="email"
          className="p-2 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 mt-1 focus:outline-none w-[200px] border border-gray-300"
          value={newPhenotyperEmail}
          onChange={(e) => setNewPhenotyperEmail(e.target.value)}
        />
        <button
          className="block p-2 rounded-md bg-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 mt-4 focus:outline-none border border-gray-300"
          onClick={() => {
            if (!newPhenotyperName || !newPhenotyperEmail) {
              return;
            }
            createPhenotyper(newPhenotyperName, newPhenotyperEmail)
              .then(() => {
                getPhenotypers()
                  .then((response) => {
                    const people = response as Phenotyper[];
                    setPhenotypers(people);
                    setNewPhenotyperName("");
                    setNewPhenotyperEmail("");
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              })
              .catch((err: any) => {
                console.error(err);
              });
          }}
        >
          Add new phenotyper
        </button>
      </div>
    </div>
  );
}
