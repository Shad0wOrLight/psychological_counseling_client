import http from "@/http";

export const getSessionList = (id) =>
  http.get(`/consultMessage/find?userId=${id}`);

export const addMessage = (data) => http.post("/consultMessage/add", data);

export const delSession = (sendId, receiveId) =>
  http.get(`/consultMessage/delete?sendId=${sendId}&receiveId=${receiveId}`);

