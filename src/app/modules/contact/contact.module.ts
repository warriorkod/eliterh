import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';


@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ]
})
export class ContactModule { }
