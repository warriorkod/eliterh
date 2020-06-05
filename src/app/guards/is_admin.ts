import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if (user) {
              const verify = this.checkAdmin();
              if (verify) {
                resolve(true);
              } else {
                this.router.navigate(['/admin_elith_rh']);
                resolve(false);
              }
            } else {
              this.router.navigate(['/admin_elith_rh']);
              resolve(false);
            }
          }
        );
      }
    );
  }

  checkAdmin() {
    return (JSON.parse(localStorage.getItem('role')) === true);
  }
}
