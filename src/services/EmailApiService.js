export default class EmailApiService extends ApiService{
    
    constructor(){
        super('');
    }
    sendMailConfirmationPresent(object){
        return this.post('', object);
    }
    sendMailSportFavoriteScheduling(object){
        return this.post('', object);
    }
    sendMailConfirmationPresent(object){
        return this.post('', object);
    }
    
}