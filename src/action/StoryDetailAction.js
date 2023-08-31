import dispatcher from "../common/dispatcher";
import API from '../api/axioAPI';
import customAPI from '../api/customAxios';

class StoryDetailAction{
    constructor(){
        this.actionType={}
        this.actionType.getStoryDetail="getStoryDetail"
        this.actionType.deleteComment="deleteComment"
        this.actionType.editComment="editComment"

        
    }
   

    getStoryDetail =async(id)=>{
        
        try{
            var response={
                data:[],
                ok:false
            }
            
            var res = await API.get(`memory/getStoryDetail/`+id)
            response.ok=true
            response.data=res.data
        }
        catch(e){
            response.ok=false
            response.data=e.message
        }
        dispatcher.dispatch({type:this.actionType.getStoryDetail,data:response})
        
    }

    sendComment =async(value)=>{
        
        try{
            var response={
                data:[],
                ok:false
            }
            var res = await customAPI.post(`memory/sendComment`,value)
            response.ok=true
            response.data=res.data
        }
        catch(e){
            response.ok=false
            response.data=e.message
        }
        dispatcher.dispatch({type:this.actionType.getStoryDetail,data:response})
        
    }

    
    editComment =async(value)=>{
        
        try{
            var response={
                data:[],
                ok:false
            }
            var res = await customAPI.post(`memory/editComment`,value)
            response.ok=true
            response.data=res.data
        }
        catch(e){
            response.ok=false
            response.data=e.message
        }
        dispatcher.dispatch({type:this.actionType.getStoryDetail,data:response})
        
    }


    deleteComment =async(request)=>{
        
        try{
            var response={
                data:[],
                ok:false
            }
            var DeleteOBj=request.id+','+request.commentID
           
            var res = await customAPI.delete(`memory/deleteComment/`+DeleteOBj)
            response.ok=true
            response.data=res.data
        }
        catch(e){
            response.ok=false
            response.data=e.message
        }
        dispatcher.dispatch({type:this.actionType.getStoryDetail,data:response})
        
    }

    
    likeUnlikeAction =async(id)=>{
        
        try{
            var response={
                data:[],
                ok:false
            }
            
            var res = await customAPI.get(`memory/likeUnlikeAction/`+id)
            response.ok=true
            response.data=res.data
        }
        catch(e){
            response.ok=false
            response.data=e.message
        }
        dispatcher.dispatch({type:this.actionType.getStoryDetail,data:response})
        
    }

    

    

    


}
export default new StoryDetailAction()
