
import { Link } from "react-router-dom";
import React, {  useEffect,useState} from 'react';

import loginHelper from '../jwtHelper/jwtHelper'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import '../commonStyle/commonStyle.css'
function CreateStory(){
    const[userInfo,setUserInfo]=useState('')

    useEffect(() => {
        const getUserInfo = async () => {
          const data = await loginHelper.UserInfo()
          if(data){
            setUserInfo(data)
          }
          console.log(userInfo)
          console.log(userInfo)
        }
      
        // call the function
        getUserInfo()
          // make sure to catch any error
          .catch(console.error);
    }, [])
    return <div className="header">
        <form>
            <label for="fname">Title:</label><br/>
            <input type="text" id="fname" name="fname" value="Title"/><br/>

            <label for="fname">Story</label><br/>
            <input type="text" id="fname" name="fname" value="Story"/><br/>
        </form>
    </div>
}
export default CreateStory