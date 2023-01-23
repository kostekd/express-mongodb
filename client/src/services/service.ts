import { baseUrl } from "./baseUrl";
import axios from "axios";


export namespace Service {
  export interface QueryParams {
        name: string;
        minAge: number;
        maxAge: number;
    }
    export interface PostBody {
        name: string;
        age: number;
    }

  export const get = (payload: QueryParams) => {
    return axios.get(`${baseUrl}/api/get`, {params: {...payload}});
  }

}