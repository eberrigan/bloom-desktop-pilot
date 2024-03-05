import { useEffect, useState } from "react";

const getStatus = window.electron.electric.getStatus;

type ElectricStatus = {
  acquiringJWT: boolean;
  connectingToElectric: boolean;
  jwt: string;
  electricIsNull: boolean;
  electricIsConnected: boolean;
  finishedSyncing: boolean;
};

export function ElectricStatusBadge() {
  const [status, setStatus] = useState<ElectricStatus>({
    acquiringJWT: false,
    connectingToElectric: false,
    jwt: "",
    electricIsNull: false,
    electricIsConnected: false,
    finishedSyncing: false,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      getStatus().then((response) => {
        setStatus(response);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-stone-400">
      {/* {status.acquiringJWT ? "Acquiring JWT" : ""} */}
      {/* {status.connectingToElectric ? "Connecting to Electric" : ""} */}
      {/* {status.jwt ? `JWT: ${status.jwt.slice(0, 10)}` : ""} */}
      {/* {status.electricIsNull ? "Electric is null" : ""} */}
      {status.electricIsConnected ? (
        <div className="text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="inline w-4 h-4 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
            />
          </svg>
          Connected
        </div>
      ) : (
        <div className="text-sm">Disconnected</div>
      )}
      {status.finishedSyncing ? (
        <div className="text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="inline w-4 h-4 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
          Data retrieved
        </div>
      ) : (
        <div className="text-sm">Not synced</div>
      )}
    </div>
  );
}
