export interface Credential {
  id: string
  name: string
  third_party: string
  host: string
  db: string
  username: string
  created_at: string
  created_by: string
}

export const credentialsData: Credential[] = [
  {
    id: '1',
    name: 'aws',
    third_party: 'Snowflake',
    host: 'aws.snowflake.com',
    db: 'avm_db',
    username: 'admin_aws',
    created_at: '2024-05-22',
    created_by: 'System',
  },
  {
    id: '2',
    name: 'FTP Login',
    third_party: 'TransUnion',
    host: 'ftp.tu.com',
    db: 'trigger_leads',
    username: 'ftp_user',
    created_at: '2024-05-21',
    created_by: 'Admin',
  },
]
