import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAuthComponent } from './admin-auth.component';


const routes: Routes = [
  {
    path: '',
    component: AdminAuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAuthRoutingModule { }
