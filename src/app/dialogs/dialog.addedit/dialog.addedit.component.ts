import { Component,OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import { MatDialogRef,MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TechnicianInfo } from 'src/app/interfaces/technician';
import { TechnicianCreate } from 'src/app/interfaces/technician.create';
import { TechnicianService } from 'src/app/services/technician.service';
import { DialogAdditemComponent } from '../dialog.additem/dialog.additem.component';
import { ApiresponseResult } from 'src/app/interfaces/apiresponse.result';
import { TechnicianUpdate } from 'src/app/interfaces/technician.update';



@Component({
  selector: 'app-dialog.addedit',
  templateUrl: './dialog.addedit.component.html',
  styleUrls: ['./dialog.addedit.component.css'],
})
export class DialogAddeditComponent implements OnInit {

  formTechnician:FormGroup;
  titleAccion:string="Nuevo";
  buttonAccion:string="Guardar";
  formItemList: TechnicianInfo[]=[];


  constructor(
    private dialogReference:MatDialogRef<DialogAddeditComponent>,
    private fb:FormBuilder,
    private _snackBar:MatSnackBar,
    private _technicianService:TechnicianService,
    public dialog: MatDialog,

    @Inject(MAT_DIALOG_DATA) public dataTechnician:TechnicianUpdate

  ){
    this.formTechnician=this.fb.group({
      code:['',Validators.required],
      name:['',Validators.required],
      salary:[0,Validators.required],
      formItemList: this.fb.array([])
    })
  }

  get listItems() {
    return this.formTechnician.get('formItemList') as FormArray;
  }

  agregarItem() {
    const dialogRef = this.dialog.open(DialogAdditemComponent, {
      width: '400px', // Ancho del diálogo
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('LLEGO A RESULT',result)
        // Agrega el resultado (el nuevo item) a tu FormArray en formTechnician.listItems
        this.listItems.push(this.fb.group(result));
      }
    });
  }

  viewAlert(message: string, action: string) {
    this._snackBar.open(message, action,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration:3000
    });
  }

  addTechnician(){
    console.log(this.formTechnician.value);

    const model : TechnicianCreate = {
      code: this.formTechnician.value.code,
      name:this.formTechnician.value.name,
      salary:this.formTechnician.value.salary,
      listItems: this.formTechnician.value.formItemList
    }

    if(this.dataTechnician == null){
      this._technicianService.add(model).subscribe({
        next:(data:ApiresponseResult)=>{
          if (data.successful) {
            this.viewAlert("Empleado fue creado","Listo");
            this.dialogReference.close("creado")
          } else {
            this.viewAlert(data.message,"Listo")
          }
        }, error:(e)=>{
          this.viewAlert("No se pudo crear","Error");
        }
      });
    }else{
      this._technicianService.update(this.dataTechnician.idTechnician,model).subscribe({
        next:(data:ApiresponseResult)=>{
          if (data.successful) {
            this.viewAlert("Empleado fue editado","Listo");
            this.dialogReference.close("editado")
          } else {
            this.viewAlert(data.message,"Listo")
          }
        }, error:(e)=>{
          console.log(e)
          this.viewAlert("No se pudo editar","Error");
        }
      });
    }


  }

  ngOnInit():void{
    if(this.dataTechnician){
      this.formTechnician.patchValue({
        idTechnician:this.dataTechnician.idTechnician,
        code:this.dataTechnician.code,
        name:this.dataTechnician.name,
        salary:this.dataTechnician.salary
      })
      this.titleAccion="Editar";
      this.buttonAccion="Actualizar";
    }
  }
}
