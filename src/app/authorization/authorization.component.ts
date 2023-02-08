import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  email:string='';
  password:string='';
  message:string='';

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }

  login(){
    if(this.email=='')
    {
      this.message='Поле Email должно быть заполнено'
    }

    if(this.password=='')
    {
      this.message='Поле пароля должно быть заполнено'
    }

    this.auth.login(this.email,this.password)
    this.email=''
    this.password=''
  }
}
