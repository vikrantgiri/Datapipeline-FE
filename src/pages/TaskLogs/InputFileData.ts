export interface InputFileLog {
  key: string
  taskLogs: string
  status: string
  createdAt: string
  createdBy: string
  updatedAt: string
}

export const InputFileLogData: InputFileLog[] = [
  {
    key: '1',
    taskLogs: `Task #3 - TRIGGER (COMPLETED)
  [2025-04-17 12:08:27] Task started
  [2025-04-17 12:08:27] Connecting to Snowflake
  [2025-04-17 12:08:27] Using sql_script field for SQL query
  [2025-04-17 12:08:27] SQL query: SELECT ...
  [2025-04-17 12:08:43] Query returned 317793 rows
  [2025-04-17 12:08:43] Warning: PROPERTY_ID column not found
  [2025-04-17 12:08:49] Processing complete: 317793 rows written
  [2025-04-17 12:09:08] File successfully sent via SFTP`,
    status: 'Completed',
    createdAt: 'April 17, 2025, 8:08 a.m.',
    createdBy: 'admin',
    updatedAt: 'April 17, 2025, 10:15 a.m.',
  },
]
