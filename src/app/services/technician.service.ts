import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TechnicianUpdate } from '../interfaces/technician.update';
import { TechnicianCreate } from '../interfaces/technician.create';
import { ApiresponseResult } from '../interfaces/apiresponse.result';

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {

  private endpoint:string=environment.endPoint;
  private apiurl:string=this.endpoint+"Technician/"

  constructor(private http:HttpClient) { }

  getList():Observable<ApiresponseResult>{
    return this.http.get<ApiresponseResult>(`${this.apiurl}GetListTechnician`);
  }

  add(technician:TechnicianCreate):Observable<ApiresponseResult>{
    return this.http.post<ApiresponseResult>(`${this.apiurl}CreateTechnician`, technician);
  }

  update(idTechnician:string, technicianupdate:TechnicianCreate):Observable<ApiresponseResult>{
    console.log(idTechnician)
    return this.http.put<ApiresponseResult>(`${this.apiurl}UpdateTechnician/${idTechnician}`,technicianupdate);
  }

  delete(idTechnician:string):Observable<ApiresponseResult>{
    return this.http.delete<ApiresponseResult>(`${this.apiurl}DeleteTechnician/${idTechnician}`);
  }
}
