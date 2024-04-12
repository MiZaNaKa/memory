import React, { Component,setState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";

import SuccessfullyLogin from "./component/SuccessfullyLogin";
import PostStory from "./component/PostStory";
import Story from "./component/Story";
import StoryAll from "./component/MyStoryList";
import StoryDetail from "./component/StoryDetail";
import Author from "./component/Author";
import loginHelper from './jwtHelper/jwtHelper'
import Login from "./component/Login"
import Home from "./component/Home"
import PrivateRoute from "./component/auth/PrivateRoute";
import PagenotFound from "./component/PagenotFound/PageNotFound";
import CreateAccount from "./component/CreateAccount"

// import "./App.css";
// import "./css/style.css"
 
class App extends Component {
  constructor() {
    super();
    this.state = {favoritecolor: "red"}

    
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({favoritecolor: "yellow"})
    }, 1000)
  }
    render() {
        return (
          <div>

            <Routes>
              <Route  path="/" element={<Story />}/>
              <Route path="/PostStory" element={<PrivateRoute Component={PostStory} />} />
              <Route exact path="/PostStory/:id" element={<PrivateRoute Component={PostStory} />} />
              <Route exact  path="/SuccessfullyLogin/:id" element={<SuccessfullyLogin/>} />
              <Route exact  path="/AuthorList/:id" element={<PrivateRoute Component={Author} />} />
              <Route exact  path="/StoryDetail/:id" element={<PrivateRoute Component={StoryDetail} />} />
              <Route exact  path="/MyStoryList" element={<PrivateRoute Component={StoryAll} />} />
              <Route exact  path="/CreateAccount" element={<CreateAccount/>} />

              
              <Route
                exact
                path="/Login"
                element={<Login />}
              />
            </Routes>
          </div>
        );
    }
}
 
export default App;