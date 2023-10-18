import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Para trabajar con Reactive Forms
import {ReactiveFormsModule} from '@angular/forms';

//Para trabajar con peticiones http
import { HttpClientModule } from '@angular/common/http';

//Componentes de material
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

import { MomentDateModule } from '@angular/material-moment-adapter';

//Para trabajar con alertas
import {MatSnackBarModule} from '@angular/material/snack-bar';

//Para tabajar con iconos
import {MatIconModule} from '@angular/material/icon';

//Para trabajar con los dialogos
import {MatDialogModule} from '@angular/material/dialog';

//Para trabajar con las cuadriculas
import {MatGridListModule} from '@angular/material/grid-list';
import { DialogAddeditComponent } from './dialogs/dialog.addedit/dialog.addedit.component';
import { DialogAdditemComponent } from './dialogs/dialog.additem/dialog.additem.component';
import { DialogDeleteComponent } from './dialogs/dialog.delete/dialog.delete.component';




@NgModule({
  declarations: [
    AppComponent,
    DialogAddeditComponent,
    DialogAdditemComponent,
    DialogDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
