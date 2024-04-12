import React, {  useEffect,useState,useRef } from 'react';
import Header from "./Header"
import Action from '../action/CreateAccountAction'
import Store from '../store/CreateAccountStore'
import withNavigateHook from '../common/Navigate'
import '../commonStyle/commonStyle.css'
import SimpleReactValidator from 'simple-react-validator';
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


function CreateAccount(props){
    // Store.clearAll()
    var detail=Store.getDetail()
    var tempoDataAll=Store.getTempoData()

    
    const[userInfo,setUserInfo]=useState(false)
    const[form,setForm]=useState(detail)
    const[tempoData,setTempoData]=useState(tempoDataAll)
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, forceUpdate] = useState();

    useEffect(() => {
      Store.addListener(onStoreChange)
    }, []);

    const onStoreChange = () => {
      var tempoDataAll=Store.getTempoData()  
      if(tempoDataAll.success){
        props.navigation('/')
      }
      else{
        
        setTempoData({ ...tempoData, message: tempoDataAll.message });
        setTempoData({ ...tempoData, getOTP: tempoDataAll.getOTP });
      }
    }

    const emailOnChange=(value)=>{
      setForm(prevState => ({
        ...prevState,
        email: value.target.value
      }));
      Action.emailOnChangeInCreateAcc(value.target.value)
    }

    const passwordOnChange=(value)=>{
      setForm(prevState => ({
        ...prevState,
        password: value.target.value
      }));
      Action.passwordOnChangeInCreateAcc(value.target.value)
    }

    const nameOnChange=(value)=>{
      setForm(prevState => ({
        ...prevState,
        name: value.target.value
      }));
      Action.nameOnChangeInCreateAcc(value.target.value)
    }

    const createAccountAPI=()=>{
      Action.createAccountAPI(form)
    }

    const getOtpForCreateAcc=()=>{
      const formValid = simpleValidator.current.allValid()
      if (!formValid) {
        simpleValidator.current.showMessages()
        forceUpdate(1)
      }
      else{
        Action.getOtpForCreateAcc(form.email)
      }
    }

    const otpOnChange=(value)=>{
      setForm(prevState => ({
        ...prevState,
        otp: value.target.value
      }));
    }

    const rePasswordOnChange=(value)=>{
      setForm(prevState => ({
        ...prevState,
        retypePassword: value.target.value
      }));
      Action.rePasswordOnChange(value.target.value)
    }

    return <div>
        <Header/>
        <div className="form">
            <input placeholder='email' onChange={emailOnChange} className="inputBox" type="text" value={form.email}/>
            <br/>
            
            {simpleValidator.current.message('email', form.email, 'required|email') ?
              <div>
                <p className='text'>{simpleValidator.current.message('email', form.email, 'required|email') }</p>
              </div>
              :
              <br/>
            }

            <input placeholder='Name' onChange={nameOnChange} className="inputBox" type="text" value={form.name}/>
            <br/>
            {simpleValidator.current.message('name', form.name, 'required') ?
              <div>
                <p className='text'>{simpleValidator.current.message('name', form.name, 'required') }</p>
              </div>
              :
              <br/>
            }
            <input placeholder='Password' onChange={passwordOnChange} className="inputBox" type="password" value={form.password}/>
            <br/>
            {simpleValidator.current.message('password', form.password, 'required') ?
              <div>
                <p className='text'>{simpleValidator.current.message('password', form.password, 'required') }</p>
              </div>
              :
              <br/>
            }

            <input placeholder='retypePassword' onChange={rePasswordOnChange} className="inputBox" type="password" value={form.retypePassword}/>
            <br/>
            {simpleValidator.current.message('retypePassword', form.retypePassword, 'required') ?
              <div>
                <p className='text'>
                  {/* {simpleValidator.message('retypePassword', form.retypePassword, `required|in:${form.password}`, {messages: {in: 'Passwords need to match!'}})}
                  {simpleValidator.message('retypePassword', form.retypePassword, `required|in:${form.password}`, {messages: {in: 'Passwords need to match!'}})} */}
                  {/* {simpleValidator.message('retypePassword', form.retypePassword, 'required|in:${form.password}') } */}
                </p>
              </div>
              :
              <br/>
            }


            
            {tempoData.getOTP ?
                <div>
                    <input minLength="6" maxLength="6" placeholder='OTP' onChange={otpOnChange} className="inputBox" type="number" value={form.otp}/>
                    <br/>
                    {simpleValidator.current.message('otp', form.otp, 'required') ?
                      <div>
                        <p className='text'>{simpleValidator.current.message('otp', form.otp, 'required') }</p>
                      </div>
                      :
                      <br/>
                    }
                    <button onClick={createAccountAPI} className='postActionButton'>Verify OTP</button>
                </div>    
                :
                <div>
                    <button onClick={getOtpForCreateAcc} className='postActionButton'>Get OTP</button>
                </div>
            }
            <p className='text'>{tempoData.message}</p>

            
        </div>
    </div>
}
export default withNavigateHook(CreateAccount);