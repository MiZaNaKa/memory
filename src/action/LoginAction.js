import dispatcher from "../common/dispatcher";
import API from '../api/customAxios';

class LoginAction{
    constructor(){
        this.actionType={}
        this.actionType.LoginAction="LoginAction"
    }
    
    LoginAction =async(request)=>{
        
        try{
            var response={
                data:[],
                ok:false
            }
            
            var res = await API.post(`users/login`,request)
            if(res.data.ok){
                response.ok=true
                response.data=res.data
            }
            else{
                response.ok=false
                response.data="Email or Password is wrong"
            }
        }
        catch(e){
            response.ok=false
            response.data=e.message
        }
        dispatcher.dispatch({type:this.actionType.LoginAction,data:response})
        
    }

}

export default new LoginAction()
