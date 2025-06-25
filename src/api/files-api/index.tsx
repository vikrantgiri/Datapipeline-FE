import client from '../axiosInstance'
import { type FileData } from '../../pages/Files/data'

export interface CreateFilePayload {
  key: string
  file: string
  type: string
  status: string
  uploaded_at: string
  // uploaded_by: string;
  user: {
    id: number
    username: string
  }
  download?: string
}

export const getFiles = async (): Promise<FileData[]> => {
  const res = await client.get<FileData[]>(`/file?skip=0&limit=10`)
  return res.data
}

// export const postFiles = async (payload: CreateFilePayload) => {
//   const res = await client.post("/files", payload);
//   return res?.data;
// };

// export const deleteFiles = async (id: number) => {
//   try {
//     await client.delete(`/files/${id}`);
//     return true;
//   } catch (error) {
//     console.error("Error while deleting credential.", error);
//     return false;
//   }
// };
