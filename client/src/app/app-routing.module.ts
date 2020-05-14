import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { BuzzComponent } from './buzz/buzz.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'buzz', component: BuzzComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
