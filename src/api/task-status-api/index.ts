import client from "../axiosInstance";
import { type TaskStatusItem } from "../../pages/Task-status/data"

export const getTaskStatus = async (): Promise<TaskStatusItem[]> => {
  const res = await client.get<TaskStatusItem[]>(`/task-status`);
  return res?.data;
};

