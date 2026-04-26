import axios from "axios";

const API = "http://localhost:8080/api";

export const getEmployees = () => axios.get(`${API}/employees`);

export const addEmployee = (data: any) =>
  axios.post(`${API}/employees`, data);

export const deleteEmployee = (id: number) =>
  axios.delete(`${API}/employees/${id}`);
