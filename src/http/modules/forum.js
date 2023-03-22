import http from "@/http";

export const getArticleList = (pageNo = 1, pageSize = 5) =>
  http.get(`/article/all?pageNo=${pageNo}&pageSize=${pageSize}`);

export const getArticleByCondition = (data = {}) =>
  http.post("/article/find", data);

export const getCommentByArticleId = (id) =>
  http.get(`/comment/find?articleId=${id}`);

export const getCommnetByUserId = (id) =>
  http.get(`/comment/findByUserId?userId=${id}`);

export const addComment = (data) => http.post("/comment/add", data);

export const addArticle = (data) => http.post("/article/add", data);

export const deleteArticle = (id) =>
  http.get(`/article/delete?articleId=${id}`);
export const deleteComment = (id) =>
  http.get(`/comment/delete?commentId=${id}`);
