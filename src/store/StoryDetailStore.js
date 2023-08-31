import Action from "../action/StoryDetailAction"
import dispatcher from "../common/dispatcher"
import { Store } from 'flux/utils';

class StoryDetailStore extends Store {
    constructor() {
        super(dispatcher);
        this.detail={
            "like" : [

            ],
            "comment" : [

            ],
            "text" : "",
            "title" : "dsfsdf",
        }
        
    }

    getDetail=()=>{
        return this.detail
    }

    __onDispatch = async (action) => {
       
        if(action.type===Action.actionType.getStoryDetail){
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

export default new StoryDetailStore()