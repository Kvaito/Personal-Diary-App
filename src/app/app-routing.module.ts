import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EditNoteComponent} from "./edit-note/edit-note.component";
import {AddNoteComponent} from "./add-note/add-note.component";
import {RegistrationComponent} from "./registration/registration.component";
import {AuthorizationComponent} from "./authorization/authorization.component";
import {NotesComponent} from "./notes/notes.component";

const routes: Routes = [
  {path:'',component:NotesComponent},
  // {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'edit_note', component:EditNoteComponent},
  {path:'add_note',component:AddNoteComponent},
  {path:'register',component:RegistrationComponent},
  {path:'login',component:AuthorizationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
