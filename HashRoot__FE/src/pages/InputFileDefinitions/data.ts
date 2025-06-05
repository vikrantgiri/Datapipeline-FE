export interface inputfileData {
  key: string;
   id: string;
  taskType: string;
  campaignType: string;
  thirdParty: string;
  useTabu: boolean;
  createdBy: string;
  executions: number;
  action: string;
}

export const mockInputFileData: inputfileData[] = [
  {
    key: "1",
    id: "1",
    taskType: "Prescreen",
    campaignType: "aws.snowflake.com",
    thirdParty: "Experian",
    useTabu: true,
    createdBy: "2024-05-22",
    executions:8,
    action:"Run task",
  },
  {
    key: "2",
    id: "2",
    taskType: "Trigger",
    campaignType: "ftp.tu.com",
    thirdParty: "TransUnion",
    useTabu: false,
    createdBy: "2024-05-21",
    executions: 8,
     action:"Run task",
  },
];
