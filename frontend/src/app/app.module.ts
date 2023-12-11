import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
import { PresentationComponent } from './presentation/presentation.component';
import { HomeComponent } from './home/home.component';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { TrainingsComponent } from './trainings/trainings.component';

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    PresentationComponent,
    HomeComponent,
    TournamentsComponent,
    TrainingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
