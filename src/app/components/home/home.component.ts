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

  constructor(private serv: SuperheroService) { 
    this.subscriptionSearchData = this.serv.observableSearchData$.subscribe(
      dataSearch => {
        if(dataSearch){
          this.obtenerPorFiltro(dataSearch);
        }
      }
    );
  }

  ngOnInit() {
    this.obtenerTodos();
  }



  obtenerPorFiltro(dataSearch){
    this.serv.findByName(dataSearch)
    .pipe(
      take(1)
    )
    .subscribe(
      resp => {
        this.personajes = [];
        
        if(resp.response == 'error'){
          this.personajes = [];
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
      }
    );
  }


  obtenerTodos(){
    for (let index = 1; index < 10; index++) {
      this.serv.findSuperheroById(index)
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

    }
  }


}
