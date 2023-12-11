import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {TournamentsComponent} from "./tournaments/tournaments.component";
import {TrainingsComponent} from "./trainings/trainings.component";
import {PresentationComponent} from "./presentation/presentation.component";
import {EventsComponent} from "./events/events.component";

const routes: Routes = [{path: 'presentation', component: PresentationComponent},{path:'home',component:HomeComponent},
  {path:'tournaments',component:TournamentsComponent},{path:'trainings',component:TrainingsComponent},
  {path:'events',component:EventsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
