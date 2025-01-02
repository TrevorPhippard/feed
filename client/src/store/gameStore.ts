import { defineStore } from "pinia";
import gameService from "../services/game.service"

declare global {

  interface importMetaEnv {
    readonly TOKEN: string
  }

  interface importMeta {
    readonly env: importMetaEnv
  }
}

export const useGameStore = defineStore("game", {
  state: () => ({
    token: import.meta.env.VITE_TOKEN,
    socketEndpoint: import.meta.env.VITE_SOCKET_ENDPOINT,
    gameData: {
      gameName: "let us go",
    },

    //channels
    chat_room: "chat",
    activeUsers_room: "active-users",
    gameRoom_id: "game-room",
    selectedGame:'0'
  }),

  actions: {
    launchGame( room: string ){
      return gameService.launchGame(room)
    },
    setGame(id:string){
      this.gameRoom_id = id
    },

    addInvitation(room_id:string){
      this.selectedGame= room_id;
    }
  },
  getters: {
    getEndPoint: state => state.socketEndpoint,
    getGameData: state => state.gameData,
    getInvitation: state => state.selectedGame,
    getChatroom: state => state.chat_room,
    getActiveRoom: state => state.activeUsers_room,
    getGameRoom: state => state.gameRoom_id,

  }
})