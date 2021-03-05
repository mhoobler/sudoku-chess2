import axios from "axios";

const API = {
  getGamesByUid: (uid: string) => {
    return axios.get("/_replays", { params: { uid } });
  },
  getReplay: (_id: string) => {
    return axios.get("/_replay", { params: { _id } });
  },
};

export default API;
