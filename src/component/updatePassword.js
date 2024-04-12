import React, { useState, useRef,useEffect } from 'react';
import Header from "./Header"
import loginHelper from '../jwtHelper/jwtHelper'
import Action from '../action/updatePasswordAction'
import Store from '../store/updatePasswordStore'
import withNavigateHook from '../common/Navigate'
import '../commonStyle/commonStyle.css'
import { Bars } from 'react-loading-icons'
import Load from "../img/loading.gif"
import SimpleReactValidator from 'simple-react-validator';
import Modal from 'react-modal';




function UpdatePassword(props){
    Store.clearAll()
    var data=Store.getData()
    var tempoDataAll=Store.getTempoData()
    
    const[form,setForm]=useState(data)
    const[tempoData,setTempoData]=useState(tempoDataAll)
    const[check,setCheck]=useState(false)
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, forceUpdate] = useState();
    
    useEffect(() => {
      Store.addListener(onStoreChange)  
    }, []);

    const onStoreChange = () => {
        
        var tempoDataAll=Store.getTempoData()  
        
       
       
        if(tempoDataAll.success){
          props.navigation('/')
          window.location.reload();
        }
    }


    const passwordOnChange=(value)=>{
      setForm(prevState => ({
        ...prevState,
        password: value.target.value
      }));
    }

    const RePassOnChange=(value)=>{
        setForm(prevState => ({
          ...prevState,
          reTypePass: value.target.value
        }));
    }



    const Update=()=>{
      const formValid = simpleValidator.current.allValid()
      console.log('saving...')
      if (!formValid) {
        console.log('form not valid...')
        simpleValidator.current.showMessages()
        forceUpdate(1)
      }
      else{
        form.jwt=props.params.id
        Action.updatePassword(form)
      }
    }



    function showPass() {
      setCheck(!check)
    }

    

    return <div>
        <Header/>
        <div className="form">
            <input placeholder='Password' onChange={passwordOnChange} className="inputBox" type={check?"text":"password"} value={form.password}/>
            <br/>
            <p className='text'>{simpleValidator.current.message('password', form.password, 'required')}</p>
            <br/>
            <input placeholder='Re-password' onChange={RePassOnChange} className="inputBox" type={check?"text":"password"} value={form.reTypePass}/>
            <br/>
            <p className='text'>{simpleValidator.current.message('reTypePass', form.reTypePass, 'required')}</p>
            <br/>
            <div className='row'>
                <div onClick={showPass} style={{backgroundColor:check?"black":"white"}} className="showPass"></div>
                <p className='showPassword'>show password</p>
            </div>
            {tempoData.loading ?
                <button className='postActionButton'>Loading</button>               
                :
                <div>
                  <button className='postActionButton' onClick={Update}>Update</button>
                </div>
              }
        </div>
    </div>
}
export default withNavigateHook(UpdatePassword);