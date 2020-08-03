import { Component, OnInit } from '@angular/core';
import { Biography } from 'src/app/models/Biography';
import { Personaje } from 'src/app/models/Personaje';
import { SuperheroService } from 'src/app/services/superhero.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';



@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.sass']
})
export class BiographyComponent implements OnInit {

  biogrphy: Biography = new Biography;
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

    this.serv.findBiographyById(id)
    .pipe(
      take(1)
    )
    .subscribe(
      resp => {
        if(resp.response == 'error')
        {
          this.biogrphy.fullname = '';
          this.biogrphy.alteregos = '';
          this.biogrphy.aliases = [];
          this.biogrphy.placeofbirth = '';
          this.biogrphy.firstappearance = '';
          this.biogrphy.publisher = '';
          this.biogrphy.alignment = '';
        }else{
          
          this.biogrphy.fullname = resp.fullname;
          this.biogrphy.alteregos = resp.alteregos;
          this.biogrphy.aliases = resp.aliases;
          this.biogrphy.placeofbirth = resp.placeofbirth;
          this.biogrphy.firstappearance = resp.firstappearance;
          this.biogrphy.publisher = resp.publisher;
          this.biogrphy.alignment = resp.alignment;

          console.log(resp);
        }

        console.log(this.biogrphy);
      },
      error => {
        console.log('error '+error);
      }
    );
  }
  
  
}
  