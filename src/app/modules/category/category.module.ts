import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { SharedModule } from '../shared/shared.module';
import { ListJobComponent } from './list-job/list-job.component';
import { SingleJobComponent } from './single-job/single-job.component';


@NgModule({
  declarations: [CategoryComponent, ListJobComponent, SingleJobComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule
  ]
})
export class CategoryModule { }
