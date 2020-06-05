
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Post } from '../models/post';
import { User } from '../models/user';
import { Candidature } from '../models/candidature';
import * as firebase from 'firebase';
import Datasnapshot = firebase.database.DataSnapshot;


@Injectable()
export class SessionService {
  posts: Post[] = [];
  user: User;
  postsSubject = new Subject<Post[]>();
  users: User[] = [];
  usersSubject = new Subject<User[]>();
  candidatures: Candidature[] = [];
  candidaturesSubject = new Subject<Candidature[]>();
  itemsLengthSubject = new Subject<number>();
  candidaruresByFactory = [];
  candidaruresByFactorySubject = new Subject<any>();




  constructor() {
    this.getAllPost();
    this.getAllUsers();
    this.getAllCandidatures();
  }

  setCurrentLength(length: number) {
    this.itemsLengthSubject.next(length);
  }

  emitPosts() {
    this.postsSubject.next(this.posts);
  }

  emitUsers() {
    this.usersSubject.next(this.users);
  }
  emitCandidatures() {
    this.candidaturesSubject.next(this.candidatures);
  }
  emitCandidaturesByFactory() {
    this.candidaruresByFactorySubject.next(this.candidaruresByFactory);
  }

  // create a new post
  createNewPost(post) {
    this.posts.push(post);
    this.savePosts();
    this.emitPosts();
  }
  // create a new post
  createNewCandidature(candidature) {
    this.candidatures.push(candidature);
    this.emitCandidatures();
    return new Promise(
      (resolve, reject) => {
        this.saveCandidatures().then( () => {
        // Sign-out successful.
        resolve();
      },
      (error) => {
        reject(error);
      });
    });
  }

  // save a post
  savePosts() {
    firebase.database().ref('/posts').set(this.posts);
  }

  // save user
  saveUsers() {
    firebase.database().ref('/users').set(this.users);
  }

  // save user
  saveCandidatures() {
    return firebase.database().ref('/candidatures').set(this.candidatures);
  }

  // get all posts
  getAllPost() {
    firebase.database().ref('/posts').on('value', (data: Datasnapshot) => {
        this.posts = data.val() ? data.val() : [];
        this.emitPosts();
      }
    );
  }

   // get list of users
   getAllUsers() {
    firebase.database().ref('/users').on('value', (data: Datasnapshot) => {
      this.users = data.val() ? data.val() : [];
      this.emitUsers();
    });
  }

    // get list of users
    getAllCandidatures() {
      firebase.database().ref('/candidatures').on('value', (data: Datasnapshot) => {
        this.candidatures = data.val() ? data.val() : [];
        this.emitCandidatures();
      });
    }

  // update a post
  updatePost(post: Post) {
    const postIndexToUpdate = this.posts.findIndex(
      (postEl) => {
        if (postEl.id === post.id) {
          return true;
        }
      }
    );
    this.posts[postIndexToUpdate] = post;
    this.savePosts();
    this.emitPosts();
  }

    // update a user
    updateUser(user: User) {
      const userIndexToUpdate = this.users.findIndex(
        (userEl) => {
          if (userEl.email === user.email) {
            return true;
          }
        }
      );
      this.users[userIndexToUpdate] = user;
      this.saveUsers();
      this.emitUsers();
    }

  // remove a post
  removePosts(post: Post) {
    const postIndexToRemove = this.posts.findIndex(
      (postEl) => {
        if (postEl === post) {
          return true;
        }
      }
    );
    this.posts.splice(postIndexToRemove, 1);
    for (let i = 0; i < this.candidatures.length; i++) {
      if (this.candidatures[i].id === post.id) {
        this.candidatures.splice(i, 1);
      }
    };
    this.savePosts();
    this.emitPosts();
    this.saveCandidatures().then();
    this.emitCandidatures()
  }

  // get a single post
  getSinglePost(id: string) {
    return new Promise(
      (resolve, reject) => {
        resolve(this.posts[id]);
      }
    );
  }

  // get post index
  getPostIndex(id: string) {
    return this.posts.findIndex(
      (postEl) => {
        if (postEl.id === id) {
          return true;
        }
      }
    );
  }

  // get post by id
  getPostById(id: string) {
    const postIndexToFind = this.posts.findIndex(
      (postEl) => {
        if (postEl.id === id) {
          return true;
        }
      }
    );

    return new Promise(
      (resolve) => {
        resolve(this.posts[postIndexToFind]);
      }
    );
  }

  // get post by factory
  getPostsByFactory() {
    this.candidatures.forEach( value => {
      const index = this.posts.findIndex( (post) => {
        if (post.id === value.id) {
          return true;
        }
      });
      if (index !== -1) {
        const exists = this.candidaruresByFactory.findIndex( el => {
          if (el.id === index) {
            return true;
          }
        });
        if (exists === -1) {
          const item = {
            id: this.posts[index].id,
            nom_structure: this.posts[index].structure_name,
            title: this.posts[index].titre,
            secteur: this.posts[index].secteur,
          };
          this.candidaruresByFactory.push(item);
        }
      }
    });
    this.emitCandidaturesByFactory();
  }

  // get a single user
  getSingleUser(email) {
    const userIndexToFind = this.users.findIndex(
      (userEl) => {
        if (userEl.email === email) {
          return true;
        }
      }
    );

    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/users/' + userIndexToFind).once('value').then(
          (data: Datasnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  // has a candidature
  hasCandidature(id: string, email: string) {
    let exist = false;
    this.candidatures.find(
      (candidatureEl) => {
        if (candidatureEl.id === id && candidatureEl.email === email) {
          exist = true;
        }
      }
    );
    return exist;
  }


  // Postuler
  postuler(candidatures) {

  }


  // create a new user
  createNewUser(formValue) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(formValue.email, formValue.password).then(
          (data) => {
            delete formValue.password;
            delete formValue.password_confirm;
            formValue.active = true;
            formValue.isAdmin = false;
            this.user = formValue;
            this.users.push(this.user);
            this.saveUsers();
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signInUser(formValue) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(formValue.email, formValue.password).then(
          () => {
            this.getAllUsers();
            if (this.users.length !== 0) {
              this.getSingleUser(formValue.email).then(
                (user: User) => {
                  if (user.active) {
                    localStorage.setItem('role', JSON.stringify(user.isAdmin));
                    localStorage.setItem('status', JSON.stringify(user.active));
                    resolve();
                  } else {
                    this.signOutUser();
                    const err = {
                      code: 'userNotActived'
                    };
                    reject(err);
                  }
                }
              );
            }
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOutUser() {
    localStorage.clear();
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signOut().then( () => {
          resolve();
        },
        (error) => {
          reject(error);
        });
    });
  }

  updatePassword(data) {
    const cpUser = firebase.auth().currentUser;
    const credentials = firebase.auth.EmailAuthProvider.credential(
      cpUser.email, data.old_password);

    return new Promise(
      (resolve, reject) => {
        cpUser.reauthenticateWithCredential(credentials).then(
          () => {
            cpUser.updatePassword(data.new_password).then( () => {
              resolve();
            }).catch( (error) => {
              reject(error);
            });
        }, (error) => {
          reject(error);
        });
    });

  }


}
