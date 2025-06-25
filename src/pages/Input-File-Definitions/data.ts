export interface inputfileData {
  key: string
  id: string
  taskType: string
  campaignType: string
  thirdParty: string
  useTabu: string
  createdBy: string
  executions: string
  action: string
}

export const mockInputFileData: inputfileData[] = [
  {
    key: '1',
    id: '1',
    taskType: 'Prescreen',
    campaignType: 'aws.snowflake.com',
    thirdParty: 'Experian',
    useTabu: 'admin_aws',
    createdBy: '2024-05-22',
    executions: '	8 executions',
    action: 'Run task',
  },
  {
    key: '2',
    id: '2',
    taskType: 'Trigger',
    campaignType: 'ftp.tu.com',
    thirdParty: '	TransUnion',
    useTabu: 'ftp_user',
    createdBy: '2024-05-21',
    executions: '	8 executions',
    action: 'Run task',
  },
]
