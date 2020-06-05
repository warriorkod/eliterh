import {Component, OnInit, OnDestroy, ViewChild, Output, EventEmitter} from '@angular/core';
import {Post} from 'src/app/models/post';
import {SessionService} from 'src/app/services';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from 'src/app/models/user';
import * as firebase from 'firebase';
import Swal from 'sweetalert2';
import {SwalPortalTargets, SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {Candidature} from 'src/app/models/candidature';
import {Observable, of, Subscription} from 'rxjs';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-single-job',
  templateUrl: './single-job.component.html',
  styleUrls: ['./single-job.component.css']
})
export class SingleJobComponent implements OnInit, OnDestroy {
  @ViewChild('subscribe', {static: true}) private subscribe: SwalComponent;
  @Output() singleLoader = new EventEmitter();
  postId: any;
  post: Post;
  user: User;
  users: User[];
  userInfo: FormGroup;
  usersSubscription: any;
  loading: boolean;
  private postsSubscription: Subscription;


  constructor(private apiservice: SessionService,
              private router: ActivatedRoute, private route: Router, public readonly swalTargets: SwalPortalTargets) {
    this.router.params.subscribe(params => (this.postId = params.id));
    window.scrollTo(0, 0);
  }

  ngOnInit() {
    if (this.postId) {
      this.postsSubscription = this.apiservice.postsSubject.subscribe(
        async (posts: Post[]) => {
          if (posts) {
            this.post = (posts[this.postId]);
            this.singleLoader.emit(false);
          }
        }
      );
      this.apiservice.emitPosts();
    }
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.usersSubscription = this.apiservice.usersSubject.subscribe(() => {
            this.apiservice.getSingleUser(user.email).then(
              (item: User) => {
                if (item) {
                  this.user = item;
                  this.buildUserInfoForm();
                }
              }
            );
          });
          this.apiservice.emitUsers();
        }
      }
    );
  }

  buildUserInfoForm(): void {
    this.userInfo = new FormGroup({
      nom: new FormControl(this.user.nom ? this.user.nom : '', Validators.required),
      prenom: new FormControl(this.user.prenom ? this.user.prenom : '', Validators.required),
      // email: new FormControl(this.user.email, Validators.required),
      tel: new FormControl(this.user.tel ? this.user.tel : '', Validators.required),
      date_naissance: new FormControl(this.user.date_naissance ? this.user.date_naissance : '', Validators.required),
      adresse: new FormControl(this.user.adresse ? this.user.adresse : '', Validators.required),
      lieu: new FormControl(this.user.lieu ? this.user.lieu : '', Validators.required),
      civilite: new FormControl(this.user.civilite ? this.user.civilite : '', Validators.required),
      niveau_etude: new FormControl(this.user.niveau_etude ? this.user.niveau_etude : '', Validators.required),
      niveau_experience: new FormControl(this.user.niveau_experience ? this.user.niveau_experience : '', Validators.required),
      domaine_actuel: new FormControl(this.user.domaine_actuel ? this.user.domaine_actuel : '', Validators.required),
      domaine_recherche: new FormControl(this.user.domaine_recherche ? this.user.domaine_recherche : '', Validators.required)
    });
  }

  getBackListPost() {
    this.route.navigate(['/job']);
  }

  showPostulerPopup() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          if (this.apiservice.hasCandidature(this.post.id, user.email)) {
            Swal.fire(
              'Oups!',
              'Vous avez déjà postulé pour cette offre d\'emploi.',
              'info'
            );
          } else {
            this.subscribe.fire();
          }
        } else {
          Swal.fire(
            'Oups!',
            'Vous devez vous authentifier.',
            'error'
          );
        }
      }
    );
  }

  postuler(user) {
    let candidatures;
    user.email = this.user.email;
    user.active = this.user.active;
    user.isAdmin = this.user.isAdmin;
    this.apiservice.updateUser(user);
    this.apiservice.getSingleUser(user.email).then(
      (item: User) => {
        candidatures = item;
        candidatures.id = this.post.id;
        this.apiservice.createNewCandidature(candidatures).then(() => {
            // Sign-out successful.
            Swal.fire(
              'Bravo!',
              'Votre candidature a été enregistrée avec succès.',
              'success'
            );
          },
          (error) => {
            Swal.fire(
              'Oups!',
              'Une erreur est survenue.',
              'error'
            );
          });
      }
    );
  }

  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe()
  }

}
