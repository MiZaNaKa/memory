
import React, {  useEffect,useState} from 'react';
import { BrowserRouter as Router, Routes, Route,useNavigate,Navigate } from "react-router-dom";
import SuccessfullyLogin from "./component/SuccessfullyLogin";
import PostStory from "./component/PostStory";
import Story from "./component/Story";
import StoryAll from "./component/MyStoryList";
import StoryDetail from "./component/StoryDetail";
import loginHelper from './jwtHelper/jwtHelper'

function App() {
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserInfo = async () => {
      const data = await loginHelper.UserInfo()
      setUser(data)
      // if(!data){
      //   navigate('/')
      // }
      
    }
  
    getUserInfo()
    .catch(console.error);
  }, [])
  return (
      <div>
        {user ?
          <Routes>
            <Route  path="/" element={<Story />}/>
            <Route path="/PostStory" element={<PostStory />} />
            <Route path="/PostStory/:id" element={<PostStory />} />
            
            
            <Route  path="/StoryDetail/:id" element={<StoryDetail />} />
            <Route  path="/MyStoryList" element={<StoryAll />}/>
            
          </Routes>
          :

          <Routes>
            <Route  path="/" element={<Story />}/>
            <Route path="/SuccessfullyLogin/:id" element={<SuccessfullyLogin />} />
            <Route path="/" element={<Story />} />
          	<Route path="*" element={<Navigate to="/" />} />
          </Routes>

        }
        {/* <Routes>
          <Route  path="/" element={<Story />}/>
          <Route path="/PostStory" element={<PostStory />} />
          <Route path="/PostStory/:id" element={<PostStory />} />
          <Route path="/SuccessfullyLogin" element={<SuccessfullyLogin />} />
          
          <Route  path="/StoryDetail/:id" element={<StoryDetail />} />
          <Route  path="/MyStoryList" element={<StoryAll />}/>
          
        </Routes> */}
      </div>
  );
}

export default App