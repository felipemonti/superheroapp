import { Component, OnInit } from '@angular/core';
import { SuperheroService } from 'src/app/services/superhero.service';
import { take } from 'rxjs/operators';
import { Personaje } from 'src/app/models/Personaje';
import { ActivatedRoute } from '@angular/router';
import { Work } from 'src/app/models/Work';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.sass']
})
export class WorkComponent implements OnInit {

  work: Work = new Work;
  personaje: Personaje = new Personaje;

  constructor(private serv: SuperheroService, private actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.obtenerDatos(this.actRoute.snapshot.paramMap.get('id'))
  }

  obtenerDatos(id:any){

    this.serv.findSuperheroById(id)
      .pipe(
        take(1)
      )
      .subscribe(
        resp => {

          if(resp.response == 'error')
          {
            this.personaje.id = 0;
            this.personaje.name = 'Personaje no encontrado';
            this.personaje.image = 'assets/img/notfound.png';
          }else{

            this.personaje.id = resp.id;
            this.personaje.name = resp.name;
            this.personaje.image = resp.url;
            
            this.obtenerPowerstats(this.personaje.id);

          }

        },
        error => {
          console.log('error '+error);
        }
      );

  }

  obtenerPowerstats(id: number){

    this.serv.findWorkById(id)
    .pipe(
      take(1)
    )
    .subscribe(
      resp => {
        if(resp.response == 'error')
        {
          this.work.base = '';
          this.work.occupation = '';
        }else{
          this.work.base = resp.base;
          this.work.occupation = resp.occupation;
        }

        console.log(this.work);
      },
      error => {
        console.log('error '+error);
      }
    );
  }
  
  
}
  