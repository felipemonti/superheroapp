import { Component,EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Personaje } from 'src/app/models/Personaje';

@Component({
  selector: 'app-superhero',
  templateUrl: './superhero.component.html',
  styleUrls: ['./superhero.component.sass']
})
export class SuperheroComponent implements OnInit {


  @Input() 
  personaje: Personaje;

  @Output()
  public powerstatEvent = new EventEmitter<Personaje>();

  constructor() { }

  ngOnInit() {
  }

  obtenerPowerstats(){
    this.powerstatEvent.emit(this.personaje);
  }

}
