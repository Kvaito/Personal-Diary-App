import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  nickname:string=''
  email:string=''
  password:string=''
  message:string=''

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }

  register(){
    //Базовая валидация
    if(this.email=='')
    {
      this.message='Поле Email должно быть заполнено'
      return
    }

    if(this.password=='')
    {
      this.message='Поле пароля должно быть заполнено'
      return;
    }
    if(this.password.length<6){
      this.message='Пароль должен быть не менее 6 символов'
      return;
    }

    this.auth.register(this.email,this.password)
    this.email=''
    this.password=''
  }
}
