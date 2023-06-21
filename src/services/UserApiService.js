import ApiService from "./ApiService";

export default class UserApiService extends ApiService {
  constructor() {
    super("/user");
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
  find(userId) {
    return this.get(`/${userId}`);
  }
  findByRegistration(userRegistration) {
    return this.get(`/registration/${userRegistration}`);
  }
  findAll() {
    return this.getAll("/all");
  }

  findSportsFavoriteAll() {
    return this.getAll("/all");
  }
  addSportsFavorite(userId, sportId) {
    return this.patch(`/${userId}/sportsFavorite/${sportId}`);
  }

  removeSportsFavorite(userId, sportId) {
    return this.patch(`/${userId}/removeSportsFavorite/${sportId}`);
  }
}
