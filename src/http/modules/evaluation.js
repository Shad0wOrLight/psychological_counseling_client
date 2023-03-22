import http from "@/http";

export const getEvaluationList = (pageNo = 1, pageSize = 5) =>
  http.get(`/questionnaire/all?pageNo=${pageNo}&pageSize=${pageSize}`);

export const getEvaluationByCondition = (data = {}) =>
  http.post("/questionnaire/find", data);

export const getAnswer = (id) => http.get(`/answer/find?answerId=${id}`);

export const addTestRecord = (data) => http.post("/testRecord/add", data);

export const getTestRecord = (id) => http.get(`/testRecord/find?userId=${id}`);
