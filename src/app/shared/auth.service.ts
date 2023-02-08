import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router) {
  }

  userUID:any=''

  //Авторизация
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then((cred) => {
      this.userUID=cred.user?.uid
      this.router.navigate([''])
    }, err => {

    })
  }

  //Регистрация
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(() => {
      this.router.navigate(['/login'])
    }, err => {
      this.router.navigate(['/register'])
    })
  }

  //Выход
  logout() {
    this.fireauth.signOut().then(() => {
      this.userUID=''
      this.router.navigate(['/login'])
    }, err => {

    })
  }

  //Отслеживание, вошёл пользователь или нет
  async isAuth() {
    await this.fireauth.onAuthStateChanged(user => {
      if (user) {
        this.userUID = user.uid
      } else {
          this.userUID=''
      }
    })
  }

  getAuthor() {
    if (this.fireauth.user) {
      return this.userUID
    }
    return 0
  }
}
