import ApiService from "./ApiService";

export default class SportsFavoriteApiService extends ApiService {
    
    constructor() {
        super('/sportsFavorite')
    }
    delete(id) {
        return super.delete(`/${id}`);
    }

    find(id) {
        return this.get(`/${id}`);
    }

    /* se usarmos filtros. Por hora pegamos apenas os objetos existentes no banco ou por ID.
    find(params) {
        return this.get(`${params}`);
    }
    */
}