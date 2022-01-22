import React, { useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";

import { useParams  } from "react-router-dom";

export default function Video({ match }) {

  const { id } = useParams();
  
  useEffect(() => {
    const domain = "https://forsythiateam.daily.co/";

    axios
      .get(`http://localhost:3000/video-call-owner/${id}`)
      .then((res) => {
        console.log(`tersend OWNER`);
        if (res.status === 200) {
          console.log("status ", res.status);
          const script = document.createElement("script");
          script.innerHTML = `window.DailyIframe.createFrame({
            iframeStyle: {
              position: "relative",
              width: "100%",
              height: "90vh",
              border: "0",
              zIndex: 9
            },
            showLeaveButton: true,
            showFullscreenButton: true,
          }).join({
            url: "${domain}${id}?t=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvIjp0cnVlLCJ1IjoiRG9jdG9yIFZlcmEiLCJyIjoiRHJWZXJhIiwiZCI6IjBjZTAyOTY2LWQ5MTItNGRiMC04NWNhLTEyMDAzNDA0ODg0MyIsImlhdCI6MTY0Mjg1MjM3NX0.f9taHR_Hab_djWy1hw8wej2IiM3M3bp3d4V789jjLcU",
          });`;

          document.body.appendChild(script);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  

  return (
    <div className="meeting-container">
      {/* <h1>Hope you enjoyed our services</h1>
      <Link to="/">Back to Home</Link> */}
    </div>
  )
}
