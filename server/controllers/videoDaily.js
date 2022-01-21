const axios = require("axios");


    
    const API_KEY =
      "6a879d7e4dd4d3d5824dded02867527f781a72b79a1ada7bb665e0b570552b4e";

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + API_KEY,
    };
    
    const getRoom = (room) => axios({
      method: "GET",
      url: `https://api.daily.co/v1/rooms/${room}`,
      headers
    })

    

    // .then((res) => res.json())
    // .then((json) => {
    //   return json;
    // })
    // .catch((err) => console.error("error:" + err));

    const createRoom = (room) => axios({
      method: "POST",
      url: `https://api.daily.co/v1/rooms`,
      headers,
      body: getRoom
    })

const videoDaily = async (req, res, next) => {
  try {
    const roomId = req.params.id;
    // const instance = axios.create({
    //   baseURL: "https://api.daily.co/v1/rooms",
    // });

    const room = await getRoom(roomId);
    if (room.error) {
      const newRoom = await createRoom(roomId);
      res.status(200).send(newRoom);
    } else {
      res.status(200).send(room);
    }

    console.log(room, "ROOM");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = videoDaily;
