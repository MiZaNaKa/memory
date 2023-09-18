
import { Link } from "react-router-dom";
import React, {  useEffect,useState} from 'react';
import Logo from "../img/podcast.png"
import Google from "../img/google.png"

import loginHelper from '../jwtHelper/jwtHelper'
import Drawer from 'react-modern-drawer'
import Close from "../img/close.png"
import 'react-modern-drawer/dist/index.css'
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

    const [isOpen, setIsOpen] = React.useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }


    
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
                    <img onClick={toggleDrawer} src={userInfo.profileImage} className="logoIcon"/>
                    :
                    <a href='http://localhost:3000/users/auth/google'>
                        <img src={Google} className="logoIcon"/>
                    </a>
                }

                
                <Drawer
                    open={isOpen}
                    onClose={toggleDrawer}
                    direction='left'
                    className='bla bla bla'
                >
                    <div style={{marginTop:40}}>
                        <img onClick={toggleDrawer}  src={Close} className="menuClose"/>
                        <div style={{marginBottom:25,textAlign:'center'}}>
                            <Link  className="link" to="/MyStoryList">
                                My Story
                            </Link>
                        </div>

                        <div style={{marginBottom:25,textAlign:'center'}}>
                            <Link className="link" to="/PostStory">
                                Post Story
                            </Link>
                        </div>

                        <div style={{marginBottom:25,textAlign:'center'}}>
                            <p onClick={logOut} className="logout">Log Out</p>
                        </div>
                        
                    </div>
                </Drawer>
                
                
            </div>

        </div>

        
        {/* <h1 className='text'>kktkkt</h1>
        <Link to="/">Home</Link>
        <FontAwesomeIcon icon={faCoffee} size="6x"/> */}
    </div>
}
export default Home