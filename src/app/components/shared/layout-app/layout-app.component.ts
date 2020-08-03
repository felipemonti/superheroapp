import { Component, OnInit } from '@angular/core';
import { SuperheroService } from 'src/app/services/superhero.service';
import { take } from 'rxjs/operators';
import { Personaje } from 'src/app/models/Personaje';

@Component({
  selector: 'app-layout-app',
  templateUrl: './layout-app.component.html',
  styleUrls: ['./layout-app.component.sass']
})
export class LayoutAppComponent implements OnInit {

  resultadoBusqueda:Personaje[] = [];

  constructor(private serv:SuperheroService) { }

  ngOnInit() {
  }
  
}
