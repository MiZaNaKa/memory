import Action from "../action/updatePasswordAction"
import AsyncStorage from '@react-native-async-storage/async-storage';
import dispatcher from "../common/dispatcher"
import { Store } from 'flux/utils';

class UpdatePasswordStore extends Store {
    constructor() {
        super(dispatcher);
        
        this.data={
            "password" : "",
            "reType-pass" : "",
        }
        this.tempoData={
            loading:false,
            success:false
        }
        
    }
    clearAll=()=>{
        
        this.data={
            "password" : "",
            "reTypePass" : "",
        }
        this.tempoData={
            loading:false,
            success:false
        }
    }

    getTempoData=()=>{
        return this.tempoData
    }

    getData=()=>{
        return this.data
    }


    __onDispatch = async (action) => {
       
        if(action.type===Action.actionType.updatePassword){
           
            if(action.data.ok){
                AsyncStorage.setItem('jwt', action.data.data.jwt)
                AsyncStorage.setItem('userInfo', JSON.stringify(action.data.data.userInfo))
                this.tempoData.success=true
            }
            else{
                this.tempoData.success=false
            }
        }
        else if(action.type===Action.actionType.clearAllUpdatePass){
            this.data={
                "password" : "",
                "reTypePass" : "",
            }
            this.tempoData={
                loading:false,
                success:false
            }
        }

        
      
        else{
            return false
        }
        this.__emitChange()
        return true
        
    }
}

export default new UpdatePasswordStore()