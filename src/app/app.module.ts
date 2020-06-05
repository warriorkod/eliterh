import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SessionService, LoadingScreenService } from './services';
import { SharedModule } from './modules/shared/shared.module';
import { AuthGuardService } from './guards/is_admin';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [SessionService, AuthGuardService, LoadingScreenService],
  bootstrap: [AppComponent],

})
export class AppModule { }
