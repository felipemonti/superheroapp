import { Component, OnInit } from '@angular/core';
import { SuperheroService } from 'src/app/services/superhero.service';
import { take } from 'rxjs/operators';
import { Personaje } from 'src/app/models/Personaje';
import { Powerstats } from 'src/app/models/Powerstats';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-powerstats',
  templateUrl: './powerstats.component.html',
  styleUrls: ['./powerstats.component.sass']
})
export class PowerstatsComponent implements OnInit {

  powerstat: Powerstats = new Powerstats;
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

    this.serv.findPowerstatsById(id)
    .pipe(
      take(1)
    )
    .subscribe(
      resp => {
        if(resp.response == 'error')
        {
          this.powerstat.combat = 0;
          this.powerstat.durability = 0;
          this.powerstat.intelligence = 0;
          this.powerstat.power = 0;
          this.powerstat.speed = 0;
        }else{
          this.powerstat.combat = resp.combat;
          this.powerstat.durability = resp.durability;
          this.powerstat.intelligence = resp.intelligence;
          this.powerstat.power = resp.power;
          this.powerstat.speed = resp.speed;
        }

        console.log(this.powerstat);
      },
      error => {
        console.log('error '+error);
      }
    );
  }
  
  
}
  