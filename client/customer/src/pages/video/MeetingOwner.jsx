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
          if (!res.data.token) {
            return (
              <h1>Wait For Second</h1>
            )
          }
          console.log("status server as Owner", res);
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
            url: "${domain}${id}?t=${res.data.token}",
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
