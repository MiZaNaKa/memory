import dispatcher from "../common/dispatcher";
import API from '../api/axioAPI';

class StoryAction{
    constructor(){
        this.actionType={}
        this.actionType.getStoryList="getStoryList"
        

    }
   

    getStoryList =async()=>{
        
        try{
            var response={
                data:[],
                ok:false
            }
            
            var res = await API.get(`memory/getListAll`,)
            response.ok=true
            response.data=res.data
        }
        catch(e){
            response.ok=false
            response.data=e.message
        }
        dispatcher.dispatch({type:this.actionType.getStoryList,data:response})
        
    }

    


}
export default new StoryAction()
