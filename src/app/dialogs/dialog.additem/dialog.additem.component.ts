import { Component, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import { Technician, TechnicianInfo } from 'src/app/interfaces/technician';
import { BranchOffice, ApiResponse } from 'src/app/interfaces/branch.office';
import { Item,ApiResponseItem } from 'src/app/interfaces/item';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-dialog.additem',
  templateUrl: './dialog.additem.component.html',
  styleUrls: ['./dialog.additem.component.css']
})
export class DialogAdditemComponent {
  formItem:FormGroup;
  titleAccion:string="Nuevo Item";
  formItemList: TechnicianInfo[]=[];
  listBranchOffice:BranchOffice[]=[];
  listItem:Item[]=[];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogAdditemComponent>,
    private _genericService:GenericService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formItem = this.fb.group({
      idItem: [''], // Inicializa según tus necesidades
      itemQuantity: [0],
      idBranchOffice: [''], // Inicializa según tus necesidades
    });

    this._genericService.getListBranchOffice().subscribe({
      next:(data:ApiResponse)=>{
        if (data.successful) {
          this.listBranchOffice = data.result;
        } else {
          console.log(data.message);
        }

      }, error:(e)=>{

      }
    });

    this._genericService.getListItem().subscribe({
      next:(data:ApiResponseItem)=>{
        if (data.successful) {
          this.listItem = data.result;
        } else {
          // Maneja errores o muestra un mensaje de error
        }

      }, error:(e)=>{

      }
    });
  }

  guardarItem() {
    // Envía el resultado (los detalles del nuevo item) al componente principal
    this.dialogRef.close(this.formItem.value);
    console.log(this.formItem.value);
  }
}
