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
        this.tempoData={
            loading:false,
            success:false
        }
        
    }
    clearAll=()=>{
        this.created=false
        this.detail={
           
            "text" : "",
            "title" : "",
        }
        this.tempoData={
            loading:false,
            success:false
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
       
        if(action.type===Action.actionType.postStoryAction){
            if(action.data.ok){
                // this.created=true
                this.tempoData.loading=false
                this.tempoData.success=true
            }
            else{
                // this.created=false
                this.tempoData.loading=false
                this.tempoData.success=false
            }
        }
        else if(action.type===Action.actionType.getMyDetailStory){
            if(action.data.ok){
                this.detail=action.data.data.success.data.success.data
            }
        }
        else if(action.type===Action.actionType.IconAction){
            this.tempoData.loading=true
        }

        else if(action.type===Action.actionType.clearNCloseInStory){
            this.tempoData.loading=false
            this.tempoData.success=false
            this.created=true
        }

        else if(action.type===Action.actionType.clearAllStoryPostNEdit){
            this.tempoData.loading=false
            this.tempoData.success=false
            this.created=true
        }

        

        

        

        
      
        else{
            return false
        }
        this.__emitChange()
        return true
        
    }
}

export default new PostStoryStore()