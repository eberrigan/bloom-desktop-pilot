import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Outlet,
} from 'react-router-dom';
import logo from './logo.png';

const links = [
  {
    to: '/',
    label: 'Capture scan',
  },
  {
    to: '/browse-scans',
    label: 'Browse scans',
  },
];

const getScannerId = window.electron.scanner.getScannerId;

export function Layout() {
  const [scannerId, setScannerId] = useState<string | null>(null);

  useEffect(() => {
    getScannerId().then((id) => {
      setScannerId(id);
    });
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-stone-100">
      <div className="absolute left-12 top-8 align-middle">
        <img src={logo} className="h-12 inline" />
      </div>
      <div className="absolute right-12 top-8">
        <div className="flex flex-col">
          <span className="text-xs font-bold">Cyth Scanner</span>
          <span>{scannerId === null ? '...' : `${scannerId}`}</span>
        </div>
      </div>
      <div className="mt-20 flex flex-col">
        <div className="flex flex-row">
          <div className="ml-12 mt-6 w-48 select-none">
            <ul>
              {links.map((link) => (
                <li className="p-4 mb-2" key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive, isPending }) => {
                      return (
                        'p-4 rounded-md text-gray-600 hover:text-gray-900 ' +
                        (isActive ? 'bg-stone-200' : isPending ? 'pending' : '')
                      );
                    }}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 ml-6 flex-grow">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
}
