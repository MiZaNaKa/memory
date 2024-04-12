import React, {  useEffect,useState} from 'react';
import Header from "./Header"
import { Link } from "react-router-dom";
import loginHelper from '../jwtHelper/jwtHelper'
import Action from '../action/LoginAction'
import Store from '../store/loginStore'
import withNavigateHook from '../common/Navigate'
import '../commonStyle/commonStyle.css'
import { Bars } from 'react-loading-icons'
import Load from "../img/loading.gif"
import Google from "../img/google.png"
import Gmail from "../img/gmail.png"
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


function Login(props){
    // Store.clearAll()
    var detail=Store.getDetail()
    var tempoDataAll=Store.getTempoData()

    var id =props.params.id
    const[userInfo,setUserInfo]=useState('')
    const[form,setForm]=useState(detail)
    const[tempoData,setTempoData]=useState(tempoDataAll)
    

    useEffect(() => {
      Store.addListener(onStoreChange)
      if(id){
        Action.getMyDetailStory(id)
      }
      
    }, []);

    const onStoreChange = () => {
        var tempoDataAll=Store.getTempoData()  
        if(tempoDataAll.success){
          props.navigation('/')
        }
        else{
          setTempoData(tempoDataAll)
        }
    }


    const emailOnChange=(value)=>{
      setForm(prevState => ({
        ...prevState,
        email: value.target.value
      }));
    }

    const passwordOnChange=(value)=>{
        setForm(prevState => ({
          ...prevState,
          password: value.target.value
        }));
    }

    const Login=()=>{
      if(form.email && form.password){
        Action.LoginAction(form)
      }
    }

    return <div>
        <Header/>
        <div className="form">
            <input placeholder='email' onChange={emailOnChange} className="inputBox" type="text" value={form.email}/>
            <br/>
            <br/>
            <input placeholder='password' onChange={passwordOnChange} className="inputBox" type="text" value={form.password}/>
            <br/>
            <br/>
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