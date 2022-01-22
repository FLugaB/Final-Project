import React, { useState } from "react";

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
    <div style={{marginTop: 100}}>
      <input type="text" onChange={(e) => setRoom(e.target.value)} />
      <button onClick={onSubmit}>Submit CUSTOMERS</button>

      <br />
      <br />
      <br />
      <br />
      <input type="text" onChange={(e) => setRoomOwner(e.target.value)} />
      <button onClick={onSubmitOwner}>Submit OWNER</button>
    </div>

    
  );
}
