import { Component } from '@angular/core';
import {AuthService} from "./shared/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'personal-diary-app';

  constructor(private auth:AuthService) {
  }

  //Включаем слежку за статусом пользователя
  ngOnInit(){
    this.auth.isAuth()
  }
}
