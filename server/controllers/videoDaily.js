const axios = require("axios");

const API_KEY =
  "6a879d7e4dd4d3d5824dded02867527f781a72b79a1ada7bb665e0b570552b4e";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + API_KEY,
};

const headerTokenCustomers = {
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

const videoDaily = async (req, res, next) => {
  try {
    const roomId = req.params.id;
    const roomGET = await getRoom(roomId);
    const token = await axios('https://api.daily.co/v1/meeting-tokens', {
        method: 'POST',
        headers: headerTokenCustomers,
        data: JSON.stringify({
          "properties": {
            "user_name":"Customers", 
            "room_name":"DrVera"
        }})
    });
    console.log(token.data, "result");

    if (token.data) {
      res.status(200).send( {token: token.data.token, room: roomGET })
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = videoDaily;
