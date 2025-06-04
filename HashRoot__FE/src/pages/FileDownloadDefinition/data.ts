export interface FileDownloadDefinitionItem {
  key: string;
  name: string;
  credentials: string;
  remotepath: string;
  createdAt: string;
  createdBy: string;
  action:string
}

export const fileDownloadDefinitionData: FileDownloadDefinitionItem[] = [
  {
    key: "1",
    name: "AWS Credential",
    credentials: "Snowflake",
    remotepath: "/dgmsthrvrmt/FromTU/",
    createdAt: "2024-05-22",
    createdBy: "System",
    action:"Download File",
  },
  {
    key: "2",
    name: "FTP Login",
    credentials: "TransUnion",
    remotepath: "/from_xpn/",
    createdAt: "2024-05-21",
    createdBy: "Admin",
    action:"Download File",
  },
];

export const fileDownloadDefinitionColumns = [
  {
    title: "NAME",
    dataIndex: "name",
    key: "name",
    render: (text: string) => text,
  },
  { title: "CREDENTIALS", dataIndex: "credentials", key: "credentials" },
  { title: "REMOTE PATH", dataIndex: "remotepath", key: "remotepath" },
  { title: "CREATED AT", dataIndex: "createdAt", key: "createdAt" },
  { title: "CREATED BY", dataIndex: "createdBy", key: "createdBy" },
  { title: "ACTION", dataIndex: "action", key: "action", },

  
];
