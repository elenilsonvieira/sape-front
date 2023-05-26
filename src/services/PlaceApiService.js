import ApiService from './ApiService';

export default class PlaceApiService extends ApiService {
    
    constructor() {
        super('/place')
    }

    create(object) {
        return this.post('', object);
    }

    update(id, object) {
        return this.put(`/${id}`, object);
    }

    delete(id) {
        return super.delete(`/${id}`);
    }

    find(id) {
        return this.get(`/${id}`);
    }

    addResponsibles(placeId,userRegistration){
        this.patch(`/${placeId}/addResponsibles/${userRegistration}`)
    }

    removeResponsibles(placeId,userRegistration){
        this.patch(`/${placeId}/removeResponsibles/${userRegistration}`)
    }
    /* se usarmos filtros. Por hora pegamos apenas os objetos existentes no banco ou por ID.
    find(params) {
        return this.get(`${params}`);
    }
    */
}