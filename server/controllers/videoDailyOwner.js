const axios = require("axios");

const API_KEY =
  "6a879d7e4dd4d3d5824dded02867527f781a72b79a1ada7bb665e0b570552b4e";

const headers = {
  // Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + API_KEY,
};

const headerTokenDoctor = {
  'authorization': 'Bearer ' + API_KEY,
  'content-type': 'application/json',
  'Content-Type': 'application/json; charset=UTF-8'
}

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
console.log(getRoom, "getRoom");


const videoDaily = async (req, res, next) => {
  try {
    const roomId = req.params.id;
    const roomGET = await getRoom(roomId);
    console.log(roomGET, "roomget");

    const result = await axios('https://api.daily.co/v1/meeting-tokens', {
        method: 'POST',
        headers: headerTokenDoctor,
        data: JSON.stringify({
          "properties": {
            "is_owner":true,
            "user_name":"Doctor Vera", 
            "room_name":"DrVera"
        }})
    });
    console.log(result.data, "result");

  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = videoDaily;
