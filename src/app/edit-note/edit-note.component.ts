import {Component, OnInit} from '@angular/core';
import {FireService} from "../shared/fire.service";
import {Router} from "@angular/router";
import EditorJS from "@editorjs/editorjs";
import {getDownloadURL, ref as storageRef} from "firebase/storage";
import {getStorage} from "@angular/fire/storage";
import {AuthService} from "../shared/auth.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {
  note: any = {
    description: ''
  }
  newImageData: any = {}
  imageStorageUrl: string = '';
  //Переменные для editor.js
  Underline = require('@editorjs/underline');
  editor: any

  constructor(private fire: FireService, private router: Router, private auth: AuthService, private FireStorage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.note = this.fire.selectedNote
    //Если пользователь обновит страницу, то приложение забудет, какую запись надо было редактировать.
    //Вернём пользователя на главную
    if (this.note.description == '') {
      this.router.navigate([''])
    }
    //настройки текстового редактора
    this.editor = new EditorJS({
      tools: {
        underline: {
          class: this.Underline,
          inlineToolbar: true
        },
      },
      holder: 'editor-js',
      autofocus: true,
      onReady: () => {
        this.editor.blocks.render({blocks: this.note.description})
      }
    })
  }

  //Загрузка изображения
  async upload($event: any) {
    //Получение локального пути и определение пути в облачном хранилище
    this.newImageData.devicePath = $event.target.files[0]
    this.newImageData.firePath = "/note_images/" + this.auth.getAuthor() + "/" + Math.random()
    //Загрузка картинки
    this.FireStorage.upload(this.newImageData.firePath, this.newImageData.devicePath).then(async () => {
      this.note.imageData.url = await getDownloadURL(storageRef(getStorage(), this.newImageData.firePath))
      console.log(this.note.imageData.url)
    })
  }

  async edit() {
    await this.editor.save().then((outputData: any) => {
      this.note.description = outputData.blocks
      this.note.imageData.firePath = this.newImageData.firePath
    })
    console.log(this.note)
    this.fire.editNote(this.note, this.note.author, this.note.key)
    this.router.navigate([''])
  }
}
