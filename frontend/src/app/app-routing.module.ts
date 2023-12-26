import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {PresentationComponent} from "./pages/presentation/presentation.component";
import {ConnectionPageComponent} from "./pages/connection-page/connection-page.component";
import {TournamentsComponent} from "./pages/tournaments/tournaments.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'presentation', component: PresentationComponent},
  {path: 'connection', component: ConnectionPageComponent},
  {path: 'tournaments', component: TournamentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
