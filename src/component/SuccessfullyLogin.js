import React, {  useEffect, useState,useRef} from 'react';
import { useParams } from 'react-router-dom';
import Action from "../action/SuccessfullyLoginAction"
import Store from "../store/SuccessfullyLoginStore"
import Header from "./Header"
import withNavigateHook from '../common/Navigate'

function Hello (props){
    let userId = useParams();
    var login=Store.getsuccessfullyLogin()
    const[getlogin,setLogin]=useState(login)
    
    useEffect(() => {
        if(userId){
            var token =userId.id
            Action.successfullyLogin(token)
        }
        
    }, []);

    useEffect(() => {
        Store.addListener(onStoreChange)
    }, []);

    const onStoreChange = () => {
       
        var login=Store.getsuccessfullyLogin()
       
        setLogin(login)
       
       
        if(login=='success'){
            props.navigation('/')
        }
    }

    const test=()=>{
        props.navigation('/Myo')
    }

    return<div>
        <Header/>
        <h1 onClick={test}>SuccessfullyLogin</h1>
        <button title='onclick' onClick={test}>345345</button>
    </div>
}

export default withNavigateHook(Hello);