import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category.component';
import { ListJobComponent } from './list-job/list-job.component';
import { SingleJobComponent } from './single-job/single-job.component';


const routes: Routes = [
  {
    path: '',
    component: CategoryComponent
  },
  {
    path: 'list-job',
    component: CategoryComponent
  },
  {
    path: 'list-job/:type/:region/:secteur',
    component: CategoryComponent
  },
  {
    path: 'single-job',
    component: CategoryComponent
  },
  { path: 'single-job/:id',
    component: CategoryComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
