import dispatcher from "../common/dispatcher";
import API from '../api/customAxios';

class PostStoryAction{
    constructor(){
        this.actionType={}
        this.actionType.postStoryAction="postStoryAction"
        this.actionType.getMyDetailStory="getMyDetailStory"

        this.actionType.editStoryAction="editStoryAction"

        
    }
   

    postStoryAction =async(request)=>{
        
        try{
            var response={
                data:[],
                ok:false
            }
            
            var res = await API.post(`memory/create`,request)
            response.ok=true
            response.data=res.data
        }
        catch(e){
            response.ok=false
            response.data=e.message
        }
        dispatcher.dispatch({type:this.actionType.postStoryAction,data:response})
        
    }


    getMyDetailStory =async(id)=>{
        
        try{
            var response={
                data:[],
                ok:false
            }
            
            var res = await API.get(`memory/getMyDetailStory/`+id)
            response.ok=true
            response.data=res.data
        }
        catch(e){
            response.ok=false
            response.data=e.message
        }
        dispatcher.dispatch({type:this.actionType.getMyDetailStory,data:response})
        
    }

    editStoryAction =async(form,id)=>{
        
        try{
            var response={
                data:[],
                ok:false
            }
            
            var res = await API.put(`memory/editMyStory/`+id,form)
            response.ok=true
            response.data=res.data
        }
        catch(e){
            response.ok=false
            response.data=e.message
        }
        dispatcher.dispatch({type:this.actionType.postStoryAction,data:response})
        
    }


    
    

    


}
export default new PostStoryAction()
