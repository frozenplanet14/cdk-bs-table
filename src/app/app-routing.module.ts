import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardViewComponent } from './card-view/card-view.component';
import { DetailViewComponent } from './detail-view/detail-view.component';


const routes: Routes = [
  { path: '', redirectTo: '/summary', pathMatch: 'full' },
  {
    path: 'summary',
    component: CardViewComponent
  },
  {
    path: 'detail',
    component: DetailViewComponent
  },
  { path: '**', pathMatch: 'full', redirectTo: 'summary' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
