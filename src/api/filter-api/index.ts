import client from "../axiosInstance";

export const getThirdPartyFilters = async () => {
  const res = await client.get("/filter/get-third-party-filters");
  return res?.data;
};

export const getCredentialsFilters = async () => {
  const res = await client.get("/filter/get-credentials");
  return res?.data;
};

export const getTaskTypeFilters = async () => {
  const res = await client.get("/filter/get-data-source");
  return res?.data;
};

export const getCampaignFilters = async () => {
  const res = await client.get("/filter/get-campaign-types");
  return res?.data;
};

export const getDataSourceFilters = async () => {
  const res = await client.get("/filter/get-data-source");
  return res?.data;
};


export const getStatesFilters = async () => {
  const res = await client.get("/filter/states");
  return res?.data;
};
