import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionService} from 'src/app/services';
import {Post} from 'src/app/models/post';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {formatDate} from '@angular/common';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-view-single-job',
  templateUrl: './view-single-job.component.html',
  styleUrls: ['./view-single-job.component.css']
})
export class ViewSingleJobComponent implements OnInit {
  postId: any;
  post: Post = new Post();
  show = true;
  addForm: FormGroup;
  minDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  competences: string[] = [];
  @ViewChild('fcompetences') private competenceEl: ElementRef;
  private postsSubscription: Subscription;


  constructor(private apiservice: SessionService, private router: ActivatedRoute, private route: Router) {
    this.router.params.subscribe(params => (this.postId = params.id));
  }

  ngOnInit() {
    if (this.postId) {
      this.postsSubscription = this.apiservice.postsSubject.subscribe(
        async (posts: Post[]) => {
          if (posts.length > 0) {
            this.post = posts[this.postId];
            this.competences = this.post.competences;
            this.buildAddPostForm();
          }
        }
      );
      this.apiservice.emitPosts();
    }
  }

  buildAddPostForm() {
    this.addForm = new FormGroup({
      titre: new FormControl(this.post.titre, Validators.required),
      lieu: new FormControl(this.post.lieu, Validators.required),
      type: new FormControl(this.post.type, Validators.required),
      categorie: new FormControl(this.post.categorie, Validators.required),
      fiche: new FormControl(this.post.fiche, Validators.required),
      dateCreate: new FormControl(this.post.dateCreate, Validators.required),
      dateVal: new FormControl(this.post.dateVal, Validators.required),
      structureName: new FormControl(this.post.structureName, Validators.required),
      secteur: new FormControl(this.post.secteur, Validators.required)
    });
  }

  modifierPost() {
    console.log('modifier post');
  }

  supprimerPost() {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer ce poste?',
      text: 'Le poste sera définitivement supprimé!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Supprimé!',
          'Votre poste a été supprimé avec succès.',
          'success'
        );
        this.apiservice.removePosts(this.post);
        this.route.navigate(['/admin_home_elith_rh/post_list']);
      }
    });
  }

  showUpdateSection() {
    this.show = false;
  }

  getBack() {
    this.show = true;
  }

  getBackListPost() {
    this.route.navigate(['/admin_home_elith_rh/post_list']);
  }

  addPost(post: Post) {
    Swal.fire({
      title: 'Voulez-vous vraiment modifier ce poste?',
      text: 'Confirmez votre choix svp!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, modifier!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Modifié!',
          'Votre poste a été modifié avec succès.',
          'success'
        );
        post.id = this.post.id;
        post.competences = this.competences;
        this.apiservice.updatePost(post);
        this.show = true;
      }
    });
  }

  addCompetences(competence) {
    if (competence) {
      let competenceIndexToAdd = false;
      this.competences.findIndex(
        (competenceOne) => {
          if (competenceOne === competence) {
            competenceIndexToAdd = true;
          }
        }
      );
      if (competenceIndexToAdd) {
        Swal.fire(
          'Oups!!',
          'Cette compétnece existe déjà!',
          'info'
        );
        this.competenceEl.nativeElement.value = '';
      } else {
        this.competences.push(competence);
        this.competenceEl.nativeElement.value = '';
      }
    } else {
      return;
    }
  }

  deleteCompetence(competence) {
    const competenceIndexToRemove = this.competences.findIndex(
      (competenceOne) => {
        if (competenceOne === competence) {
          return true;
        }
      }
    );
    this.competences.splice(competenceIndexToRemove, 1);
  }

  viewCandidatures() {
    this.route.navigate(['/admin_home_elith_rh/candidatures', this.post.id]);
  }

}
