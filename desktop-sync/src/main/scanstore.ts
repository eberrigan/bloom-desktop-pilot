// import { createBloomRetriever, BloomRetriever } from './bloom';
// import { ElectricStore } from './electricstore';

// class ScanStore {
//   private scans: Scan[] = [];
//   private bloomRetriever: ElectricStore | null = null;

//   addScan = (scan: Scan) => {
//     console.log('ScanStore.addScan() called');
//     this.scans.push(scan);
//   };

//   getScans = () => {
//     return this.scans;
//   };

//   getScansWithEmail = async () => {
//     // get person info from the database
//     const people = await this.bloomRetriever?.getPeople();
//     // join the scan metadata with the person info
//     this.scans = this.scans.map((scan) => {
//       const person = people?.find(
//         (person) => person.id === scan.metadata.phenotyper_id,
//       );
//       return {
//         ...scan,
//         metadata: {
//           ...scan.metadata,
//           personEmail: person?.email || 'unknown',
//         },
//       };
//     });
//     // return the joined table in reverse order
//     return this.scans.slice().reverse();
//   };

//   getScan = (scanId: string) => {
//     return this.scans.find((scan) => scan.metadata.scanId === scanId);
//   };

//   getScanWithEmail = async (scanId: string) => {
//     const scan = this.getScan(scanId);
//     if (scan) {
//       const people = await this.bloomRetriever?.getPeople();
//       const person = people?.find(
//         (person) => person.id === scan.metadata.personId,
//       );
//       return {
//         ...scan,
//         metadata: {
//           ...scan.metadata,
//           personEmail: person?.email || 'unknown',
//         },
//       } as ScanWithEmail;
//     }
//     return scan;
//   };

//   async init() {
//     this.bloomRetriever = await createBloomRetriever();
//   }
// }

// async function createScanStore() {
//   const scanStore = new ScanStore();
//   await scanStore.init();
//   return scanStore;
// }

// export { createScanStore };
