import React, {  useEffect,useState,useRef } from 'react';
import Header from "./Header"
import { Link } from "react-router-dom";
import loginHelper from '../jwtHelper/jwtHelper'
import Action from '../action/LoginAction'
import Store from '../store/loginStore'
import withNavigateHook from '../common/Navigate'
import '../commonStyle/commonStyle.css'
import Google from "../img/google.png"
import Gmail from "../img/gmail.png"
import SimpleReactValidator from 'simple-react-validator';


function Login(props){
    var detail=Store.getDetail()
    var tempoDataAll=Store.getTempoData()
    const[form,setForm]=useState(detail)
    const[tempoData,setTempoData]=useState(tempoDataAll)
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, forceUpdate] = useState();

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
        }
    }


    const emailOnChange=(value)=>{
      setTempoData({ ...tempoData, message: "" });
      setForm(prevState => ({
        ...prevState,
        email: value.target.value
      }));
    }

    const passwordOnChange=(value)=>{
      setTempoData({ ...tempoData, message: "" });
      setForm(prevState => ({
        ...prevState,
        password: value.target.value
      }));
    }

    const Login=()=>{
      setTempoData({ ...tempoData, message: "" });
      const formValid = simpleValidator.current.allValid()
      if (!formValid) {
        simpleValidator.current.showMessages()
        forceUpdate(1)
      }
      else{
        Action.LoginAction(form)
      }
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
            <input placeholder='password' onChange={passwordOnChange} className="inputBox" type="password" value={form.password}/>
            <br/>
            {simpleValidator.current.message('password', form.password, 'required') ?
              <div>
                <p className='text'>{simpleValidator.current.message('password', form.password, 'required') }</p>
              </div>
              :
              <br/>
            }
            {tempoData.loading ?
              <button className='postActionButton'>Loading</button>               
              :
              <div>
                <button className='postActionButton' onClick={Login}>Login</button>
              </div>
            }
            <div>

            <div style={{marginTop:30}}>
              <Link className="link" to="/CreateAccount">
                <img style={{marginRight:30}} src={Gmail} className="logoIcon"/>
              </Link>

              <Link className="link" to="http://localhost:3000/users/auth/google">
                <img src={Google} className="logoIcon"/>
              </Link>
            </div>
            </div>
            <p className='text'>{tempoData.message}</p>
        </div>
    </div>
}
export default withNavigateHook(Login);