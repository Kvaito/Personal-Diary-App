import {Component, OnInit,} from '@angular/core';
import {FireService} from "../shared/fire.service";
import {Router} from "@angular/router";
import {AuthService} from "../shared/auth.service";
import {getDownloadURL, ref as storageRef} from "firebase/storage";
import {getStorage} from "@angular/fire/storage";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  constructor(public fire: FireService, private router: Router, private auth: AuthService) {
  }

  notes: { date: string; author: string; description: any; key: string,noteText:string,imageData:any }[] = [{
    description: [{text:''}],
    date: '',
    author: '',
    key: '',
    noteText:'',
    imageData:{
      firePath:''
    }
  }];

  paragraph = require('@editorjs/paragraph')
  editor: any
  author: string = ''
  note_keys: any = []
  notesGot: boolean = false
  message:any='Ваши записи ещё не появились)' + '</br>'+
    'Подождите загрузку или создайте первую запись'

  textWidth:string=''

  ngOnInit(): void {
    setTimeout(() =>
        this.getNotes(),1000)
  }

  async getNotes() {
    this.author = this.auth.getAuthor()
    this.notes = await this.fire.getNotes(this.author)
    //Получение ключей записей перед превращением объекта в удобный для представления массив,
    //чтобы использовать эти ключи для точечного редактирования записей
    this.note_keys = Object.keys(this.notes)
    this.notes = Object.values(this.notes)
    //Вставка ключей внутрь записи для доступа к этим ключам
    for (let i = 0; i < this.notes.length; i++) {
      this.notes[i].key = this.note_keys[i]
    }
    //Преобразование JSON из текста записи в удобную для отображения на сайте строку
    for(let i=0;i<this.notes.length;i++){
      let noteText:string=''
      for(let j=0;j<this.notes[i].description.length;j++){
        if(this.notes[i].description.type=='header'){
          this.notes[i].description[j].data.text=""

        }
        noteText=noteText+ this.notes[i].description[j].data.text+"</br>"
        //Получение и прикрепление к записи ссылки на картинку, если такая есть
        if(this.notes[i].imageData.firePath!=''){
          this.notes[i].imageData.url=await  getDownloadURL(storageRef(getStorage(), this.notes[i].imageData.firePath))
        }
        else{
          this.textWidth='100%'
        }
      }
      this.notes[i].noteText=noteText
    }
    this.notes = this.notes.reverse()
    if (this.notes[0].author !== '') {
      this.notesGot = true
    }
  }

  editNote(note: any) {
    this.fire.selectedNote = note
    this.router.navigate(['/edit_note'])
  }

  deleteNote(note: any) {
    this.fire.isDeleteNote = true
    this.fire.selectedNote = note
  }

}
