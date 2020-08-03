import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PowerstatsComponent } from './superhero-detail/powerstats/powerstats.component';
import { BiographyComponent } from './superhero-detail/biography/biography.component';
import { AppearanceComponent } from './superhero-detail/appearance/appearance.component';
import { WorkComponent } from './superhero-detail/work/work.component';
import { ConnectionsComponent } from './superhero-detail/connections/connections.component';


const routes: Routes = [
  {
    path: '',
    data: {title: ''},
    children:[
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'home/search',
        component: HomeComponent
      },
      {
        path:'powerstats/:id',
        component: PowerstatsComponent
      },
      {
        path:'biography/:id',
        component: BiographyComponent
      },
      {
        path:'appearance/:id',
        component: AppearanceComponent
      },
      {
        path:'work/:id',
        component: WorkComponent
      },
      {
        path:'connections/:id',
        component: ConnectionsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
