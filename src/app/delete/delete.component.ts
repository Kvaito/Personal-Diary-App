import {Component,  OnInit} from '@angular/core';
import {FireService} from "../shared/fire.service";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(private fire:FireService) { }

  ngOnInit(): void {
  }

  deleteNote(){
    this.fire.deleteNote(this.fire.selectedNote,this.fire.selectedNote.author,this.fire.selectedNote.key)
  }

  cancel(){
    this.fire.isDeleteNote=false
  }
}
