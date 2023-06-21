import ApiService from "./ApiService";

export default class SportsFavoriteApiService extends ApiService {
  constructor() {
    super("/sportsFavorite");
  }
  delete(id) {
    return super.delete(`/${id}`);
  }

  find(id) {
    return this.get(`/${id}`);
  }

  addSportsFavorite(sportId, object) {
    console.log(sportId);
    return axios.patch(
      `http://localhost:8080/api/user/${1}/sportsFavorite/${sportId}`
    );
  }
  /* se usarmos filtros. Por hora pegamos apenas os objetos existentes no banco ou por ID.
    find(params) {
        return this.get(`${params}`);
    }
    */
}
