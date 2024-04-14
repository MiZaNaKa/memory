import React, {  useEffect,useState,useRef } from 'react';
import Header from "./Header"
import loginHelper from '../jwtHelper/jwtHelper'
import Action from '../action/CreateAccountAction'
import Store from '../store/CreateAccountStore'
import withNavigateHook from '../common/Navigate'
import '../commonStyle/commonStyle.css'
import SimpleReactValidator from 'simple-react-validator';


function CreateAccount(props){
    
    var detail=Store.getDetail()
    var tempoDataAll=Store.getTempoData()
    const[form,setForm]=useState(detail)
    const[tempoData,setTempoData]=useState(tempoDataAll)
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, forceUpdate] = useState();
    const[passwordMatch,setPasswordMatch]=useState(false)

    useEffect(() => {
      Store.addListener(onStoreChange)
    }, []);

    useEffect(() => {
      Store.addListener(onStoreChange)
      const getUserInfo = async () => {
        const data = await loginHelper.UserInfo()
        if(data){
          props.navigation('/')
        }
      }
      getUserInfo()
        .catch(console.error);
    }, [])

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
      if(form.password===form.retypePassword){
        setPasswordMatch(false)
        Action.createAccountAPI(form)
      }
      else{
        setPasswordMatch(true)
      }
      
    }

    const getOtpForCreateAcc=()=>{
      const formValid = simpleValidator.current.allValid()
      if (!formValid) {
        simpleValidator.current.showMessages()
        forceUpdate(1)
      }
      else{
        if(form.password===form.retypePassword){
          setPasswordMatch(false)
          Action.getOtpForCreateAcc(form.email)
        }
        else{
          setPasswordMatch(true)
        }
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
                <p className='text'>{simpleValidator.current.message('retypePassword', form.retypePassword, 'required') }</p>
              </div>
              :
              <br/>
            }

            {passwordMatch ?
              <div>
                <p className='text'>Password is not match</p>
              </div>
              :
              null
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