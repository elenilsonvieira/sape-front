import ApiService from './ApiService';

export default class SchedulingApiService extends ApiService {
    
    constructor() {
        super('/scheduling')
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
    findAllParticpants(id) {
        return this.get(`/participation/${id}`);
    }

    findWithFilter(filters) {
        return this.getWithFilter(`/useFilter${filters}`);
    }

    confirmedByPlaceId(placeId) {
        return this.get(`/confirmedByPlace/${placeId}`);
    }

    confirmedBySport(sportId) {
        return this.get(`/confirmedBySport/${sportId}`);
    }

    confirmedByUser(registration) {
        return this.get(`/user/${registration}`);
    }

    addParticipant(schedulingId, object) {
        return this.patch(`/participation/add/${schedulingId}`, object);
    }

    removeParticipant(schedulingId, object) {
        return this.patch(`/participation/remove/${schedulingId}`, object);
    }
    addIsPresent(schedulingId, userRegistration) {
        return this.patch(`/${schedulingId}/addIsPresent/${userRegistration}`);
    }
   
}