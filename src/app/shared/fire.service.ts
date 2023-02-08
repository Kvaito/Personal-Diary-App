import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {child, get, getDatabase, ref, update} from "firebase/database";
import {push, remove} from "@angular/fire/database";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {getStorage, ref as storageRef, getDownloadURL} from "firebase/storage";


@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor(private router: Router, private FireStorage: AngularFireStorage) {
  }

  selectedNote: any = {
    description: ''
  }

  isDeleteNote: boolean = false
  storage = getStorage()

  //Создание записи
  async createNote(note: any) {
    const db = getDatabase()
    await push(ref(db, 'notes/' + note.author), {
      description: note.description,
      date: note.date,
      author: note.author,
      imageData: note.imageData
    });
  }

  //Получить записи
  async getNotes(author: string) {
    const dbRef = ref(getDatabase())
    let notes = [{
      description: '',
      author: '',
      date: '',
      key: '',
      noteText: '',
      imageData: {
        firePath: ''
      }
    }];

    await get(child(dbRef, "notes/" + author))
      .then((snapshot) => {
        if (snapshot.exists()) {
          notes = snapshot.val();
        }
      })
    return notes
  }

  //Редактирование записи
  async editNote(note: any, author: string, note_id: string) {
    const db = getDatabase()
    console.log(note)
    await update(ref(db, 'notes/' + author + '/' + note_id),
      {
        author: note.author,
        date: note.date,
        description: note.description,
        imageData:note.imageData
      })
  }

  //Получить ссылку прикреплённого к записи изображения
  async getImageUrl(firePath: string) {
    let imageRef = storageRef(this.storage, firePath)
    await getDownloadURL(imageRef).then((url) => {
        return url
      })
  }

  async deleteNote(note: any, author: string, note_id: string) {
    const db = getDatabase()
    await remove(ref(db, 'notes/' + author + '/' + note_id))
    this.isDeleteNote = false
    location.reload();
  }
}

