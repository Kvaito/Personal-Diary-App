import { NgModule } from '@angular/core';
import { initializeApp } from "firebase/app";
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesComponent } from './notes/notes.component';
import { MenuComponent } from './menu/menu.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { RegistrationComponent } from './registration/registration.component';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { FooterComponent } from './footer/footer.component';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {FormsModule} from "@angular/forms";
import { DeleteComponent } from './delete/delete.component';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    MenuComponent,
    AuthorizationComponent,
    RegistrationComponent,
    EditNoteComponent,
    AddNoteComponent,
    FooterComponent,
    DeleteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}


