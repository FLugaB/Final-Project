import React, { useState } from "react";

export default function JoinRoom() {
  const [room, setRoom] = useState(null);

  const onSubmit = () => {
    console.log('masuk click');
    window.location.assign(`/video/${room}`);
  };

  return (
    <div className="mt-5 pt-5">
      <input type="text" onChange={(e) => setRoom(e.target.value)} />
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}
