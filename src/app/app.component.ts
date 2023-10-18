import { Component,AfterViewInit,ViewChild, OnInit } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { Technician } from './interfaces/technician';
import { TechnicianService } from './services/technician.service';

import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogAddeditComponent } from './dialogs/dialog.addedit/dialog.addedit.component';
import { ApiresponseResult } from './interfaces/apiresponse.result'
import { TechnicianUpdate } from './interfaces/technician.update';

import { MatSnackBar } from '@angular/material/snack-bar';

import { DialogDeleteComponent } from './dialogs/dialog.delete/dialog.delete.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['Id', 'Codigo', 'Nombre', 'Salario', 'Acciones'];
  dataSource = new MatTableDataSource<Technician>();
  technicianList : Technician[]=[];

  constructor(
    private _technicianService:TechnicianService,
    public dialog: MatDialog,
    private _snackBar:MatSnackBar
    ){}

  ngOnInit(): void {
    this.viewTechnician()
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewTechnician(){
    this._technicianService.getList().subscribe({
      next:(data:ApiresponseResult)=>{
        if (data.successful) {
          this.dataSource = data.result;
        } else {
          console.log(data.message);
        }
      }, error:(e)=>{}
    })
  }

  dialogNewTechnician() {
    this.dialog.open(DialogAddeditComponent,{
      disableClose:true,
      width:"350px"
    }).afterClosed().subscribe(result=>{
      if(result ==="creado"){
        this.viewTechnician();
      }
    });
  }
  dialogEditTechnician(dataTechnician: TechnicianUpdate) {
    this.dialog.open(DialogAddeditComponent,{
      disableClose:true,
      width:"350px",
      data:dataTechnician
    }).afterClosed().subscribe(result=>{
      if(result ==="editado"){
        this.viewTechnician();
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

  dialogDeleteTechnician(dataTechnician:TechnicianUpdate){
    this.dialog.open(DialogDeleteComponent,{
      disableClose:true,
      data:dataTechnician
    }).afterClosed().subscribe(result=>{
      if(result ==="eliminar"){
        this._technicianService.delete(dataTechnician.idTechnician).subscribe({
          next:(data:ApiresponseResult)=>{
            if (data.successful) {
              this.viewAlert("Empleado fue eliminado","Listo");
              this.viewTechnician();
            } else {
              this.viewAlert(data.message,"Listo")
            }
          }, error:(e)=>{
            this.viewAlert("No se pudo eliminar","Error");
          }
        })
      }
    });
  }
}

