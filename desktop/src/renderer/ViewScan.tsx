import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const getScanWithEmail = window.electron.scanStore.getScanWithEmail;

export function ViewScan() {
  const params = useParams();
  const scanId = params.scanId;

  const [scan, setScan] = useState<ScanWithEmail | null>(null);

  useEffect(() => {
    if (!scanId) return;
    getScanWithEmail(scanId).then((response: ScanWithEmail) =>
      setScan(response),
    );
  }, [scanId]);

  return (
    <div>
      <Link to="/browse-scans" className="text-lime-700 hover:underline">
        &larr; All scans
      </Link>
      <div className="text-xs mt-2 font-bold">Plant QR Code</div>
      <div>{scan?.metadata.plantQrCode}</div>
      <div className="text-xs mt-2 font-bold">Date</div>
      <div>{scan && formatDateString(scan?.metadata.date)}</div>
      <div className="text-xs mt-2 font-bold">Person</div>
      <div>{scan?.metadata.personEmail}</div>
      <div className="text-xs mt-2 font-bold">Scan ID</div>
      <div>{scanId}</div>
      <img
        src={'file://' + scan?.images[0]}
        style={{ width: '500px' }}
        className="rounded-md mt-2"
      />
    </div>
  );
}

function formatDateString(dateString: string) {
  // Parse the date string into a Date object
  const date = new Date(dateString);

  // Options to configure the output format
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };

  // Use Intl.DateTimeFormat to format the date according to the options
  return new Intl.DateTimeFormat('en-US', options).format(date);
}
