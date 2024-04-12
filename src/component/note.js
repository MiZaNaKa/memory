
// import React, {  useEffect,useState} from 'react';
// import { BrowserRouter as Router, Routes, Route,useNavigate,Navigate } from "react-router-dom";
// import SuccessfullyLogin from "./component/SuccessfullyLogin";
// import PostStory from "./component/PostStory";
// import Story from "./component/Story";
// import StoryAll from "./component/MyStoryList";
// import StoryDetail from "./component/StoryDetail";
// import Author from "./component/Author";
// import Login from "./component/Login";
// import UpdatePassword from "./component/updatePassword";
// import loginHelper from './jwtHelper/jwtHelper'
// import CreateAccount from "./component/CreateAccount";


// function App() {
//   const [user, setUser] = React.useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getUserInfo = async () => {
//       const data = await loginHelper.UserInfo()
//       setUser(data)
//       // if(!data){
//       //   navigate('/')
//       // }
      
//     }
  
//     getUserInfo()
//     .catch(console.error);
//   }, [])
//   return (
//       <div>
//         {/* <Author/> */}
//         {/* {user ?
//           <Routes>
//             <Route  path="/" element={<Story />}/>
//             <Route path="/PostStory" element={<PostStory />} />
//             <Route path="/PostStory/:id" element={<PostStory />} />
//             <Route path="/AuthorList/:id" element={<Author />} />
            
            
//             <Route  path="/StoryDetail/:id" element={<StoryDetail />} />
//             <Route  path="/MyStoryList" element={<StoryAll />}/>
            
//           </Routes>
//           :

//           <Routes>
//             <Route  path="/" element={<Story />}/>
//             <Route path="/SuccessfullyLogin/:id" element={<SuccessfullyLogin />} />
//             <Route path="/" element={<Story />} />
//           	<Route path="*" element={<Navigate to="/" />} />
            
//           </Routes>

//         } */}

       


//         <Routes>
//           <Route  path="/" element={<StoryAll />}/>
//           <Route  path="/UpdatePassword/:id" element={<UpdatePassword />}/>
//           <Route  path="/Login" element={<Login />}/>
         
//           <Route path="/PostStory" element={<PostStory />} />
//           <Route path="/PostStory/:id" element={<PostStory />} />
//           <Route path="/SuccessfullyLogin/:id" element={<SuccessfullyLogin />} />
//           <Route path="/AuthorList/:id" element={<Author />} />
//           <Route  path="/StoryDetail/:id" element={<StoryDetail />} />
//           <Route  path="/MyStoryList" element={<StoryAll />}/>
//           <Route  path="/CreateAccount" element={<CreateAccount />}/>

          
//         </Routes>
//       </div>
//   );
// }

// export default App


import React, {  useEffect,useState} from 'react';
import { BrowserRouter as Router, Routes, Route,useNavigate,Navigate } from "react-router-dom";
import SuccessfullyLogin from "./component/SuccessfullyLogin";
import PostStory from "./component/PostStory";
import Story from "./component/Story";
import StoryAll from "./component/MyStoryList";
import StoryDetail from "./component/StoryDetail";
import Author from "./component/Author";
import loginHelper from './jwtHelper/jwtHelper'
import Login from "./component/Login"
import PrivateRoute from "./component/auth/PrivateRoute";




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
        {/* <Author/> */}
        {/* {user ?
          <Routes>
            <Route  path="/" element={<Story />}/>
            <Route path="/PostStory" element={<PostStory />} />
            <Route path="/PostStory/:id" element={<PostStory />} />
            <Route path="/AuthorList/:id" element={<Author />} />
            
            
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

        } */}

        <Router>
          <Routes>
            <Route
                exact
                path="/"
                element={<Story />}
            ></Route>
            
            <Route path="/PostStory" element={<PrivateRoute Component={PostStory} />} />
            <Route exact path="/PostStory/:id" element={<PrivateRoute Component={PostStory} />} />
            <Route exact  path="/SuccessfullyLogin/:id" element={<PrivateRoute Component={SuccessfullyLogin} />} />
            <Route exact  path="/AuthorList/:id" element={<PrivateRoute Component={Author} />} />
            <Route exact  path="/StoryDetail/:id" element={<PrivateRoute Component={StoryDetail} />} />
            <Route exact  path="/MyStoryList" element={<PrivateRoute Component={StoryAll} />} />

            <Route
              exact
              path="/Login"
              element={<Login />}
            />

          {/* <Route  path="/" element={<Story />}/>
          <Route path="/PostStory" element={<PostStory />} />
          <Route path="/PostStory/:id" element={<PostStory />} />
          <Route path="/SuccessfullyLogin/:id" element={<SuccessfullyLogin />} />
          <Route path="/AuthorList/:id" element={<Author />} />
          <Route  path="/StoryDetail/:id" element={<StoryDetail />} />
          <Route  path="/MyStoryList" element={<StoryAll />}/> */}
          </Routes>
        </Router>

       


        {/* <Routes>
          <Route  path="/" element={<Story />}/>
          <Route path="/PostStory" element={<PostStory />} />
          <Route path="/PostStory/:id" element={<PostStory />} />
          <Route path="/SuccessfullyLogin/:id" element={<SuccessfullyLogin />} />
          <Route path="/AuthorList/:id" element={<Author />} />
          <Route  path="/StoryDetail/:id" element={<StoryDetail />} />
          <Route  path="/MyStoryList" element={<StoryAll />}/>
          
        </Routes> */}
      </div>
  );
}

export default App