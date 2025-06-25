
import client from "../axiosInstance";

export interface CreateCredentialPayload {
  third_party?: string;
  username: string;
  password: string;
  port: number | null;
  database: string | null;
  host: string | null;
  name: string;
  created_by_id:number;
}

export const getCredentials = async (): Promise<Credential[]> => {
  const res = await client.post<Credential[]>(`/credentials/filtered?skip=0&limit=100`);
  return res?.data;
};


export const postCredentials = async (payload: CreateCredentialPayload) => {
  const res = await client.post("/credentials", payload);
  return res?.data;
};

export const putCredentials = async (): Promise<Credential[]> => {
  const res = await client.put<Credential[]>(`/credentials`);
  return res?.data;
};


export const deleteCredential = async (id: number) => {
  try {
    await client.delete(`/credentials/${id}`);
    return true;
  } catch (error) {
    console.error("Error while deleting credential.", error);
    return false;
  }
};





