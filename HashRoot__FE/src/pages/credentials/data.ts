// src/pages/Credentials/data.ts

export interface Credential {
  key: string;
  name: string;
  thirdParty: string;
  host: string;
  db: string;
  username: string;
  createdAt: string;
  createdBy: string;
}

export const credentialsData: Credential[] = [
  {
    key: "1",
    name: "AWS Credential",
    thirdParty: "Snowflake",
    host: "aws.snowflake.com",
    db: "avm_db",
    username: "admin_aws",
    createdAt: "2024-05-22",
    createdBy: "System",
  },
  {
    key: "2",
    name: "FTP Login",
    thirdParty: "TransUnion",
    host: "ftp.tu.com",
    db: "trigger_leads",
    username: "ftp_user",
    createdAt: "2024-05-21",
    createdBy: "Admin",
  },
];
