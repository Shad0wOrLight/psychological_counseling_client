import http from "@/http";

export const globalSeach = (keyword) => http.get(`/search?keyword=${keyword}`);
