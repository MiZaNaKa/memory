import React, {  useEffect,useState} from 'react';
import Header from "./Header"
import loginHelper from '../jwtHelper/jwtHelper'
import Action from '../action/PostStoryAction'
import Store from '../store/PostStoryStore'
import withNavigateHook from '../common/Navigate'
import '../commonStyle/commonStyle.css'
import { Bars } from 'react-loading-icons'
import Load from "../img/loading.gif"

import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


function PostStory(props){
    Store.clearAll()
    var detail=Store.getDetail()
    var tempoDataAll=Store.getTempoData()

    var id =props.params.id
    const[userInfo,setUserInfo]=useState('')
    const[form,setForm]=useState(detail)
    const[tempoData,setTempoData]=useState(tempoDataAll)
    useEffect(() => {
        const getUserInfo = async () => {
          const data = await loginHelper.UserInfo()
          if(data){
            setUserInfo(data)
          }
          // else{
          //   props.navigation('/')
          // }
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

        var tempoDataAll=Store.getTempoData()  
       
        setTempoData(shopCart => ({
          ...shopCart,
          ...tempoDataAll
        }));
        // setTempoData(JSON.stringify(tempoDataAll))      
        setForm(detail)
       
        if(login){
          // Action.clearAllStoryPostNEdit()
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
        Action.IconAction()
        Action.postStoryAction(form)
      }
    }


    const EditStory=()=>{
      if(form.title && form.text){
        Action.editStoryAction(form,id)
      }
    }

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
      setIsOpen(true);
    }

    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }

    function closeModal() {
      setIsOpen(false);
    }

    function clearNCloseInStory() {
      Action.clearNCloseInStory()
    }

    

    return <div>
        <Header/>
        <div className="form">
            {tempoData.loading ?
              <input disabled onChange={titleOnChange} className="inputBox" type="text" value={form.title}/>
              :
              <input onChange={titleOnChange} className="inputBox" type="text" value={form.title}/>
            }
            <br/>
            
            <br/>
            <br/>
            {tempoData.loading ?
              <textarea  disabled onChange={areaOnChange} value={form.text} rows="5" cols="100"></textarea>
              :
              <textarea style={{paddingLeft:15}} onChange={areaOnChange} value={form.text} rows="5" cols="100"></textarea>
            }
            
            <br/>
            <br/>
            <div>
              {tempoData.loading ?
                <button className='postActionButton'>Loading</button>               
                :
                <div>
                  {id ?
                    <button className='postActionButton' onClick={EditStory}>Edit</button>
                    :
                    <button className='postActionButton' onClick={submit}>  Save</button>
                  }
                </div>
              }

              {/* {tempoData.success ?
                <div className='modal'>
                  <p>Waiting for admin approve.</p>
                  <button  onClick={submit}>Okay</button>
                </div>
                :
                null
              } */}


    
            <Modal
              isOpen={tempoData.success}
              onAfterOpen={afterOpenModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Waiting for admin approve</h2>
              <button className='closeButton' onClick={clearNCloseInStory}>close</button>
            </Modal>
              

              

            </div>
            

            

            {/* <button className='test' onClick={submit}>Save</button> */}
            
            
        </div>
    </div>
}
export default withNavigateHook(PostStory);