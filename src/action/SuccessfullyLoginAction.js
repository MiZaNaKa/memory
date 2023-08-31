import dispatcher from "../common/dispatcher";
import API from '../api/axioAPI';

class SuccessfullyLoginAction{
    constructor(){
        this.actionType={}
        this.actionType.getsuccessfullyLogin="getsuccessfullyLogin"
        

    }
   

    successfullyLogin =async(token)=>{
        
        try{
            var response={
                data:[],
                ok:false
            }
            
            var res = await API.get(`users/loginSuccessfully/`+token)
            response.ok=true
            response.data=res.data
        }
        catch(e){
            response.ok=false
            response.data='token expire'
        }
        dispatcher.dispatch({type:this.actionType.getsuccessfullyLogin,data:response})
        
    }

    


}
export default new SuccessfullyLoginAction()
