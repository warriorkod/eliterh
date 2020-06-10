import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminHomeComponent} from './admin-home.component';
import {ListUserComponent} from './list-user/list-user.component';
import {PostComponent} from './post/post.component';
import {AddPostComponent} from './add-post/add-post.component';
import {CandidaturesComponent} from './candidatures/candidatures.component';
import {CandidaturesBySactoryComponent} from './candidatures-by-sactory/candidatures-by-sactory.component';
import {ViewSingleJobComponent} from './view-single-job/view-single-job.component';


const routes: Routes = [
  {
    path: '', component: AdminHomeComponent,
    children: [
      {path: '', redirectTo: 'post_add'},
      {path: 'user_list', component: ListUserComponent},
      {path: 'post_list', component: PostComponent},
      {path: 'post_add', component: AddPostComponent},
      {path: 'candidatures', component: CandidaturesComponent},
      {path: 'candidaturesByFactory', component: CandidaturesBySactoryComponent},
      {path: 'candidatures/:id', component: CandidaturesComponent},
      {path: 'single_post/:id', component: ViewSingleJobComponent}
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminHomeRoutingModule {
}
