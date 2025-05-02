import { DataProvider } from "@refinedev/core";
import axios from "axios";

import { errorHandler } from "../utils/errorHandler";

const API_URL = import.meta.env.VITE_SICEI_API_ORIGIN;

export const customDataProvider: DataProvider = {
  getList: async ({ resource }) => {
    try{
      const response = await axios.get(`${API_URL}/${resource}`);
      return {
        data: response.data,
        total: response.data.length,
      };
    } catch (error) {
      throw errorHandler(error, `getList for ${resource}`);
    }
  },

  getOne: async ({ resource, id }) => {
    try {
      const response = await axios.get(`${API_URL}/${resource}/${id}`);
      return { data: response.data };
    } catch (error) {
      throw errorHandler(error, `getOne for ${resource} with id ${id}`);
    }
      
  },

  create: async ({ resource, variables }) => {
    try {
      const response = await axios.post(`${API_URL}/${resource}`, variables);
      return { data: response.data };
    } catch (error) {
      throw errorHandler(error, `create for ${resource}`);
    }
  },

  update: async ({ resource, id, variables }) => {
    try {
      const response = await axios.put(`${API_URL}/${resource}/${id}`, variables);
    return { data: response.data };
    } catch (error) {
      throw errorHandler(error, `update for ${resource} with id ${id}`);
    }
  },

  deleteOne: async ({ resource, id }) => {
    try {
      const response = await axios.delete(`${API_URL}/${resource}/${id}`);
      return { data: response.data };
    } catch (error) {
      throw errorHandler(error, `deleteOne for ${resource} with id ${id}`);
    }
  },

  getApiUrl: () => API_URL,

  getMany: async () => {throw new Error("deleteMany is not implemented");},
  deleteMany: async () => {throw new Error("deleteMany is not implemented");},
  updateMany: async () => {throw new Error("deleteMany is not implemented");},
  createMany: async () => {throw new Error("deleteMany is not implemented");},
};
