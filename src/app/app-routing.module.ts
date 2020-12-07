import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  { path: '', redirectTo: '/articles', pathMatch: 'full' },

  { path: '**', component: WildcardRouteComponent }, // Wildcard route --> page not found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
