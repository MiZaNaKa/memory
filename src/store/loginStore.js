import Action from "../action/LoginAction"
import AsyncStorage from '@react-native-async-storage/async-storage';
import dispatcher from "../common/dispatcher"
import { Store } from 'flux/utils';

class LoginStore extends Store {
    constructor() {
        super(dispatcher);
        this.created=false
        this.detail={
           
            "email" : "",
            "password" : "",
        }
        this.tempoData={
            loading:false,
            success:false,
            message:""
        }
        
    }
    clearAll=()=>{
        this.created=false
        this.detail={
           
            "email" : "",
            "password" : "",
        }
        this.tempoData={
            loading:false,
            success:false,
            message:""
        }
    }

    getTempoData=()=>{
        return this.tempoData
    }



    getDetail=()=>{
        return this.detail
    }

    getCreated=()=>{
        return this.created
    }

    __onDispatch = async (action) => {
       
        if(action.type===Action.actionType.LoginAction){
            if(action.data.ok){
                AsyncStorage.setItem('jwt', action.data.data.jwt)
                AsyncStorage.setItem('userInfo', JSON.stringify(action.data.data.userInfo))
                this.tempoData.success=true
            }
            else{
                this.tempoData.success=false
                this.tempoData.message=action.data.data
            }
        }
        else{
            return false
        }
        this.__emitChange()
        return true
        
    }
}

export default new LoginStore()