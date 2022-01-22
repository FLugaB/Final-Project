import React, { useState } from "react";
import CardSlider from "../../components/Card/CardSlider";
export default function JoinRoom() {
  const [room, setRoom] = useState(null);
  const [roomOwner, setRoomOwner] = useState(null);

  const onSubmit = () => {
    console.log('masuk click CUSTOMERS');
    window.location.assign(`/video/${room}`);
  };

  const onSubmitOwner = () => {
    console.log('masuk click OWNER JOIN');
    window.location.assign(`/video-owner/${roomOwner}`);
  };

  return (
    <div className="mt-5 carousel">
      <div style={{marginTop: 100}}>
        <h1 className="slider_title">Doctor</h1>
        <CardSlider />
        <input type="text" onChange={(e) => setRoom(e.target.value)} />
        <button onClick={onSubmit}>Submit CUSTOMERS</button>

        <br />
        <br />
        <input type="text" onChange={(e) => setRoomOwner(e.target.value)} />
        <button onClick={onSubmitOwner}>Submit OWNER</button>
      </div>

    </div>

    
  );
}
