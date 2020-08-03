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

  // Propiedades
  public searchData = null;
  public subscriptionSearchData: Subscription;
  

  constructor(private serv:SuperheroService) {
    this.subscriptionSearchData = this.serv.observableSearchData$
    .subscribe(
      dataSearch => {
        this.searchData = dataSearch; //me subscribo para estar escuchando dinamicamente y constamente la busqueda en el navbar
      }
    );
  }

  ngOnInit() {
  }

  
  public search() {
    if(this.searchData) {
      this.serv.nextData(this.searchData);
    }
  }

}
