
export interface PrepMail {
  key: string;
  id: string;
 
  createdAt: string;
  createdBy: string;
  runTrigger: string;
  downloadResult: string;
}

export const mockPrepMails: PrepMail[] = [
  {
    key: "1",
   id: "39",
   
    createdAt: "2024-05-22",
    createdBy: "System",
    runTrigger: "Run Trigger",
     downloadResult: "Download CSV"
  },
  {
    key: "2",
    id: "38",
  
    createdAt: "2024-05-21",
    createdBy: "Admin",
     runTrigger: "Run Trigger",
      downloadResult: "Download CSV"
  },
];
