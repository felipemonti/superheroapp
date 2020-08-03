import { Component, OnInit } from '@angular/core';
import { SuperheroService } from 'src/app/services/superhero.service';
import { take } from 'rxjs/operators';
import { Personaje } from 'src/app/models/Personaje';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {


  personajes: Personaje[] = [];
  subscriptionSearchData: Subscription;
  dataSearch:string = "";

  constructor(private serv: SuperheroService) { 
    
  }



  ngOnInit() {
    this.obtenerAleatorios();
  }

  obtenerPorFiltro(){
    this.personajes = [];

    if(this.dataSearch != ""){
      this.serv.findByName(this.dataSearch)
      .pipe(
        take(1)
      )
      .subscribe(
        resp => {
          
          if(resp.response == 'error'){
            console.log('Error: '+resp);
          }else{
            let total:number = resp.results.length;
            for (let index = 0; index < total; index++) {
              let element = resp.results[index];
              let personaje:Personaje = new Personaje;
  
              personaje.image = element.image.url;
              personaje.name = element.name;
              personaje.id = element.id;
  
  
              this.personajes.push(personaje);
            }
          }

          this.dataSearch = "";
        }
      );
    }
    
  }

  private generarNumeros(ini:number, fin:number, cantidad:number){
    let array = [];
  
    for (let index = 0; index < cantidad; index++) {
      let num:number = Math.round(Math.random() * (fin - ini) + ini + 1);


      if(array.indexOf(num)!=-1){
        console.log('existe '+num);
        index--;
      }else{
        console.log('NO existe '+num);
        array.push(num);
      }
    }
    
    console.log(array);
    return array;
  }

  obtenerAleatorios(){
    this.dataSearch = "";
    this.personajes = [];
          
    let arrayDeNumeros = this.generarNumeros(1,720,9);

    arrayDeNumeros.forEach(num => {
      this.serv.findSuperheroById(num)
      .pipe(
        take(1)
      )
      .subscribe(
        resp => {

          let pers: Personaje = new Personaje;

          console.log(resp);

          if(resp.response == 'error')
          {
            pers.id = 0;
            pers.name = 'Personaje no encontrado';
            pers.image = 'assets/img/notfound.png';
          }else{

            pers.id = resp.id;
            pers.name = resp.name;
            pers.image = resp.url;
          }

          this.personajes.push(pers);

        },
        error => {
          console.log('error '+error);
        }
      );

    });

  }


}
