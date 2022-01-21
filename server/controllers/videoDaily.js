const axios = require("axios");

    const API_KEY = "6a879d7e4dd4d3d5824dded02867527f781a72b79a1ada7bb665e0b570552b4e";

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + API_KEY,
    };
    
    const getRoom = (room) => {
      return axios(`https://api.daily.co/v1/rooms/${room}`, {
        method: "GET",
        headers,
      })
        .then((response) => {
          return response.data;
        })
        .catch((err) => console.error("error:" + err));
    };

    const createRoom = (room) => {
      return axios("https://api.daily.co/v1/rooms", {
        method: "POST",
        headers,
        body: JSON.stringify({
          name: room,
          properties: {
            enable_screenshare: true,
            enable_chat: true,
            start_video_off: true,
            start_audio_off: false,
            lang: "en",
          },
        }),
      })
        .then((res) => res.data.json())
        .then((json) => {
          return json;
        })
        .catch((err) => console.log("error:" + err));
    };

const videoDaily = async (req, res, next) => {
  try {

    const roomId = req.params.id;

    const room = await getRoom(roomId);
    if (room.error) {
      const newRoom = await createRoom(roomId);
      res.status(200).send(newRoom);
    } else {
      res.status(200).send(room);
    }

  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = videoDaily;
