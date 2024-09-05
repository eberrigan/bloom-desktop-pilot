import { useEffect, useState } from "react";

const ipcRenderer = window.electron.ipcRenderer;

const getScientists = window.electron.electric.getScientists;
const createScientist = window.electron.electric.createScientist;

export function Scientists() {
  const [scientists, setScientists] = useState<Scientist[] | null>(null);
  const [newScientistName, setNewScientistName] = useState<string>("");
  const [newScientistEmail, setNewScientistEmail] = useState<string>("");

  useEffect(() => {
    getScientists()
      .then((response) => {
        const people = response as Scientist[];
        setScientists(people);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    // Get the list of people from the database every 10 seconds
    const interval = setInterval(() => {
      getScientists()
        .then((response) => {
          const people = response as Scientist[];
          setScientists(people);
        })
        .catch((err) => {
          console.error(err);
        });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="text-xs font-bold">Scientists</div>
      <ul className="h-32 overflow-scroll border rounded-md p-2 w-96 mb-8 text-sm">
        {scientists &&
          scientists.map((scientist) => (
            <li key={scientist.id}>
              {scientist.name} ({scientist.email})
            </li>
          ))}
      </ul>
      <div>
        <div className="text-xs font-bold">Name</div>
        <input
          type="text"
          value={newScientistName}
          className="p-2 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 mt-1 focus:outline-none w-[200px] border border-gray-300"
          onChange={(e) => setNewScientistName(e.target.value)}
        />
        <div className="text-xs font-bold mt-2">Email</div>
        <input
          type="email"
          className="p-2 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 mt-1 focus:outline-none w-[200px] border border-gray-300"
          value={newScientistEmail}
          onChange={(e) => setNewScientistEmail(e.target.value)}
        />
        <button
          className="block p-2 rounded-md bg-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 mt-4 focus:outline-none border border-gray-300"
          onClick={() => {
            if (!newScientistName || !newScientistEmail) {
              return;
            }
            createScientist(newScientistName, newScientistEmail)
              .then(() => {
                getScientists()
                  .then((response) => {
                    const people = response as Scientist[];
                    setScientists(people);
                    setNewScientistName("");
                    setNewScientistEmail("");
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
          Add new scientist
        </button>
      </div>
    </div>
  );
}
