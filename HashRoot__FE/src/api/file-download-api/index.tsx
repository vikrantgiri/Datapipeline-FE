import client from "../axiosInstance";
import { type FileDownloadDefinitionItem } from "../../pages/FileDownloadDefinition/data";

export interface CreateFileDDPayload {
  key: string;
  name: string;
  credentials: string;
  remote_path: string;
  created_at: string;
  created_by: {
    id: number;
    username: string;
  };
  action: string;

  postDC: string;
  postCallShaper: string;
  insertPostgres: string;
}

export const getFileDownloadDefinitions = async (): Promise<
  FileDownloadDefinitionItem[]
> => {
  const res = await client.post<FileDownloadDefinitionItem[]>(
    `/file-download-def/filtered?skip=0&limit=100`
  );
  return res.data;
};

export const postFileDownloadDefinitions = async (
  payload: CreateFileDDPayload
) => {
  const res = await client.post("/file-download-def", payload);
  return res?.data;
};

export const putFileDownloadDefinitions = async (): Promise<
  FileDownloadDefinitionItem[]
> => {
  const res = await client.put<FileDownloadDefinitionItem[]>(
    `/file-download-def`
  );
  return res?.data;
};

export const deleteFileDownloadDefinitions = async (id: number) => {
  try {
    await client.delete(`/file-download-def/${id}`);
    return true;
  } catch (error) {
    console.error("Error while deleting credential.", error);
    return false;
  }
};
