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


export const useEditorStore = defineStore('editor', {
  state: () => ({
    gameId:false,
    gameName: '',
    showSlide: 0,
    slides: [{
      name: 'slide 1',
      type: 'checkbox',
      question: '',
      options: [
        { choice: '', correct: false },
      ],
      bgImg: import.meta.env.VITE_API_ENDPOINT + "/images" + "/img-0906.jpg"
    }
  ],
  }),

  actions: {
    upload(data: any) {
      UploadService.upload(data);
    },
    blankSlideInfo() {
      return {
        name: 'slide ' + (Number(this.slides.length) + 1),
        type: '',
        question: '',
        options: [],
        bgImg: "http://localhost:3000/images/img-0906.jpg"
      }
    },

    updateGameName(name: string) {
      this.gameName = name
    },

    saveGameToDatabase(){

     var sendData = {
        gameName:this.gameName,
        user_id:'editor',
        slides:JSON.stringify(this.slides),
      } 

      if(this.gameId){
        EditorService.updateTrivia(sendData, this.gameId)
      }else{
        EditorService.postTrivia(sendData)
      }
    },

    fetchGameFromDatabase(){
      EditorService.fetchTrivia().then(data=>{
        this.gameId =data[0].id
        this.gameName =data[0].gameName
        this.slides = JSON.parse(data[0].slides)
      });
    },

    /** edit slides actions */
    onSlideAdd() {
      this.slides.push(this.blankSlideInfo())
    },
    onSlideAction(id: number) {
      console.log(id)
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
    editorCurrentSlides: state => state.slides[state.showSlide]
  }
})