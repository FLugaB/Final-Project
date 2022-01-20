import { useEffect } from 'react'
import "./App.css";
import HomePage from "./pages/HomePage.jsx";
import Navbar from './components/Navbar/Navbar'

function App() {

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

  const navbarLinks = [
    { url: "#", title: "Home" },
    { url: "#", title: "About" },
    { url: "#", title: "Contact" },
    { url: "#", title: "Service" },
    { url: "#", title: "Products" },
    { url: "#", title: "Consultation" },
  ];

  return (
    <div className="App">
      <Navbar navbarLinks={navbarLinks} />
      <HomePage />
    </div>
  );
}

export default App;
