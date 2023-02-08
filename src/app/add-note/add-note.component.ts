import {Component, OnInit} from '@angular/core';
import {FireService} from "../shared/fire.service";
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";
import EditorJS from "@editorjs/editorjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {getDownloadURL, ref as storageRef} from "firebase/storage";
import {getStorage} from "@angular/fire/storage";

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {
  Header = require('@editorjs/header');
  Underline = require('@editorjs/underline');
  editor: any

  description: any = {}
  date: string = ''
  author: string = 'BMO'
  message: string = ''
  imageUploaded: boolean = false
  imageStorageUrl: string = ''
  uploadProgress: any = ''

  imageData: any = {
    devicePath: '',
    firePath: ''
  }

  constructor(public fire: FireService, private auth: AuthService, private router: Router, private FireStorage: AngularFireStorage) {
  }

  ngOnInit(): void {
    //настройки текстового редактора
    this.editor = new EditorJS({
      tools: {
        underline: {
          class: this.Underline,
          inlineToolbar: true
        },

      },
      holder: 'editor-js',
      placeholder: 'Расскажи, что произошло!',
      autofocus: true
    })
  }

  async upload($event: any) {
    this.imageData.devicePath = $event.target.files[0]
    this.imageData.firePath = "/note_images/" + this.auth.getAuthor() + "/" + Math.random()
    //Загрузка картинки
    this.FireStorage.upload(this.imageData.firePath, this.imageData.devicePath).then( async () => {
      this.imageStorageUrl = await getDownloadURL(storageRef(getStorage(), this.imageData.firePath))
      console.log(this.imageStorageUrl)
      this.imageUploaded=true
    })

  }

  async create() {
    //Получение данных из блока editor.js
    await this.editor.save().then((outputData: any) => {
      this.description = outputData.blocks
    }).catch((error: any) => {
      console.log('Saving failed: ', error)
    });
    //Сборка данных
    let note = {
      description: this.description,
      date: '',
      author: '',
      imageData: this.imageData
    }
  //Получение нынешней даты и преобразование на русский язык
    note.date = new Date().toLocaleString('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    note.author = this.auth.getAuthor()
    this.fire.createNote(note)
    this.router.navigate([''])
  }

}
