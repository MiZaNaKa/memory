import Action from "../action/PostStoryAction"
import AsyncStorage from '@react-native-async-storage/async-storage';
import dispatcher from "../common/dispatcher"
import { Store } from 'flux/utils';

class PostStoryStore extends Store {
    constructor() {
        super(dispatcher);
        this.created=false
        this.detail={
           
            "text" : "",
            "title" : "",
        }
        
    }

    getDetail=()=>{
        return this.detail
    }

    getCreated=()=>{
        return this.created
    }

    __onDispatch = async (action) => {
       
        if(action.type===Action.actionType.postStoryAction){
            if(action.data.ok){
                this.created=true
            }
            else{
                this.created=false
            }
        }
        else if(action.type===Action.actionType.getMyDetailStory){
            if(action.data.ok){
                this.detail=action.data.data.success.data.success.data
            }
        }

        
      
        else{
            return false
        }
        this.__emitChange()
        return true
        
    }
}

export default new PostStoryStore()