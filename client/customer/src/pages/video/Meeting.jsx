import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "../../components/Slider/Slider";
import { useParams  } from "react-router-dom";

import { pageLoad } from '../../Hooks/load'

export default function Video({ match }) {
  
  const { id } = useParams();

  const [isLocalLoad, setIsLocalLoad] = useState(true)
  
  useEffect(() => {
    const domain = "https://forsythiateam.daily.co/";

    // https://forsythiateam.daily.co/DrVera
    axios
      .get(`https://forsythia-server.herokuapp.com/video-call/${id}`)
      .then((res) => {
        console.log(`tersend CUSTOMERS ==================`, res.data);
        if (res.status === 200) {
          if (!res.data.token) {
            return (
              <h1>Wait For Second</h1>
            )
          }
          const script = document.createElement("script");
          script.innerHTML = `window.DailyIframe.createFrame({
            iframeStyle: {
              position: "fixed",
              width: "100%",
              height: "90vh",
              border: "0",
              zIndex: 9,
              top: 0
            },
            showLeaveButton: true,
            showFullscreenButton: true,
          }).join({
            url: "${domain}${res.data.room.name}?t=${res.data.token}",
          });`;

          document.body.appendChild(script);
          setIsLocalLoad(false)
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (isLocalLoad) return pageLoad()

  return (
    <div className="homepage-container">
      <div className="section-container video-joins">
        <h1>Thank You for using our Services</h1>
      </div>
    </div>
  );
}
