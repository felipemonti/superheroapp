import { Component, OnInit } from '@angular/core';
import { SuperheroService } from 'src/app/services/superhero.service';
import { take } from 'rxjs/operators';
import { Personaje } from 'src/app/models/Personaje';
import { ActivatedRoute } from '@angular/router';
import { Appearance } from 'src/app/models/Appearance';

@Component({
  selector: 'app-appearance',
  templateUrl: './appearance.component.html',
  styleUrls: ['./appearance.component.sass']
})
export class AppearanceComponent implements OnInit {

  appearance: Appearance = new Appearance;
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
            
            this.obtenerAppearance(this.personaje.id);

          }

        },
        error => {
          console.log('error '+error);
        }
      );

  }

  obtenerAppearance(id: number){

    this.serv.findAppearanceById(id)
    .pipe(
      take(1)
    )
    .subscribe(
      resp => {
        if(resp.response == 'error')
        {
          this.appearance.eyecolor = '';
          this.appearance.gender = '';
          this.appearance.haircolor = '';
          this.appearance.race = '';
          this.appearance.weight = [];
          this.appearance.height = [];
        }else{
          this.appearance.eyecolor = resp.eyecolor;
          this.appearance.gender = resp.gender;
          this.appearance.haircolor = resp.haircolor;
          this.appearance.race = resp.race;
          this.appearance.weight = resp.weight;
          this.appearance.height = resp.height;
        }

        console.log(this.appearance);
      },
      error => {
        console.log('error '+error);
      }
    );
  }
  
  
}
  