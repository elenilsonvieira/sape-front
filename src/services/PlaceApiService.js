import ApiService from "./ApiService";

export default class PlaceApiService extends ApiService {
  constructor() {
    super("/place");
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

  getResponsibles(placeId) {
    return this.get(`/getResponsibles/${placeId}`);
  }
  addResponsibles(placeId, userId) {
    return this.patch(`/${placeId}/addResponsibles/${userId}`);
  }

  removeResponsibles(placeId, userId) {
    return this.patch(`/${placeId}/removeResponsibles/${userId}`);
  }
  /* se usarmos filtros. Por hora pegamos apenas os objetos existentes no banco ou por ID.
    find(params) {
        return this.get(`${params}`);
    }
    */
}
