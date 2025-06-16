import client from "../axiosInstance";
import { type TriggerLeadItem } from "../../pages/Trigger-leads/data";

export const getFileDownloadDefinitions = async (): Promise<TriggerLeadItem[]> => {
  const res = await client.get<TriggerLeadItem[]>(`/trigger-leads`);
  return res.data;
};


export const deleteFileDownloadDefinitions = async (id: number) => {
  try {
    await client.delete(`/trigger-leads/${id}`);
    return true;
  } catch (error) {
    console.error("Error while deleting credential.", error);
    return false;
  }
};
