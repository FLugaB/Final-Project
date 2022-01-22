import { useEffect, useState } from 'react'

import HomePage from "./pages/HomePage.jsx";
import Navbar from './components/Navbar/Navbar'
import Login from './pages/Login'
import { Routes, Route } from "react-router-dom";
import VideoCall from "./pages/video/Meeting.jsx";
import VideoCallOwner from "./pages/video/MeetingOwner.jsx";
import JoinMeeting from "./pages/video/Join.jsx";
import Notif from './components/Notif' 
import { pageLoad } from './Hooks/load'

import { RoutesGuard, LogGuard } from "./routes/RoutesGuard"

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
    const snapSrcUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey = "SB-Mid-client-a4h5p1uZna2ekBBq";

    const script = document.createElement("script");
    script.src = snapSrcUrl;
    script.setAttribute("data-client-key", myMidtransClientKey);
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

<<<<<<< HEAD
  const navbarLinks = [
    { url: "/", title: "Home" },
    { url: "#", title: "About" },
    { url: "#", title: "Contact" },
    { url: "#", title: "Service" },
    { url: "#", title: "Products" },
    { url: "#", title: "Consultation" },
  ];
=======
  const mode = 'login';

  if (loader) return pageLoad()

>>>>>>> db19500a6d1c7e313f79ea0896ca5c0c12f05c8b

  return (
    <div className="App">
      <Navbar />
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<HomePage />} />
        <Route path="/start-video" element={<JoinMeeting />} />
        <Route path="/video/:id" element={<VideoCall />} />
        <Route path="user" element={<UserPage />}></Route>
        <Route path="doctor" element={<UserPageDoctor />}></Route>
=======
          <Route path="/" element={<HomePage />} />
          <Route path="/notification/handling" element={<Notif />} />
          <Route path="/start-video" element={<JoinMeeting />} />
          <Route path="/video/:id" element={<VideoCall />} />
          <Route path="/video-owner/:id" element={<VideoCallOwner />} />

          <Route path="/login" element={
            <LogGuard>
              <Login mode={mode} />
            </LogGuard>
          } />
          
>>>>>>> db19500a6d1c7e313f79ea0896ca5c0c12f05c8b
      </Routes>
    </div>
  );
}

export default App;
