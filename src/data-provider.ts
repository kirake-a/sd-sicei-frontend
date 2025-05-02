import { DataProvider } from "@refinedev/core";
import axios from "axios";

const API_URL = import.meta.env.VITE_SICEI_API_ORIGIN;

export const customDataProvider: DataProvider = {
  getList: async ({ resource }) => {
    const response = await axios.get(`${API_URL}/${resource}`);
    return {
      data: response.data,
      total: response.data.length,
    };
  },

  getOne: async ({ resource, id }) => {
    const response = await axios.get(`${API_URL}/${resource}/${id}`);
    return { data: response.data };
  },

  create: async ({ resource, variables }) => {
    const response = await axios.post(`${API_URL}/${resource}`, variables);
    return { data: response.data };
  },

  update: async ({ resource, id, variables }) => {
    const response = await axios.put(`${API_URL}/${resource}/${id}`, variables);
    return { data: response.data };
  },

  deleteOne: async ({ resource, id }) => {
    const response = await axios.delete(`${API_URL}/${resource}/${id}`);
    return { data: response.data };
  },

  getApiUrl: () => API_URL,

  getMany: async () => ({ data: [] }),
  deleteMany: async () => ({ data: [] }),
  updateMany: async () => ({ data: [] }),
  createMany: async () => ({ data: [] }),
};
