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
    'Commerce', 'Industries Alimentaires', 'Banques et Finances', 'Hôtellerie', 'Autres'];
  currentSecteur = '';
  links = document.getElementsByClassName('side-btn');
  liBtn = document.getElementsByClassName('li-active');
  secteurBtn = document.getElementsByClassName('secteur-btn');
  postsToFetch: number;
  period = 'en-cours';

  constructor(private apiservice: SessionService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.currenType = (params.type === 'all' ? '' : params.type);
      this.currentRegion = (params.region === 'all' ? '' : params.region);
      this.currentSecteur = (params.secteur === 'all' ? '' : params.secteur);
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
    this.addCurrenType(this.currenType, this.currenType ? this.types.indexOf(this.currenType) : -1);
    this.addCurrentRegion(this.currentRegion, this.currentRegion ? this.regions.indexOf(this.currentRegion) : -1);
    this.addCurrentSecteur(this.currentSecteur, this.secteurs ? this.secteurs.indexOf(this.currentSecteur) : -1);
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

  addCurrentSecteur(secteur, index) {
    this.size = 5;
    this.currentSecteur = secteur;
    index += 1;
    for (let i = 0; i < this.secteurBtn.length; i++) {
      if (i !== index) {
        this.secteurBtn[i].classList.remove('activeLink');
      } else {
        this.secteurBtn[i].classList.toggle('activeLink');
      }
    }
  }

  addCurrenType(type, index) {
    this.size = 5;
    this.currenType = type;
    index += 1;
    for (let i = 0; i < this.liBtn.length; i++) {
      if (i !== index) {
        this.liBtn[i].classList.remove('active');
      } else {
        this.liBtn[i].classList.toggle('active');
      }
    }
  }

  addCurrentRegion(region, index) {
    this.size = 5;
    this.currentRegion = region;
    index += 1;
    for (let i = 0; i < this.links.length; i++) {
      if (i !== index) {
        this.links[i].classList.remove('activeLink');
      } else {
        this.links[i].classList.toggle('activeLink');
      }
    }
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
