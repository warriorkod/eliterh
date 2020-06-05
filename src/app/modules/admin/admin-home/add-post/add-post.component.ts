import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services';
import { Post } from 'src/app/models/post';
import { Subscription, from } from 'rxjs';
import {formatDate} from '@angular/common';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  @ViewChild('fcompetences', {static: true}) private competenceEl: ElementRef;

  addForm: FormGroup;
  postsSubscription: Subscription;
  posts: Post[];
  minDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  competences: string[] = [];

  constructor(private apiservice: SessionService, private router: Router) {
  }

  ngOnInit() {
    this.buildAddPostForm();
    this.postsSubscription = this.apiservice.postsSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.apiservice.emitPosts();
  }

  buildAddPostForm() {
    this.addForm = new FormGroup({
      titre: new FormControl('', Validators.required),
      lieu:  new FormControl('', Validators.required),
      type:  new FormControl('', Validators.required),
      categorie:  new FormControl('', Validators.required),
      fiche:  new FormControl('', Validators.required),
      date_val:  new FormControl('', Validators.required),
      structure_name:  new FormControl('', Validators.required),
      secteur:  new FormControl('', Validators.required),
    });
  }

  addPost(object) {
    const post = new Post();
    post.titre = object.titre;
    post.lieu = object.lieu;
    post.type = object.type;
    post.categorie = object.categorie;
    post.date_create = '' + formatDate(new Date(), 'yyyy-MM-dd', 'en');
    post.date_val = object.date_val;
    post.fiche = object.fiche;
    post.competences = this.competences;
    post.structure_name = object.structure_name;
    post.secteur = object.secteur;
    this.apiservice.createNewPost(post);
    this.router.navigate(['/admin_home_elith_rh/post_list']);

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

}
