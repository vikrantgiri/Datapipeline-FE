export interface FileDownloadLog {
  key: string
  taskLogs: string
  status: string
  createdAt: string
  createdBy: string
  updatedAt: string
}

export const FileDownloadLogData: FileDownloadLog[] = [
  {
    key: '1',
    taskLogs:
      'File Download #65 - admin (FAILED)\n[2025-05-02 10:01:53] No files downloaded',
    status: 'Failed',
    createdAt: 'May 2, 2025, 6:01 a.m.',
    createdBy: 'admin',
    updatedAt: 'May 3, 2025, 1:51 a.m.',
  },
  {
    key: '2',
    taskLogs:
      'File Download #70 - admin (FAILED)\n[2025-05-03 05:50:51] No files downloaded',
    status: 'Failed',
    createdAt: 'May 3, 2025, 1:50 a.m.',
    createdBy: 'admin',
    updatedAt: 'May 3, 2025, 1:51 a.m.',
  },
]
