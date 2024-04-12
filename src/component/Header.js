
import { Link } from "react-router-dom";
import React, {  useEffect,useState} from 'react';
import Logo from "../img/podcast.png"
import Google from "../img/google.png"

import loginHelper from '../jwtHelper/jwtHelper'
import Drawer from 'react-modern-drawer'
import Close from "../img/close.png"
import Menu from "../img/menu.png"
import User from "../img/user.png"
import 'react-modern-drawer/dist/index.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import '../commonStyle/commonStyle.css'
function Home(){
    const[name,setName]=useState('')
    const[userInfo,setUserInfo]=useState('')
    useEffect(() => {
        const getUserInfo = async () => {
          const data = await loginHelper.UserInfo()
          if(data){
            setUserInfo(data)
            const myArray = data.name.split(" ")
            setName(myArray[0])
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
            {userInfo ?
                <div>
                    <div className="logo1">
                        <Link className="link">
                            <img onClick={toggleDrawer} src={Menu} className="menuIcon"/>
                        </Link>
                    </div>
                    <div className="logo2">
                        <Link className="link" to="/">
                            <img src={Logo} className="logoIcon"/>
                        </Link>
                    </div>
                </div>
                :
                <div className="logo">
                    <Link className="link" to="/">
                        <img src={Logo} className="logoIcon"/>
                    </Link>
                </div>
            }
            
            
    
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
                    <div>
                        {userInfo.profileImage ? 
                            <div>
                                <img  src={userInfo.profileImage} className="logoIcon"/>
                            </div>
                            :
                            <img  src={User} className="logoIcon"/>
                        }
                        <p>{name}</p>
                    </div>
                    
                    :
                    <div>
                        {/* <a style={{textDecoration:'none'}} href='http://localhost:3000/users/auth/google'>
                            <img src={Google} className="logoIcon"/>
                            <p style={{fontSize:14,color:'red'}}>Login</p>
                        </a> */}
                    </div>
                    
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