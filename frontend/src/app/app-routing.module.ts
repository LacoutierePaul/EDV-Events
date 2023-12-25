import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PresentationComponent} from "./presentation/presentation.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'presentation', component: PresentationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
