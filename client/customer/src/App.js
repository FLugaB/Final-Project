import { useEffect, useState } from 'react'

import HomePage from "./pages/HomePage.jsx";
import Navbar from './components/Navbar/Navbar'
import Login from './pages/Login'
import Dashboard from "./pages/Dashboard.jsx";
import Navigator from "./routes";
import { Routes, Route } from "react-router-dom";
// import { auth } from './firebase.js'
// import { useAuthState } from 'react-firebase-hooks/auth'

import VideoCall from "./pages/video/Meeting.jsx";
import JoinMeeting from "./pages/video/Join.jsx";
import Notif from './components/Notif' 
import { pageLoad } from './Hooks/load'


import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";


function App() {

  const [loader, setLoader] = useState(true)

  useEffect(() => {
    setTimeout( () => {
      setLoader(false)
    }, 5000)
  }, [])

  useEffect(() => {
    const snapSrcUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';
    const myMidtransClientKey = 'SB-Mid-client-a4h5p1uZna2ekBBq';
  
    const script = document.createElement('script');
    script.src = snapSrcUrl;
    script.setAttribute('data-client-key', myMidtransClientKey);
    script.async = true;
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  const mode = 'login';

  if (loader) return pageLoad()


  return (
    <div className="App">
      <Navbar />
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notification/handling" element={<Notif />} />
          <Route path="/start-video" element={<JoinMeeting />} />
          <Route path="/video/:id" element={<VideoCall />} />
          <Route path="/login" element={< Login mode={mode} />} />
      </Routes>
    </div>
  );
}

export default App;
