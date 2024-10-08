import axios from "axios";
import ApiService from "./ApiService";

export default class SportApiService extends ApiService {
  constructor() {
    super("/sport");
  }

  create(object) {
    return this.post("", object);
  }

  update(id, object) {
    return this.put(`/${id}`, object);
  }

  delete(id) {
    return super.delete(`/${id}`);
  }

  find(id) {
    const url = id ? `/${id}` : '';
    return this.get(url);
  }
  /* se usarmos filtros. Por hora pegamos apenas os objetos existentes no banco ou por ID.
    find(params) {
        return this.get(`${params}`);
    }
    */
}
