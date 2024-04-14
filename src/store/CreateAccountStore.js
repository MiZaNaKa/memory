import Action from "../action/CreateAccountAction"
import AsyncStorage from '@react-native-async-storage/async-storage';
import dispatcher from "../common/dispatcher"
import { Store } from 'flux/utils';

class CreateAccountStore extends Store {
    constructor() {
        super(dispatcher);
        this.detail={
            "name":"",
            "email" : "",
            "password" : "",
            "retypePassword":""
            
        }
        this.tempoData={
            loading:false,
            success:false,
            message:"",
            getOTP:false
        }
        
    }
    clearAll=()=>{
        this.detail={
            "name":"",
            "email" : "",
            "password" : "",
            "retypePassword":""
            
        }
        this.tempoData={
            loading:false,
            success:false,
            message:"",
            getOTP:false
        }
    }

    getTempoData=()=>{
        return this.tempoData
    }



    getDetail=()=>{
        return this.detail
    }

    

    __onDispatch = async (action) => {
       
        if(action.type===Action.actionType.getOtpForCreateAcc){
            if(action.data.ok){
                this.tempoData.getOTP=true
            }
            else{
                this.tempoData.getOTP=false
                this.tempoData.message=action.data.data
            }
        }
        else if(action.type===Action.actionType.createAccountAPI){
            
            if(action.data.ok){
                AsyncStorage.setItem('jwt', action.data.data.jwt)
                AsyncStorage.setItem('userInfo', JSON.stringify(action.data.data.userInfo))
                this.tempoData.success=true
            }
            else{
                
                this.tempoData.message=action.data.data
            }
        }

        else if(action.type===Action.actionType.emailOnChangeInCreateAcc){
            this.detail.email=action.data
        }
        else if(action.type===Action.actionType.passwordOnChangeInCreateAcc){
            this.detail.password=action.data
        }
        else if(action.type===Action.actionType.nameOnChangeInCreateAcc){
            this.detail.name=action.data
        }
        else if(action.type===Action.actionType.rePasswordOnChange){
            this.detail.retypePassword=action.data
        }
        
        

        
        else{
            return false
        }
        this.__emitChange()
        return true
        
    }
}

export default new CreateAccountStore()