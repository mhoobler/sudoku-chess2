import { useState, useEffect } from "react";
import API from "./API";

const useGetBoards = (uid: string) => {
  const [boards, setBoards] = useState<string[]>([]);

  useEffect(() => {
    API.getGamesByUid(uid)
      .then((res) => {
        const boards: string[] = res.data.boards;
        setBoards(boards);
      })
      .catch((err) => console.log(err));
  }, [uid]);

  return boards;
};

export default useGetBoards;
