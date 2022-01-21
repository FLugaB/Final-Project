import "./App.css";
import Dashboard from "./pages/Dashboard.jsx";
import { Routes, Route } from "react-router-dom";
// import { auth } from './firebase.js'
// import { useAuthState } from 'react-firebase-hooks/auth'

import VideoCall from "./pages/video/Meeting.jsx";
import JoinMeeting from "./pages/video/Join.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/start-video" element={<JoinMeeting />} />
          <Route path="/video/:id" element={<VideoCall />} />
      </Routes>
      {/* <Dashboard /> */}
    </div>
  );
}

export default App;
