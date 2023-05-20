export default class EmailApiService extends ApiService{
    
    constructor(){
        super('');
    }
    sendMailConfirmationPresent(object){
        return this.post('', object);
    }
    
}