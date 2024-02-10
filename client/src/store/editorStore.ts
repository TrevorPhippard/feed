import { defineStore } from 'pinia';

import UploadService from "../services/upload.service.js";

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
      gameName: 'quizathon',
      showSlide:0,
      slides: [{
        name: 'slide 1',
        type: 'checkbox',
        question: 'Q1:  Whose that wonderful girl, could she be any sweeter?',
        options: [
          { choice: 'Nanalan', correct: false },
          { choice: 'Sweet Pea', correct: true },
          { choice: 'Mona', correct: false },
          { choice: 'Russer', correct: false },
          { choice: 'mr.woca', correct: false }
        ],
        bgImg: import.meta.env.VITE_API_ENDPOINT +"/images"+ "/img-0906.jpg"
      }, {
        name: 'slide 2',
        type: 'checkbox',
        question: 'Q2:  what will we do with feefer?',
        options: [
          { choice: 'Put in water', correct: false },
          { choice: 'ask Russer', correct: false },
          { choice: 'NANA!!!!', correct: true },
          { choice: 'mr.woca?', correct: false }
        ],
        bgImg: import.meta.env.VITE_API_ENDPOINT+"/images" + "/img-0905.jpg"
      }],
  }),

  actions: {
    upload(data: any) {
      UploadService.upload(data);
    },
    blankSlideInfo(){
       return { 
        name: 'slide '+(Number(this.slides.length)+1),
        type: '',
        question: '',
        options: [],
        bgImg: "http://localhost:3000/images/img-0906.jpg"
      }
    },

    /** edit slides actions */
   
    onSlideAdd(){
      this.slides.push(this.blankSlideInfo())
    },
    onSlideAction(id:number){
      console.log(id)
      this.showSlide =id;
    },
    onSlideMove(id:number, id2:number){
      console.log(id,id2)
    },
    onSlideRemove(){
      this.slides.splice(this.showSlide, 1);
    },
    onSlideEdit(index:number, text:string){
      this.slides[index].name = text;
    },
    updateSlideQuestion(text:string){
      this.slides[this.showSlide].question = text;
    },
 
    /** edit checkbox actions */

    addChoice(){
      this.slides[this.showSlide].options.push({
         choice: '', correct: false 
        })
    },
    removeChoice(index:number){
      this.slides[this.showSlide].options.splice(index, 1);
    },
    updateChoice(e:any){
      var index = (e.target.id.split('opt_'))[0];
      this.slides[this.showSlide].options[Number(index)].choice = e.target.value;
    },
    updateCheck(e:any){
      var index = (e.target.id.split('check_'))[1];
      this.slides[this.showSlide].options[Number(index)].correct = e.target.checked;
    }
  },
  getters: {
    editorSlides: state => state.slides,
    editorCurrentSlides: state => state.slides[state.showSlide]
  }
})