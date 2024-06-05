import { defineStore } from 'pinia';

import UploadService from "../services/upload.service.js";
import EditorService from '../services/editor.service'

declare global {

  interface importMetaEnv {
    readonly TOKEN: string
  }

  interface importMeta {
    readonly env: importMetaEnv
  }
}

export const useSlideStore = defineStore('editor', {
  state: () => ({
    gameId: false,
    gameName: '',
    showSlide: 0,
    slides: [{
      name: 'slide 1',
      type: 'checkbox',
      question: '',
      options: [
        { choice: '', correct: false },
      ],
      bgImg: import.meta.env.VITE_API_ENDPOINT + "/api/images/img-0906.jpg"
    }],
    gameAr: []
  }),

  actions: {
    blankSlideInfo() {
      return {
        name: 'slide ' + (Number(this.slides.length) + 1),
        type: '',
        question: '',
        options: [],
        bgImg: import.meta.env.VITE_API_ENDPOINT + "/api/images/img-0906.jpg"
      }
    },

    updateGameName(name: string) {
      this.gameName = name
    },

    incrementSildes(){
        this.showSlide += 1;
    },

    saveGameToDatabase() {
      var sendData = {
        gameName: this.gameName,
        user_id: 'editor',
        slides: JSON.stringify(this.slides),
      }

      if (this.gameId) {
        EditorService.updateTrivia(sendData, this.gameId)
          .then((msg: any) => console.log('response msg::', msg))
      } else {
        EditorService.postTrivia(sendData)
          .then((msg: any) => console.log('response msg::', msg))
      }
    },

    fetchGameFromDatabase() {
      EditorService.fetchTrivia().then(data => {

        console.log('fetchGame', data)
        if (data.length) {
          this.gameAr = data
            .filter((x: any) => x.Trivia_id !== 'test')
            .map((x: any) => ({ id: x.id, gameName: x.gameName }))
        }
      });
    },

    fetchGameById(index: number) {
      EditorService.fetchTriviaById(index).then(data => {
        if (data) {
          this.gameId = data.id
          this.gameName = data.gameName
          this.slides = data.slides ? JSON.parse(data.slides) : data.slides
        }
      });
    },

    /** edit slides actions */
    onSlideAdd() {
      this.slides.push(this.blankSlideInfo())
    },
    onSlideAction(id: number) {
      this.showSlide = id;
    },
    onSlideMove(id: number, id2: number) {
      console.log(id, id2)
    },
    onSlideRemove() {
      this.slides.splice(this.showSlide, 1);
    },
    onSlideEdit(index: number, text: string) {
      this.slides[index].name = text;
    },
    updateSlideQuestion(text: string) {
      this.slides[this.showSlide].question = text;
    },
    updateSlideBg(url: string) {
      var tempUrl = import.meta.env.VITE_API_ENDPOINT + "/api/uploads/"
      this.slides[this.showSlide].bgImg = tempUrl + url;
    },
    upload(formData: any) {
      UploadService.upload(formData, (responseData: any) => {
        this.updateSlideBg(responseData)
      });
    },

    /** edit checkbox actions */
    addChoice() {
      this.slides[this.showSlide].options.push({
        choice: '',
        correct: false
      })
    },
    removeChoice(index: number) {
      this.slides[this.showSlide].options.splice(index, 1);
    },
    updateChoice(e: any) {
      var index = (e.target.id.split('opt_'))[1];
      this.slides[this.showSlide].options[Number(index)].choice = e.target.value;
    },
    updateCheck(e: any) {
      var index = (e.target.id.split('check_'))[1];
      this.slides[this.showSlide].options[Number(index)].correct = e.target.checked;
    }
  },
  getters: {
    editorName: state => state.gameName,
    editorSlides: state => state.slides,
    getCurrentSlide: state => state.slides[state.showSlide],
    getGameList: state => state.gameAr,
    getSlideNum: state => state.slides.length,
    getSlideInex: state => state.showSlide
  }
})