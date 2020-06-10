import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as firebase from 'firebase';
import {SessionService} from 'src/app/services';
import {User} from 'src/app/models/user';
import Swal from 'sweetalert2';
import {SwalComponent, SwalPortalTargets} from '@sweetalert2/ngx-sweetalert2';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit, OnDestroy {
  user: User = new User();
  userInfo: FormGroup;
  updatePasswordForm: FormGroup;
  loading = true;
  usersSubscription: Subscription;
  errorMessage: string;
  @ViewChild('subscribe', {static: true}) private subscribe: SwalComponent;
  @ViewChild('updatePassword', {static: true}) private updatePassword: SwalComponent;

  constructor(private apiService: SessionService, public readonly swalTargets: SwalPortalTargets) {
    window.scrollTo(0, 0);
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.usersSubscription = this.apiService.usersSubject.subscribe(() => {
            this.apiService.getSingleUser(user.email).then(
              (item: User) => {
                if (item) {
                  this.user = item;
                  if (this.user) {
                    this.loading = false;
                  }
                  this.buildUserInfoForm();
                  this.buildupdatePasswordForm();
                }
              }
            );
          });
          this.apiService.emitUsers();
        }
      }
    );
  }

  buildupdatePasswordForm(): void {
    this.updatePasswordForm = new FormGroup({
      old_password: new FormControl('', Validators.required),
      new_password: new FormControl('', Validators.required),
      confirm_new_password: new FormControl('', Validators.required),
    });
  }

  buildUserInfoForm(): void {
    this.userInfo = new FormGroup({
      nom: new FormControl(this.user.nom ? this.user.nom : '', Validators.required),
      prenom: new FormControl(this.user.prenom ? this.user.prenom : '', Validators.required),
      tel: new FormControl(this.user.tel ? this.user.tel : '', Validators.required),
      dateNaissance: new FormControl(this.user.dateNaissance ? this.user.dateNaissance : '', Validators.required),
      adresse: new FormControl(this.user.adresse ? this.user.adresse : '', Validators.required),
      lieu: new FormControl(this.user.lieu ? this.user.lieu : '', Validators.required),
      civilite: new FormControl(this.user.civilite ? this.user.civilite : '', Validators.required),
      etudeLevel: new FormControl(this.user.etudeLevel ? this.user.etudeLevel : '', Validators.required),
      experienceLevel: new FormControl(this.user.experienceLevel ? this.user.experienceLevel : '', Validators.required),
      actualDomain: new FormControl(this.user.actualDomain ? this.user.actualDomain : '', Validators.required),
      searchDomain: new FormControl(this.user.searchDomain ? this.user.searchDomain : '', Validators.required)
    });
  }

  updateProfil() {
    this.subscribe.fire();
  }

  updateUser(user: User) {
    Swal.fire({
      title: 'Voulez-vous vraiment modifier cet utilisateur?',
      text: 'Les informations liées à l\'utilisateur seront modifiées!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, modifier!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Modifié!',
          'L\'utilisateur  a été modifié avec succès.',
          'success'
        );
        user.email = this.user.email;
        user.active = this.user.active;
        user.isAdmin = this.user.isAdmin;
        this.apiService.updateUser(user);
      }
    });
  }

  fireUpdatePassword() {
    this.updatePassword.fire();
  }

  sendUpdatePassword(credentials) {
    if (credentials.new_password !== credentials.confirm_new_password) {
      this.errorMessage = 'Les mots de passe ne sont pas identiques';
      return;
    }
    this.apiService.updatePassword(credentials).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Opération effectuée avec succès!',
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error) => {
        let message: string;
        if (error.code === 'auth/wrong-password') {
          message = 'Ancien mot de passe incorrecte!';
        } else if (error.code === 'auth/weak-password') {
          message = 'Le nouveau mot de passe doit contenir au moins 6 caractères!';
        } else {
          message = 'Une erreur est ssurvenue. Veuillez réessayer svp!';
        }
        Swal.fire(
          'Oups!',
          message,
          'error'
        );
      });
  }

  clearInput() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
  }

}
