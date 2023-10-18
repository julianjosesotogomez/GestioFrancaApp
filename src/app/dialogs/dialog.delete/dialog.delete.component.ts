import { Component,OnInit, Inject } from '@angular/core';
import { MatDialogRef,MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TechnicianUpdate } from 'src/app/interfaces/technician.update';


@Component({
  selector: 'app-dialog.delete',
  templateUrl: './dialog.delete.component.html',
  styleUrls: ['./dialog.delete.component.css']
})
export class DialogDeleteComponent {
 constructor(
  private dialogReference:MatDialogRef<DialogDeleteComponent>,

  public dialog: MatDialog,

  @Inject(MAT_DIALOG_DATA) public dataTechnician:TechnicianUpdate
 ){}

 ngOnInit():void{
 }

 confirmDelete(){
  if(this.dataTechnician){
    this.dialogReference.close("eliminar")
  }
 }

}
