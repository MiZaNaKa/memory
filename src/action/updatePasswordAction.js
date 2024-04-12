import dispatcher from "../common/dispatcher";
import API from '../api/axioAPI';

class UpdatePasswordAction{
    constructor(){
        this.actionType={}
        this.actionType.updatePassword="updatePassword"
        this.actionType.clearAllUpdatePass="clearAllUpdatePass"
        
    }

    clearAllUpdatePass = async (response) => {
        dispatcher.dispatch({type:this.actionType.clearAllUpdatePass,data:response})
	}
   

    updatePassword =async(value)=>{
        
        try{
            var response={
                data:[],
                ok:false
            }
            var res = await API.post(`users/updatePassword`,value)
            response.ok=true
            response.data=res.data
        }
        catch(e){
            response.ok=false
            response.data='token expire'
        }
        dispatcher.dispatch({type:this.actionType.updatePassword,data:response})
    }

    


}
export default new UpdatePasswordAction()
