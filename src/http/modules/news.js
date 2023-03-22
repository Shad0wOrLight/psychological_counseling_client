import http from "@/http";

export const getNewsList = (pageNo = 1, pageSize = 5) =>
  http.get(`/news/all?pageNo=${pageNo}&pageSize=${pageSize}`);

export const getNewsListByCondition = (data = {}) =>
  http.post("/news/find", data);
