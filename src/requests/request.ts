import http from "../http-common";
import IPostData from "../types/type";

const getAll = () => {
  return http.get<Array<IPostData>>("/posts");
};

const get = (id: any) => {
  return http.get<IPostData>(`/posts/${id}`);
};

const create = (data: IPostData) => {
  return http.post<IPostData>("/posts", data);
};

const update = (id: any, data: IPostData) => {
  return http.put<any>(`/posts/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/posts/${id}`);
};

const removeAll = () => {
  return http.delete<any>(`/posts`);
};

const findByTitle = (title: string) => {
  return http.get<Array<IPostData>>(`/posts?title=${title}`);
};

const TutorialService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default TutorialService;