import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminAuthRoutingModule} from './admin-auth-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminAuthComponent} from './admin-auth.component';


@NgModule({
  declarations: [AdminAuthComponent],
  imports: [
    CommonModule,
    AdminAuthRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminAuthModule {
}
