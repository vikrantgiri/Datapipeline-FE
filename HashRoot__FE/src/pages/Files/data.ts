

export interface FileData {
  key: string;
  file: string;
  type: string;
  status: string;
  uploadedAt: string;
  uploadedBy: string;
  download?: string; 
}

export const mockFilesData: FileData[] = [
  {
    key: "1",
    file: "filepath",
    type: "Unspecified",
    status: "Processed",
    uploadedAt: "2024-05-22",
    uploadedBy: "System",
    download: "Download Link",
  },
  {
    key: "2",
    file: "filepath",
    type: "Unspecified",
    status: "Processed",
    uploadedAt: "2024-05-21",
    uploadedBy: "Admin",
    download: "Download Link",
  },
];
