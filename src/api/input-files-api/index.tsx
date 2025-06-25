import client from '../axiosInstance'
import { type inputfileData } from '../../pages/Input-File-Definitions/data'

export interface CreateInputFilesPayload {
  key?: string
  id?: number
  task_type?: string
  campaign_type?: string
  third_party?: string
  use_tabu?: boolean
  created_by_id?: number
  updated_at?: string
  remote_path?: string
  custom_filename?: string | null
  max_column_size?: number
  action?: string
  bucketize?: string
  sql_script?: string
}

export const getInputFiles = async (): Promise<inputfileData[]> => {
  const res = await client.post<inputfileData[]>(
    `/input-file-def/filtered?skip=0&limit=100`
  )
  return res.data
}

export const postInputFiles = async (payload: CreateInputFilesPayload) => {
  const res = await client.post('/input-file-def', payload)
  return res?.data
}

export const deleteInputFiles = async (id: number) => {
  try {
    await client.delete(`/input-file-def/${id}`)
    return true
  } catch (error) {
    console.error('Error while deleting credential.', error)
    return false
  }
}
