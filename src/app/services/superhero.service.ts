import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperheroService {

  searchData = new BehaviorSubject<string>('');
  observableSearchData$ = this.searchData.asObservable();

  constructor(private http: HttpClient) { }

  
  findSuperheroById(id:any){
    return this.http.get<any>(`${environment.api}/${id}/image`);
  }

  
  findBiographyById(id:any){
    return this.http.get<any>(`${environment.api}/${id}/biography`);
  }
  
  findAppearanceById(id:any){
    return this.http.get<any>(`${environment.api}/${id}/appearance`);
  }
  
  findWorkById(id:any){
    return this.http.get<any>(`${environment.api}/${id}/work`);
  }
  
  findPowerstatsById(id:any){
    return this.http.get<any>(`${environment.api}/${id}/powerstats`);
  }
  
  findConnectionsById(id:any){
    return this.http.get<any>(`${environment.api}/${id}/connections`);
  }

  
  findByName(name:string){
    return this.http.get<any>(`${environment.api}/search/${name}`);
  }


  //actualizar busquedas
  nextData(data: any) {
    this.searchData.next(data);
  }


}
