import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SessionService} from 'src/app/services';
import {Post} from 'src/app/models/post';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy, AfterViewInit {
  loading = true;
  searchObject: FormGroup;
  postsToFetch: number;
  postsSubscription: Subscription;
  posts: Post[] = [];
  size = 2;
  currenType: string;
  linkBtn = document.getElementsByClassName('li-active');
  secteurs = [
    {nom: 'Bâtiment et travaux publics', img: 'Building_icon-icons.com_52242.png'},
    {nom: 'Immobilier', img: '1496677279-5_84649.png'},
    {nom: 'Télécommunication', img: 'telecommunication.png'},
    {nom: 'Agroalimentaire', img: 'amber_109461.png'},
    {nom: 'Commerce', img: 'commerce.png'},
    {nom: 'Industries Alimentaires', img: 'Sushi-icon_30268.png'},
    {nom: 'Banque, Finance & Assurance', img: 'banque.png'},
    {nom: 'Hôtellerie', img: '1496677265-2_84643.png'}
  ];
  showText = true;
  period = 'en-cours';

  constructor(private apiservice: SessionService, private router: Router) {
    window.scrollTo(0, 0);
  }

  ngOnInit() {
    this.postsSubscription = this.apiservice.postsSubject.subscribe(
      (posts: Post[]) => {
        if (posts) {
          this.posts = posts;
          if (this.posts.length !== 0) {
            this.loading = false;
          }
        }
      }
    );
    this.apiservice.emitPosts();
    this.buildSeachForm();
    this.changeCurrenType('');
  }

  ngAfterViewInit(): void {
    this.changeCurrenType('');
  }


  buildSeachForm(): void {
    this.searchObject = new FormGroup({
      type: new FormControl('', Validators.required),
      region: new FormControl('', Validators.required),
      secteur: new FormControl('', Validators.required),
    });
  }

  search(searchObject) {
    Object.keys(searchObject).forEach(element => {
      if (searchObject[element] === '') {
        searchObject[element] = 'all';
      }
    });
    this.router.navigate(['/job/list-job/' + searchObject.type + '/' + searchObject.region + '/' + searchObject.secteur]);
  }

  searchSecteur(secteur) {
    this.router.navigate(['/job/list-job/all/all/' + secteur]);
  }

  changeCurrenType(type) {
    this.currenType = type;
    const req = type.length > 0 ? type : 'récent';
    for (let i = 0; i < this.linkBtn.length; i++) {
      if (this.linkBtn[i].firstChild.textContent === req) {
        this.linkBtn[i].classList.toggle('active');
      } else {
        this.linkBtn[i].classList.remove('active');
      }
    }
  }

  getMorePost() {
    this.router.navigate(['/job/list-job/']);
  }

  openSingkeJob(post) {
    console.log(post);
    const postIndexToView = this.apiservice.getPostIndex(post.id);
    this.router.navigate(['/job/single-job/' + postIndexToView]);
  }

  getPostStat(search?: string) {
    let numberOccur = 0;
    if (!search) {
      numberOccur = this.posts.length;
    } else {
      this.posts.forEach(item => {
        if (Object.values(item).includes(search)) {
          numberOccur++;
        }
      });
    }
    return numberOccur;
  }

  switchText() {
    this.showText = this.showText === true ? false : true;
  }

  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
  }


}
