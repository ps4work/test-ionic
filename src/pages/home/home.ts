import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: FirebaseListObservable<any[]>;
  localItems;
  state: firebase.User;
  current: string;
  subscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public auth: AngularFireAuth,
    db: AngularFireDatabase) {
    this.auth.authState.subscribe(state => {
      console.log('Auth state updated');
      console.log(state);
      this.state = state;
      if (state) {
        this.subscription = db.list('/test').subscribe(v => {
          console.log(v);
          console.log(JSON.stringify(v));
          this.localItems = v.slice(0).reverse();
          console.log(JSON.stringify(this.localItems));
        });
        this.items = db.list('/test');
      } else {
        this.subscription.unsubscribe();
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
  addWord(word) {
    let pushResult = this.items.push({ word: word });
    console.log(pushResult);
  }
  removeWord(word) {
    console.log(`remove ${word}`);
    let item = null;
    this.items.forEach(a => a.forEach(v => {
      console.log(v);
      if (v.$value === word) {
        console.log(`found ${word}`);
        item = v;
      }
    }));
    if (item) {
      console.log(`remove ${item}`);
      this.items.remove(item);
    }
  }
  onKeyPress(event) {
    if (event.keyCode === 13 && this.current && this.current.length) {
      if (this.current.indexOf('-') === 0) {
        this.removeWord(this.current.substr(1));
      } else {
        this.addWord(this.current);
      }
      this.current = '';
    }
  }

  // test commit
}
