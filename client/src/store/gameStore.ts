import { defineStore } from 'pinia';

declare global {

  interface importMetaEnv {
    readonly TOKEN: string
  }

  interface importMeta {
    readonly env: importMetaEnv
  }
}

export const useGameStore = defineStore('game', {
  state: () => ({
    token: import.meta.env.VITE_TOKEN,
    socketEndpoint: import.meta.env.VITE_SOCKET_ENDPOINT,
    roomId: 'myRandomChatRoomId',
    gameData: {
      gameName:'quizathon'
    },
  }),

  actions: {
  },
  getters: {
    getEndPoint: state => state.socketEndpoint,
    getRoom: state => state.roomId,
    gameData: state => state.gameData,
  }
})