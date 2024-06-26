import dispatcher from "../common/dispatcher";
import API from '../api/customAxios';

class CreateAccountAction{
    constructor(){
        this.actionType={}
        this.actionType.getOtpForCreateAcc="getOtpForCreateAcc"
        this.actionType.createAccountAPI="createAccountAPI"
        this.actionType.emailOnChangeInCreateAcc="emailOnChangeInCreateAcc"
        this.actionType.passwordOnChangeInCreateAcc="passwordOnChangeInCreateAcc"
        this.actionType.nameOnChangeInCreateAcc="nameOnChangeInCreateAcc"
        this.actionType.rePasswordOnChange="rePasswordOnChange"
        
        
    }
    emailOnChangeInCreateAcc = async (value) => {
		dispatcher.dispatch({ type: this.actionType.emailOnChangeInCreateAcc, data: value });
	}

    passwordOnChangeInCreateAcc = async (value) => {
		dispatcher.dispatch({ type: this.actionType.passwordOnChangeInCreateAcc, data: value });
	}

    nameOnChangeInCreateAcc = async (value) => {
		dispatcher.dispatch({ type: this.actionType.nameOnChangeInCreateAcc, data: value });
	}

    rePasswordOnChange = async (value) => {
		dispatcher.dispatch({ type: this.actionType.rePasswordOnChange, data: value });
	}



    getOtpForCreateAcc =async(email)=>{
        try{
            var response={
                data:[],
                ok:false
            }
            
            var res = await API.get(`users/getOTP/`+email)
            if(res.data.isExist){
                response.ok=false
                response.data=res.data.message
            }
            else{
                response.ok=true
                response.data=""
            }
        }
        catch(e){
            response.ok=false
            response.data=e.message
        }
        dispatcher.dispatch({type:this.actionType.getOtpForCreateAcc,data:response})
        
    }

    
    
    createAccountAPI =async(value)=>{
        try{
            var response={
                data:[],
                ok:false
            }
            
            var res = await API.post(`users/verifyOTPNCreateAcc`,value)
           
            if(res.data.ok){
                response.ok=true
                response.data=res.data.data
            }
            else{
                response.ok=false
                response.data=res.data.message
            }
        }
        catch(e){
            response.ok=false
            response.data=e.message
        }
        dispatcher.dispatch({type:this.actionType.createAccountAPI,data:response})
        
    }
}

export default new CreateAccountAction()
