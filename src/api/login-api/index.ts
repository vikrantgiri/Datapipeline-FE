import client from "../axiosInstance";

export interface CreateLoginPayload {
  username: string;
  password: string;
}

// export const postLogin = async (payload: CreateLoginPayload) => {
//   const res = await client.post("/user/login", payload);
//   return res?.data;
// };


export const postLogin = async (payload: {
  username: string;
  password: string;
}) => {
  const res = await client.post("/user/login", payload);
  return res?.data;
};