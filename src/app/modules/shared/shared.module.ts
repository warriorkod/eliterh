import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './modals/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './modals/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LocationFilterPipe } from 'src/app/pipes/location-filter.pipe';
import { LazyFilterPipe } from '../../pipes/lazy-filter.pipe';
import { TypeJobFilterPipe } from '../../pipes/type-job-filter.pipe';
import { SecteurFilterPipe } from '../..//pipes/secteur-filter.pipe';
import { MatSelectModule } from '@angular/material';
import { LoadingScreenComponent } from './loading-screen/loading-screen/loading-screen.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { PossFilterDatePipe } from 'src/app/pipes/posts-filter-date.pipe';
import {PostsFilterByTittrePipe, PostsFilterByTypePipe, PostsFilterOrderByDatePipe} from "../../pipes";




const routes: Routes = [];
@NgModule({
  declarations: [HeaderComponent, PossFilterDatePipe, LocationFilterPipe, LazyFilterPipe, TypeJobFilterPipe, PostsFilterByTypePipe, PostsFilterByTittrePipe,
    PostsFilterByTittrePipe, PostsFilterOrderByDatePipe, PostsFilterByTypePipe, SecteurFilterPipe, FooterComponent, RegisterComponent, LoginComponent, LoadingScreenComponent, ScrollTopComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    RouterModule.forChild(routes),
    NgbModule,
    SweetAlert2Module.forRoot({})
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoadingScreenComponent,
    ScrollTopComponent,
    NgbModule,
    SweetAlert2Module,
    LocationFilterPipe,
    LazyFilterPipe,
    TypeJobFilterPipe,
    SecteurFilterPipe,
    PossFilterDatePipe,
    PostsFilterByTypePipe, PostsFilterByTittrePipe, PostsFilterOrderByDatePipe,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule

  ],
  entryComponents: [RegisterComponent, LoginComponent]

})
export class SharedModule { }
