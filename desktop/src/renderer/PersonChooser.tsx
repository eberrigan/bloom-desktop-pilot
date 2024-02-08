import { useEffect, useState } from 'react';

import { Database } from '../types/database.types';

const ipcRenderer = window.electron.ipcRenderer;

type Person = Database['public']['Tables']['people']['Row'];

const getPeople = window.electron.bloom.getPeople;
const getPersonId = window.electron.scanner.getPersonId;
const setPersonId = window.electron.scanner.setPersonId;

export function PersonChooser({
  personIdChanged,
}: {
  personIdChanged: (personId: number | null) => void;
}) {
  const [selectedPersonId, setSelectedPersonId] = useState<number | null>(null);
  const [personOptions, setPersonOptions] = useState<Person[]>([]);
  const [displayIdleMessage, setDisplayIdleMessage] = useState<boolean>(false);

  // Show a message when the scanner is idle
  const showIdleMessage = () => {
    setDisplayIdleMessage(true);
    setTimeout(() => {
      setDisplayIdleMessage(false);
    }, 3000);
  };

  const setAllPersonIds = (personId: number | null) => {
    personIdChanged(personId);
    setSelectedPersonId(personId);
    setPersonId(personId);
  };

  useEffect(() => {
    return ipcRenderer.on('main:idle', () => {
      console.log('received main:idle');
      personIdChanged(null);
      setSelectedPersonId(null);
      setPersonId(null);
      showIdleMessage();
    });
  }, []);

  useEffect(() => {
    getPeople().then((response) => {
      const people = response as Person[];
      setPersonOptions(people);
    });
  }, []);

  useEffect(() => {
    getPersonId().then((response: number) => {
      const personId = response as number;
      setSelectedPersonId(personId);
      personIdChanged(personId);
    });
  }, []);

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const personId = parseInt(event.target.value, 10) || null;
    personIdChanged(personId);
    setSelectedPersonId(personId);
    setPersonId(personId);
    setDisplayIdleMessage(false);
  };

  return (
    <div>
      <div className="flex flex-row items-center">
        <select
          value={selectedPersonId || ''}
          onChange={onChange}
          className="rounded-md border border-gray-300 px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <option value="">Choose a person</option>
          {personOptions.map((person) => (
            <option key={person.id} value={person.id}>
              {person.name}
            </option>
          ))}
        </select>
        {selectedPersonId !== null ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer ml-2"
            onClick={() => setAllPersonIds(null)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        ) : null}
      </div>
      {displayIdleMessage ? (
        <div className="text-xs text-yellow-600">
          Scanner is idle, resetting person.
        </div>
      ) : null}
    </div>
  );
}
