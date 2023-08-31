import dispatcher from "../common/dispatcher";
import API from '../api/customAxios';

class MyStoryListAction{
    constructor(){
        this.actionType={}
        this.actionType.getMyStoryList="getMyStoryList";
        this.actionType.myStoryListPagination="myStoryListPagination"
        this.actionType.clickCheck="clickCheck"
        this.actionType.checkAllAction="checkAllAction"

        
    }
    checkAllAction = async (value) => {
		dispatcher.dispatch({ type: this.actionType.checkAllAction, data: value });
	}


    clickCheck = async (value) => {
		dispatcher.dispatch({ type: this.actionType.clickCheck, data: value });
	}

    myStoryListPagination = async (value) => {
		dispatcher.dispatch({ type: this.actionType.myStoryListPagination, data: value });
	}
   

    getMyStoryList =async(value)=>{
        
        try{
            var response={
                data:[],
                ok:false
            }
            
            var res = await API.post(`memory/getMyStoryList`,value)
            response.ok=true
            response.data=res.data
        }
        catch(e){
            response.ok=false
            response.data=e.message
        }
        dispatcher.dispatch({type:this.actionType.getMyStoryList,data:response})
        
    }

    myStoryListStatusOnChange =async(value)=>{
        
        try{
            var response={
                data:[],
                ok:false
            }
            
            var res = await API.post(`memory/myStoryListStatus`,value)
            response.ok=true
            response.data=res.data
        }
        catch(e){
            response.ok=false
            response.data=e.message
        }
        dispatcher.dispatch({type:this.actionType.getMyStoryList,data:response})
        
    }

    
    myStoryMultipleAction =async(value)=>{
        
        try{
            var response={
                data:[],
                ok:false
            }
            
            var res = await API.post(`memory/myStoryMultipleAction`,value)
            response.ok=true
            response.data=res.data
        }
        catch(e){
            response.ok=false
            response.data=e.message
        }
        dispatcher.dispatch({type:this.actionType.getMyStoryList,data:response})
        
    }


    
    


}
export default new MyStoryListAction()
