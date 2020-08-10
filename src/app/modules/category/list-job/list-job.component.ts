import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionService} from 'src/app/services';
import {Subscription} from 'rxjs';
import {Post} from 'src/app/models/post';

@Component({
  selector: 'app-list-job',
  templateUrl: './list-job.component.html',
  styleUrls: ['./list-job.component.css']
})
export class ListJobComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() listLoader = new EventEmitter();
  size = 5;
  postsSubscription: Subscription;
  posts: Post[] = [];
  regions = ['Dakar', 'Diourbel', 'Fatick', 'Kaffrine', 'Kaolack',
    'Kédougou', 'Kolda', 'Louga', 'Matam', 'Saint-Louis', 'Sédhiou', 'Tambacounda', 'Thiès', 'Ziguinchor'];
  currentRegion = '';
  types = ['CDI', 'CDD', 'Prestation de services', 'Intérim', 'Stage'];
  currenType = '';
  secteurs = ['Bâtiment et travaux publics', 'Immobilier', 'Télécommunication', 'Agroalimentaire',
    'Commerce', 'Industries Alimentaires', 'Banque, Finance & Assurance', 'Hôtellerie', 'Autres'];
  currentSecteur = '';
  links = document.getElementsByClassName('side-btn');
  liBtn = document.getElementsByClassName('li-active');
  secteurBtn = document.getElementsByClassName('secteur-btn');
  postsToFetch: number;
  period = 'en-cours';

  constructor(private apiservice: SessionService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if (params.hasOwnProperty('type' || 'secteur' || 'region')) {
         this.currenType = (params.type === 'all' ? '' : params.type);
        this.currentRegion = (params.region === 'all' ? '' : params.region);
        this.currentSecteur = (params.secteur === 'all' ? '' : params.secteur);
      }
    });
    window.scrollTo(0, 0);
  }

  ngOnInit() {
    this.postsSubscription = this.apiservice.postsSubject.subscribe(
      (posts: Post[]) => {
        if (posts) {
          this.posts = posts;
          if (this.posts.length !== 0) {
            this.listLoader.emit(false);
          }
        }
      }
    );
    this.apiservice.emitPosts();
    this.apiservice.itemsLengthSubject.subscribe(length => {
      this.postsToFetch = length;
    });
  }

  ngAfterViewInit(): void {
    this.addCurrenType(this.currenType);
    this.addCurrentRegion(this.currentRegion);
    this.addCurrentSecteur(this.currentSecteur);
  }

  openSingkeJob(post) {
    const postIndexToView = this.apiservice.getPostIndex(post.id);
    this.router.navigate(['/job/single-job/' + postIndexToView]);
  }

  getMorePost() {
    this.size += 5;
  }

  getFewerPost() {
    this.size -= 5;
  }

  addCurrentSecteur(secteur) {
    this.size = 5;
    this.currentSecteur = secteur;
    const req = secteur.length > 0 ? secteur : 'Tous les secteurs';
    for (let i = 0; i < this.secteurBtn.length; i++) {
      if (this.secteurBtn[i].firstChild.textContent === req) {
        this.secteurBtn[i].classList.toggle('activeLink');
      } else {
        this.secteurBtn[i].classList.remove('activeLink');
      }
    }
  }

  addCurrenType(type) {
    this.size = 5;
    this.currenType = type;
    const req = type.length > 0 ? type : 'Tous les types';
    for (let i = 0; i < this.liBtn.length; i++) {
      if (this.liBtn[i].firstChild.textContent === req) {
        this.liBtn[i].classList.toggle('active');
      } else {
        this.liBtn[i].classList.remove('active');
      }
    }
  }

  addCurrentRegion(region) {
    this.size = 5;
    this.currentRegion = region;
    const req = region.length > 0 ? region : 'Toutes les régions';
    for (let i = 0; i < this.links.length; i++) {
      if (this.links[i].firstChild.textContent === req) {
        this.links[i].classList.toggle('activeLink');
      } else {
        this.links[i].classList.remove('activeLink');
      }
    }
  }

  private getIndex(listObject: string[], key: string) {
    console.log(listObject.indexOf(key));
    return listObject.indexOf(key);
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

  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
  }


}
