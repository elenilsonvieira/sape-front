import ApiService from './ApiService';
export default class EmailApiService extends ApiService{
    
    constructor(){
        super('email');
    }
    notifySchedulingParticipants(schedulingId){
        return this.post(`/notify/${schedulingId}`);
    }
    notifyFavoriteSportScheduling(sportId){
        return this.post(`/notify/favoritesportscheduling/${sportId}`);
    }
    
    
}