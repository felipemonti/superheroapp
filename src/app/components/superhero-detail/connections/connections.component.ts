import { Component, OnInit } from '@angular/core';
import { SuperheroService } from 'src/app/services/superhero.service';
import { take } from 'rxjs/operators';
import { Personaje } from 'src/app/models/Personaje';
import { ActivatedRoute } from '@angular/router';
import { Connections } from 'src/app/models/Connections';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.sass']
})
export class ConnectionsComponent implements OnInit {

  connections: Connections = new Connections;
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

    this.serv.findConnectionsById(id)
    .pipe(
      take(1)
    )
    .subscribe(
      resp => {
        if(resp.response == 'error')
        {
          this.connections.groupaffiliation = '';
          this.connections.relatives = '';
        }else{
          this.connections.groupaffiliation = resp.groupaffiliation;
          this.connections.relatives = resp.relatives;
        }

        console.log(this.connections);
      },
      error => {
        console.log('error '+error);
      }
    );
  }
  
  
}
  