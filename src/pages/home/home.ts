import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: FirebaseListObservable<any[]>;
  state: firebase.User;

  constructor(
    public navCtrl: NavController,
    public auth: AngularFireAuth,
    db: AngularFireDatabase) {
    this.auth.authState.subscribe(state => {
      console.log('Auth state updated');
      console.log(state);
      this.state = state;
      if (state) {
        this.items = db.list('/cousines');
      } else {
        this.items = null;
      }
    });
  }
  login() {
    console.log('login');
    this.auth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    console.log('logout');
    this.auth.auth.signOut();
    this.state = null;
  }
}
