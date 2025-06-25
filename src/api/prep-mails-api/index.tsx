import client from "../axiosInstance";
import { type PrepMail } from "../../pages/prep-mails/data";

export const getPrepMails = async (): Promise<PrepMail[]> => {
  const res = await client.get<PrepMail[]>(`/prep-mail?skip=0&limit=100`);
  return res.data;
};


// export const deletePrepMails = async (id: number) => {
//   try {
//     await client.delete(`/prep-mail/${id}`);
//     return true;
//   } catch (error) {
//     console.error("Error while deleting credential.", error);
//     return false;
//   }
// };
