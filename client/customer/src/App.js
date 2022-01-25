import { useEffect, useState } from "react";

import HomePage from "./pages/HomePage.jsx";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import VideoCall from "./pages/video/Meeting.jsx";
import VideoCallOwner from "./pages/video/MeetingOwner.jsx";
import Dashboard from "./pages/Dashboard";
import JoinMeeting from "./pages/video/Join.jsx";
import Notif from "./components/Notif";
import NotFound from "./pages/NotFound";
import ProfileOutlet from "./components/DashboardComponents/ProfileOutlet";
import CartOutlet from "./components/DashboardComponents/CartOutlet";
import HistoryOutlet from "./components/DashboardComponents/HistoryOutlet";
import DetailCheckOut from "./components/DashboardComponents/DetaiCheckOut";
import DoctorDetail from "./components/DoctorDetail.jsx";
import ConsultationRequest from "./components/ConsultationRequest/ConsultationRequest.jsx";
import { pageLoad } from "./Hooks/load";

import { RoutesGuard, LogGuard } from "./routes/RoutesGuard";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { LogoutComponent } from "./components/Logout.jsx";
import CardTicket from "./components/Card/CardTicket.jsx";
import ProductPage from "./pages/Products.jsx";

function App() {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 5000);
  }, []);

  const mode = "login";

  if (loader) return pageLoad();

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="account" element={
          <RoutesGuard>
            <Dashboard />
          </RoutesGuard>
        }>
    
          <Route path="profile" element={<ProfileOutlet />} />
          <Route path="cart" element={<CartOutlet />} />
          <Route path="checkout" element={<DetailCheckOut />} />
          <Route path="history" element={<HistoryOutlet />} />
          {/* <Route path="logout" element={ <ProfileOutlet />} /> */}
          <Route path="consultation" element={<CardTicket />} />
          <Route
            path="consultation-request"
            element={<ConsultationRequest />}
          />
    
        </Route>

        <Route path="/notification/handling" element={<Notif />} />
        <Route path="/products" element={ <ProductPage/> } />
        <Route path="/doctors" element={<JoinMeeting />} />
        <Route path="/doctors/:id" element={<DoctorDetail />} />
        
        <Route path="/video/:id" element={<VideoCall />} />
        <Route path="/video-owner/:id" element={<VideoCallOwner />} />

        <Route
          path="/login"
          element={
            <LogGuard>
              <Login mode={mode} />
            </LogGuard>
          }
        />
        <Route path="logout" element={<LogoutComponent />} />
        <Route path="*" exact element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}
// https://dailyphil.daily.co/test-room?t=INSERT_TOKEN_HERE
export default App;
