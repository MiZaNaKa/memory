import Action from "../action/SuccessfullyLoginAction"
import AsyncStorage from '@react-native-async-storage/async-storage';
import dispatcher from "../common/dispatcher"
import { Store } from 'flux/utils';

class SuccessfullyLoginStore extends Store {
    constructor() {
        super(dispatcher);
        this.successfullyLogin=''
        
    }

   

    getsuccessfullyLogin=()=>{
        return this.successfullyLogin
    }

    __onDispatch = async (action) => {
       
        if(action.type===Action.actionType.getsuccessfullyLogin){
            if(action.data.ok){
                AsyncStorage.setItem('jwt', action.data.data.jwt)
                AsyncStorage.setItem('userInfo', JSON.stringify(action.data.data.userInfo))
                this.successfullyLogin='success'
            }
            else{
                this.successfullyLogin='fail'
            }
        }
      
        else{
            return false
        }
        this.__emitChange()
        return true
        
    }
}

export default new SuccessfullyLoginStore()