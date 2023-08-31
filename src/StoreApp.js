
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Story from "./component/Story";
import LoginByGoogle from "./loginByGoogle";
import SuccessfullyLogin from "./component/SuccessfullyLogin";
import PostStory from "./component/PostStory";
import MyStoryList from "./component/MyStoryList";

import StoryDetail from "./component/StoryDetail";
import Myo from "./Myo";
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
const App = () => {
  return (
    <Router>
      <Routes history={history}>
        <Route  path="/" element={<Story />}/>
        <Route path="/Story" element={<Story />} />
        <Route path="/Myo" element={<Myo />} />
        <Route path="/LoginByGoogle" element={<LoginByGoogle />} />
        <Route path="/SuccessfullyLogin/:id" element={<SuccessfullyLogin />} />
        <Route path="/PostStory" element={<PostStory />} />
        <Route path="/PostStory/:id" element={<PostStory />} />
        <Route path="/MyStoryList" element={<MyStoryList />} />
        <Route path="/StoryDetail/:id" element={<StoryDetail />} />
        

        
      </Routes>
    </Router>
  );
};

export default App;