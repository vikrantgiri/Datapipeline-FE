export interface PrepMailsLog {
  key: string;
  fileName:string;
  taskLogs: string;
  status: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
}

export const PrepMailsLogData: PrepMailsLog[] = [
  {
    key: "1",
    fileName: "file_name",
    taskLogs: `[2025-04-16 21:34:33] 4103 records fetched from database
[2025-04-16 21:34:38] Property values merged with df. Total: 3608 properties
[2025-04-16 21:34:38] Getting property details for 490 LESA properties
[2025-04-16 21:34:41] 3608 records before dropping duplicate propertyid
[2025-04-16 21:34:41] 3017 records after dropping duplicate propertyid
[2025-04-16 21:34:58] 1745 records in results dataframe
[2025-04-16 21:34:58] 1745 records after merge
[2025-04-16 21:34:58] An error occurred during processing: Invalid format string
[2025-04-16 21:34:58] Trigger processing completed.`,
    status: "Completed",
    createdAt: "April 17, 2025, 8:08 a.m.",
    createdBy: "admin",
    updatedAt: "April 17, 2025, 10:15 a.m.",
  },
];
