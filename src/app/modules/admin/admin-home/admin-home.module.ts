import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {DataTablesModule} from 'angular-datatables';
import {AdminHomeComponent} from './admin-home.component';
import {ListUserComponent} from './list-user/list-user.component';
import {PostComponent} from './post/post.component';
import {AddPostComponent} from './add-post/add-post.component';
import {ViewSingleJobComponent} from './view-single-job/view-single-job.component';
import {CandidaturesComponent} from './candidatures/candidatures.component';
import {AdminHomeRoutingModule} from './admin-home-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditorModule} from '@tinymce/tinymce-angular';
import {CandidaturesBySactoryComponent} from './candidatures-by-sactory/candidatures-by-sactory.component';
import {AdminShareModule} from '../admin-share/admin-share.module';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [
    AdminHomeComponent,
    ListUserComponent,
    PostComponent,
    AddPostComponent,
    ViewSingleJobComponent, CandidaturesComponent, CandidaturesBySactoryComponent],
  entryComponents: [],
  imports: [
    CommonModule,
    DataTablesModule,
    MatDialogModule,
    MatSidenavModule, MatListModule, AdminHomeRoutingModule, SharedModule,
    AdminShareModule, FormsModule, ReactiveFormsModule, NgxPaginationModule,
    EditorModule
  ],
  providers: []
})
export class AdminHomeModule {
}
