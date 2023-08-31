import { act } from "react-dom/test-utils";
import Action from "../action/StoryAction"
import dispatcher from "../common/dispatcher"
import { Store } from 'flux/utils';

class StoryStore extends Store {
    constructor() {
        super(dispatcher);
        this.storyList=[]
        
    }

    getStoryList=()=>{
        return this.storyList
    }

    __onDispatch = async (action) => {
       
        if(action.type===Action.actionType.getStoryList){
            if(action.data.ok){
                
                this.storyList=action.data.data.success.data.success.data
            }
            
            else{
                // this.storyList=false
            }
        }
      
        else{
            return false
        }
        this.__emitChange()
        return true
        
    }
}

export default new StoryStore()