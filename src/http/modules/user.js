import http from "@/http";

export const getAllUser = (pageNo = 1, pageSize = 5) =>
  http.get(`/user/all?pageNo=${pageNo}&pageSize=${pageSize}`);

export const getUserList = (data = {}) => http.post(`/user/find`, data);

export const userLogin = (data) => http.post("/user/login", data);

export const userRegister = (data) => http.post("/user/register", data);

export const editUser = (data) => http.post("/user/update", data);
