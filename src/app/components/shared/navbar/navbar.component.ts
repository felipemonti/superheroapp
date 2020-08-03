import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Personaje } from 'src/app/models/Personaje';
import { SuperheroService } from 'src/app/services/superhero.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  resultadoBusqueda: Personaje[] = [];

  

  constructor(private serv:SuperheroService) {
    
  }

  ngOnInit() {
  }

  

}
