import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Item,ApiResponseItem } from '../interfaces/item';
import { BranchOffice,ApiResponse } from '../interfaces/branch.office';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  private endpoint:string=environment.endPoint;
  private apiurl:string=this.endpoint+"Generic/"

  constructor(private http:HttpClient) { }

  getListItem():Observable<ApiResponseItem>{
    return this.http.get<ApiResponseItem>(`${this.apiurl}GetListItems`)
  }

  getListBranchOffice():Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this.apiurl}GetListBranchOffice`)
  }
}
