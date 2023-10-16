import React, {  useEffect,useState} from 'react';
import Header from "./Header"
import loginHelper from '../jwtHelper/jwtHelper'
import Action from '../action/PostStoryAction'
import Store from '../store/PostStoryStore'
import withNavigateHook from '../common/Navigate'
import '../commonStyle/commonStyle.css'
import Load from "../img/loading.gif"
function PostStory(props){
    var detail=Store.getDetail()
    var id =props.params.id
    const[userInfo,setUserInfo]=useState('')
    const[form,setForm]=useState(detail)
    
    useEffect(() => {
        const getUserInfo = async () => {
          const data = await loginHelper.UserInfo()
          if(data){
            setUserInfo(data)
          }
          else{
            props.navigation('/')
          }
        }
      
        // call the function
        getUserInfo()
          // make sure to catch any error
          .catch(console.error);
    }, [])

    useEffect(() => {
      Store.addListener(onStoreChange)
      if(id){
        Action.getMyDetailStory(id)
      }
      
    }, []);

    const onStoreChange = () => {
        var login=Store.getCreated()
        
        var detail=Store.getDetail()
        setForm(detail)
        if(login){
          props.navigation('/')
        }
    }


    const titleOnChange=(value)=>{
      setForm(prevState => ({
        ...prevState,
        title: value.target.value
      }));
    }

    const areaOnChange=(value)=>{
      setForm(prevState => ({
        ...prevState,
        text: value.target.value
      }));
      
    }

    const submit=()=>{
      
      if(form.title && form.text){
        Action.postStoryAction(form)
      }
    }


    const EditStory=()=>{
      if(form.title && form.text){
        Action.editStoryAction(form,id)
      }
    }

    return <div>
        <Header/>
        <div className="form">
            <input onChange={titleOnChange} className="inputBox" type="text" value={form.title}/><br/>
            <br/>
            <br/>
            <textarea onChange={areaOnChange} value={form.text} rows="8" cols="100"></textarea>
            <br/>
            <br/>
            {id ?
              <button className='test' onClick={EditStory}>Edit</button>
              :
              <button className='test' onClick={submit}>Save</button>
            }

            {/* <div className='modal'>
              <img src={Load} className='noData'/>
            </div> */}

            {/* <button className='test' onClick={submit}>Save</button> */}
            
            
        </div>
    </div>
}
export default withNavigateHook(PostStory);