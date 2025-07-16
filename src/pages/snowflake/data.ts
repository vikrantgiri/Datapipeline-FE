// src/data/snowflakeData.ts

export interface SnowflakeData {
  id: number
  recipient_email: string
  script: string
  schedule: 'Daily' | 'Weekly' | 'Monthly'
}

export const dummySnowflakeData: SnowflakeData[] = [
  {
    id: 1,
    recipient_email: 'john.doe@example.com',
    script:
      "SELECT id, name, email, created_at FROM users WHERE active = true AND last_login > NOW() - INTERVAL '7 days' ORDER BY created_at DESC LIMIT 100;",
    schedule: 'Daily',
  },
  {
    id: 2,
    recipient_email: 'jane.smith@example.com',
    script:
      "DELETE FROM logs WHERE created_at < NOW() - INTERVAL '30 days' AND log_level IN ('DEBUG', 'TRACE');",
    schedule: 'Weekly',
  },
  {
    id: 3,
    recipient_email: 'admin@example.com',
    script:
      "UPDATE stats SET processed = true, updated_at = CURRENT_TIMESTAMP WHERE status = 'pending' AND type = 'monthly-summary' RETURNING *;",
    schedule: 'Monthly',
  },
  {
    id: 4,
    recipient_email: 'ops@example.com',
    script:
      "WITH recent_errors AS (SELECT * FROM error_logs WHERE timestamp > NOW() - INTERVAL '1 day') SELECT COUNT(*) FROM recent_errors WHERE severity = 'high';",
    schedule: 'Daily',
  },
  {
    id: 5,
    recipient_email: 'data.team@example.com',
    script:
      "INSERT INTO archive.orders_archive (SELECT * FROM orders WHERE order_date < NOW() - INTERVAL '1 year');",
    schedule: 'Monthly',
  },
]
