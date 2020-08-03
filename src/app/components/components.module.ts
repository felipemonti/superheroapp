import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsRoutingModule } from './components-routing.module';

import { HomeComponent } from './home/home.component';
import { SuperheroComponent } from './superhero/superhero.component';
import { PowerstatsComponent } from './superhero-detail/powerstats/powerstats.component';
import { BiographyComponent } from './superhero-detail/biography/biography.component';
import { AppearanceComponent } from './superhero-detail/appearance/appearance.component';
import { WorkComponent } from './superhero-detail/work/work.component';
import { ConnectionsComponent } from './superhero-detail/connections/connections.component';


@NgModule({
  declarations: [
    HomeComponent,
    SuperheroComponent,
    PowerstatsComponent,
    BiographyComponent,
    AppearanceComponent,
    WorkComponent,
    ConnectionsComponent,
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ComponentsModule { }
