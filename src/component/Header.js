
import { Link } from "react-router-dom";
import React, {  useEffect,useState} from 'react';
import Logo from "../img/podcast.png"
import Google from "../img/google.png"
import loginHelper from '../jwtHelper/jwtHelper'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import '../commonStyle/commonStyle.css'
function Home(){
    const[userInfo,setUserInfo]=useState('')
    useEffect(() => {
        const getUserInfo = async () => {
          const data = await loginHelper.UserInfo()
          if(data){
            setUserInfo(data)
          }
        }
        getUserInfo()
          .catch(console.error);
    }, [])

    
    const logOut=async()=>{
        const data = await loginHelper.deleteJWT()
        window.location.reload();
    }



    return <div className="header">
        <div className="headerBox clearfix">
            <div className="logo">
                <Link className="link" to="/">
                    <img src={Logo} className="logoIcon"/>
                </Link>
            </div>
    
            <div className="headercontent">
                
            </div>

            <div className="userInfo">
                {/* {userInfo ?
                    <div>
                        <img src={userInfo.profileImage} className="logoIcon"/>
                        <div>
                            <p onClick={logOut} className="logout">Log Out</p>
                        </div>
                        
                    </div>
                    
                    :
                    <a href='http://localhost:3000/users/auth/google'>
                        <img src={Google} className="logoIcon"/>
                    </a>
                } */}

                {userInfo ?
                    <ul>
                        <li id="visible">
                            <img src={userInfo.profileImage} className="logoIcon"/>
                            <ul id="hidden">
                                <li style={{marginBottom:10}}>
                                    <Link  className="link" to="/MyStoryList">
                                        My Story
                                    </Link>
                                </li>
                                <li>
                                    <Link className="link" to="/PostStory">
                                        Post Story
                                    </Link>
                                </li>
                                
                                <li><p onClick={logOut} className="logout">Log Out</p></li>
                            
                            </ul>
                        </li>
                    </ul>
                    :
                    <a href='http://localhost:3000/users/auth/google'>
                        <img src={Google} className="logoIcon"/>
                    </a>
                }
                
                
            </div>

        </div>

        
        {/* <h1 className='text'>kktkkt</h1>
        <Link to="/">Home</Link>
        <FontAwesomeIcon icon={faCoffee} size="6x"/> */}
    </div>
}
export default Home