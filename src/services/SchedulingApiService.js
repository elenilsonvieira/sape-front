import ApiService from "./ApiService";

export default class SchedulingApiService extends ApiService {
  constructor() {
    super("/scheduling");
  }

  create(object) {
    return this.post("", object);
  }

  update(id, object) {
    return this.put(`/${id}`, object);
  }

  delete(id, userRegistration) {
    return super.delete(`/${id}`, {
      headers: {
        'userRegistration': userRegistration
      }
    });
  }

  find() {
    return this.get("");
  }
  approveScheduling(schedulingId) {
    return this.patch(`/approvedScheduling/${schedulingId}`);
  }

  findAllParticpants(id) {
    return this.get(`/participation/${id}`);
  }
  findAllSchedulingPendingByPlaceResponsible(userRegistration) {
    return this.get(`/ResponsiblePlace/${userRegistration}`);
  }

  findWithFilter(filters) {
    return this.getWithFilter(`/useFilter${filters}`);
  }

  findWithCreatorAndResponsible(registration) {
    return this.get(`/userCreator/${registration}`);
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

  removeIsPresent(schedulingId, userRegistration) {
    return this.patch(`/${schedulingId}/removeIsPresent/${userRegistration}`);
  }
}
