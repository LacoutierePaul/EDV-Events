import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { PresentationComponent } from './pages/presentation/presentation.component';
import { TournamentsComponent } from './pages/tournaments/tournaments.component';
import { TrainingsComponent } from './pages/trainings/trainings.component';
import { ConnectionPageComponent } from './pages/connection-page/connection-page.component';
import { ConnectionFormComponent } from './components/connection-form/connection-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventHolderComponent } from './components/event-holder/event-holder.component';
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import { OtherEventsComponent } from './pages/other-events/other-events.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PresentationComponent,
    TournamentsComponent,
    TrainingsComponent,
    ConnectionPageComponent,
    ConnectionFormComponent,
    RegisterFormComponent,
    EventHolderComponent,
    OtherEventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
