// COMUNES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// SERVICIOS
import {SuperheroService } from './services/superhero.service';

// COMPONENTES
import { AppComponent } from './app.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LayoutAppComponent } from './components/shared/layout-app/layout-app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LayoutAppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    SuperheroService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
